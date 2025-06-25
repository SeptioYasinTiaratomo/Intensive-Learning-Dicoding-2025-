const ClientError = require('../exceptions/ClientError');

class UploadsHandler {
  constructor(service, albumsService, validator) {
    this._service = service;
    this._albumsService = albumsService;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { cover } = request.payload;
      this._validator.validateImageHeaders(cover.hapi.headers);

      const { id: albumId } = request.params;
      const filename = await this._service.writeFile(cover, cover.hapi);

      // ✅ Tambahkan nama file saja ke album, bukan full URL
      await this._albumsService.addCoverUrlToAlbum(albumId, filename);

      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
      response.code(201);
      return response;
    } catch (error) {
      console.error('❌ Upload gagal:', error);
      throw error;
    }
  }
}

module.exports = UploadsHandler;
