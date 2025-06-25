const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    return new Promise((resolve, reject) => {
      const filename = `${nanoid(16)}-${meta.filename}`;
      const filepath = path.resolve(this._folder, filename);
      const fileStream = fs.createWriteStream(filepath);

      file.pipe(fileStream);

      file.on('end', () => resolve(filename));
      file.on('error', (error) => reject(error));
    });
  }
}

module.exports = StorageService;
