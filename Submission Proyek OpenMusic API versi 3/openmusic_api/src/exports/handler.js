class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    // Validasi payload (targetEmail harus email yang valid)
    this._validator.validateExportPlaylistPayload(request.payload);

    const { playlistId } = request.params;
    const { targetEmail } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    // Hanya pemilik playlist yang boleh mengekspor
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const message = {
      playlistId, // ✅ Sudah benar
      targetEmail,
    };

    // Kirim pesan ke RabbitMQ (queue: 'export:playlists')
    await this._producerService.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
