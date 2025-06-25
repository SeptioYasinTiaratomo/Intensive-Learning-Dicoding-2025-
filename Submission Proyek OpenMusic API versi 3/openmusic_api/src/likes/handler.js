const ClientError = require('../exceptions/ClientError');
const InvariantError = require('../exceptions/InvariantError');

class LikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postLikeAlbumHandler = this.postLikeAlbumHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
    this.deleteLikeAlbumHandler = this.deleteLikeAlbumHandler.bind(this);
  }

  async postLikeAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    // Pastikan album ada
    await this._albumsService.getAlbumById(albumId);

    const isLiked = await this._service.isUserLikedAlbum(userId, albumId);

     if (isLiked) {
  throw new InvariantError('Gagal menyukai album. Anda sudah menyukai album ini', 400);
  }
  await this._service.likeAlbum(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });
    response.code(201);
    return response;
  }

   async deleteLikeAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);

    const isLiked = await this._service.isUserLikedAlbum(userId, albumId);
    if (!isLiked) {
      throw new InvariantError('Gagal batal menyukai album. Anda belum menyukai album ini');
    }

    await this._service.unlikeAlbum(userId, albumId);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album',
    };
  }
  
  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    const { likes, source } = await this._service.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    if (source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = LikesHandler;
