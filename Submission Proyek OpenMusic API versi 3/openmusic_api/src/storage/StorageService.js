const fs = require('fs');
const path = require('path');

class StorageService {
  constructor() {
    this._folder = path.resolve(__dirname, '..', 'uploads');

    if (!fs.existsSync(this._folder)) {
      fs.mkdirSync(this._folder);
    }
  }

 writeFile(file, meta) {
  const safeFilename = `${+new Date()}-${path.basename(meta.filename).replace(/\s/g, '_')}`;
  const pathWrite = path.resolve(this._folder, safeFilename);
  const fileStream = fs.createWriteStream(pathWrite);

  return new Promise((resolve, reject) => {
    file.pipe(fileStream);
    file.on('end', () => resolve(safeFilename));
    file.on('error', reject);
  });
}

}

module.exports = StorageService;
