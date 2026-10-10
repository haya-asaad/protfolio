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

// Generate an elegant architectural gradient PNG
function generateArchitecturalPng(width = 800, height = 600, r = 26, g = 28, b = 32) {
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

  // Raw uncompressed scanlines: each row starts with filter byte 0
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: none
    const factor = 1 - (y / height) * 0.3; // subtle gradient

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // Grid line check
      const isGrid = (x % 40 === 0) || (y % 40 === 0);
      const isBorder = x < 2 || x > width - 3 || y < 2 || y > height - 3;

      if (isBorder) {
        rawData[pxOffset] = 120;
        rawData[pxOffset + 1] = 105;
        rawData[pxOffset + 2] = 85;
      } else if (isGrid) {
        rawData[pxOffset] = Math.min(255, Math.floor(r * factor + 18));
        rawData[pxOffset + 1] = Math.min(255, Math.floor(g * factor + 18));
        rawData[pxOffset + 2] = Math.min(255, Math.floor(b * factor + 22));
      } else {
        rawData[pxOffset] = Math.floor(r * factor);
        rawData[pxOffset + 1] = Math.floor(g * factor);
        rawData[pxOffset + 2] = Math.floor(b * factor);
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

// Profile photo
const profilePng = generateArchitecturalPng(600, 750, 35, 33, 30);
fs.writeFileSync(path.join(profileDir, 'bio.jpg'), profilePng);
console.log('Created bio.jpg placeholder');

// Projects
projects.forEach((proj, idx) => {
  const projDir = path.join(publicDir, 'images/projects', proj.id);
  fs.mkdirSync(projDir, { recursive: true });

  // Generate cover and gallery
  const coverPng = generateArchitecturalPng(900, 600, 24 + (idx % 4) * 4, 25 + (idx % 3) * 3, 28);
  fs.writeFileSync(path.join(projDir, 'cover.jpg'), coverPng);

  const g1Png = generateArchitecturalPng(900, 600, 28, 30, 32);
  fs.writeFileSync(path.join(projDir, '01.jpg'), g1Png);

  const g2Png = generateArchitecturalPng(900, 600, 22, 23, 26);
  fs.writeFileSync(path.join(projDir, '02.jpg'), g2Png);

  const planPng = generateArchitecturalPng(900, 600, 18, 20, 24);
  fs.writeFileSync(path.join(projDir, 'plan.jpg'), planPng);

  console.log(`Created placeholders for ${proj.id}`);
});

console.log('All placeholder image paths generated successfully!');
