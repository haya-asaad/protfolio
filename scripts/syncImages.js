import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

const projectsPath = path.resolve(__dirname, '../src/data/projects.json');
const publicProjectsDir = path.resolve(__dirname, '../public/images/projects');

function getImagesInDir(dirPath, relativePrefix) {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const imageFiles = entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);

  // Automatically remove ~3.2KB generated placeholder gallery files (01.jpg, 02.jpg, plan.jpg)
  // if real non-cover gallery images have been added to this folder
  const nonCoverFiles = imageFiles.filter((name) => !name.toLowerCase().startsWith('cover.'));
  const placeholderGalleryFiles = nonCoverFiles.filter((name) => {
    if (!['01.jpg', '02.jpg', 'plan.jpg'].includes(name)) return false;
    try {
      return fs.statSync(path.join(dirPath, name)).size < 5000;
    } catch {
      return false;
    }
  });

  if (placeholderGalleryFiles.length > 0 && nonCoverFiles.length > placeholderGalleryFiles.length) {
    for (const pName of placeholderGalleryFiles) {
      fs.unlinkSync(path.join(dirPath, pName));
    }
  }

  const finalEntries = fs.readdirSync(dirPath, { withFileTypes: true });
  return finalEntries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `${relativePrefix}/${name}`);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const updatedProjects = projects.map((proj) => {
  const projDir = path.join(publicProjectsDir, proj.id);
  const projPrefix = `./images/projects/${proj.id}`;

  const allRootImages = getImagesInDir(projDir, projPrefix);
  const coverMatch = allRootImages.find((img) => path.basename(img).toLowerCase().startsWith('cover.'));
  const coverImage = coverMatch || proj.coverImage;

  const hasSubGalleries =
    Array.isArray(proj.gallery) &&
    proj.gallery.some((item) => typeof item === 'object' && item !== null && item.id);

  if (hasSubGalleries) {
    const updatedGallery = proj.gallery.map((item) => {
      if (typeof item === 'object' && item !== null && item.id) {
        const subDir = path.join(projDir, item.id);
        const subPrefix = `${projPrefix}/${item.id}`;
        const subFiles = getImagesInDir(subDir, subPrefix);
        if (subFiles.length === 0) return item;

        const subCover = subFiles.find((img) => path.basename(img).toLowerCase().startsWith('cover.'));
        const nonCoverFiles = subFiles.filter((img) => img !== subCover);

        return {
          ...item,
          coverImage: subCover || subFiles[0],
          images: nonCoverFiles.length > 0 ? nonCoverFiles : subFiles,
        };
      }
      return item;
    });

    return {
      ...proj,
      coverImage,
      gallery: updatedGallery,
    };
  }

  // Flat gallery project: include all images in project folder except cover.*
  const galleryImages = allRootImages.filter((img) => img !== coverMatch);
  return {
    ...proj,
    coverImage,
    gallery: galleryImages.length > 0 ? galleryImages : proj.gallery,
  };
});

fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2) + '\n');
console.log('Synced all project and sub-gallery images into src/data/projects.json!');

