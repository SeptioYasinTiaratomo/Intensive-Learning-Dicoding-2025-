const NotFoundError = require('../exceptions/NotFoundError');
const InvariantError = require('../exceptions/InvariantError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const AuthenticationError = require('../exceptions/AuthenticationError');

class PlaylistSongsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.verifySongExists(songId);

      await this._service.addSongToPlaylist(playlistId, songId);

      return h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      }).code(201);
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getPlaylistSongsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
      const songs = await this._service.getSongsFromPlaylist(playlistId);
      const playlist = await this._playlistsService.getPlaylistByIdWithSongs(playlistId, songs);

      return {
        status: 'success',
        data: {
          playlist,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async deletePlaylistSongByIdHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.deleteSongFromPlaylist(playlistId, songId);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  _handleError(error, h) {
    if (
      error instanceof NotFoundError ||
      error instanceof InvariantError ||
      error instanceof AuthorizationError ||
      error instanceof AuthenticationError
    ) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(error.statusCode);
    }

    console.error(error); // Logging untuk keperluan debugging
    return h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    }).code(500);
  }
}

module.exports = PlaylistSongsHandler;
