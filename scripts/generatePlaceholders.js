import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CRC32 table for valid PNG generation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([len, typeAndData, crc]);
}

// Generate an elegant, gallery-grade neutral off-white architectural plate
function generateGalleryPng(width = 800, height = 600, baseR = 245, baseG = 244, baseB = 240) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR: 13 bytes
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(2, 9); // Color type 2 (RGB)
  ihdr.writeUInt8(0, 10); // Compression
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: none
    const factor = 1 - (y / height) * 0.04;

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const isBorder = x < 1 || x > width - 2 || y < 1 || y > height - 2;
      const isInnerBorder = (x === 24 || x === width - 25) && (y >= 24 && y <= height - 25) ||
                            (y === 24 || y === height - 25) && (x >= 24 && x <= width - 25);

      if (isBorder || isInnerBorder) {
        rawData[pxOffset] = 224;
        rawData[pxOffset + 1] = 224;
        rawData[pxOffset + 2] = 220;
      } else {
        rawData[pxOffset] = Math.floor(baseR * factor);
        rawData[pxOffset + 1] = Math.floor(baseG * factor);
        rawData[pxOffset + 2] = Math.floor(baseB * factor);
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const projectsPath = path.resolve(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const publicDir = path.resolve(__dirname, '../public');
const profileDir = path.join(publicDir, 'images/profile');
fs.mkdirSync(profileDir, { recursive: true });

// Gallery profile photo placeholder
const profilePng = generateGalleryPng(600, 750, 240, 239, 235);
fs.writeFileSync(path.join(profileDir, 'bio.jpg'), profilePng);
console.log('Created bio.jpg gallery placeholder');

// Projects
projects.forEach((proj, idx) => {
  const projDir = path.join(publicDir, 'images/projects', proj.id);
  fs.mkdirSync(projDir, { recursive: true });

  const coverPng = generateGalleryPng(900, 600, 246 - (idx % 3) * 2, 245 - (idx % 2) * 2, 242);
  fs.writeFileSync(path.join(projDir, 'cover.jpg'), coverPng);

  const g1Png = generateGalleryPng(900, 600, 244, 243, 240);
  fs.writeFileSync(path.join(projDir, '01.jpg'), g1Png);

  const g2Png = generateGalleryPng(900, 600, 242, 241, 238);
  fs.writeFileSync(path.join(projDir, '02.jpg'), g2Png);

  const planPng = generateGalleryPng(900, 600, 248, 247, 244);
  fs.writeFileSync(path.join(projDir, 'plan.jpg'), planPng);

  console.log(`Updated gallery placeholders for ${proj.id}`);
});

console.log('All gallery placeholder images updated successfully!');
