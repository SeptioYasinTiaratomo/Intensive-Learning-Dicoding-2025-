const InvariantError = require('../exceptions/InvariantError');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!validMimeTypes.includes(headers['content-type'])) {
      throw new InvariantError('Berkas yang diunggah harus berupa gambar');
    }
  },
};

module.exports = UploadsValidator;
