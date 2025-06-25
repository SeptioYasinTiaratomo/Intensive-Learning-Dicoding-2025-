require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Exception classes
const {
  ClientError,
  AuthenticationError,
  AuthorizationError,
  InvariantError,
  NotFoundError,
} = require('./exceptions');

// Albums
const AlbumHandler = require('./albums/handler');
const albumRoutes = require('./albums/routes');
const AlbumService = require('./albums/service');
const AlbumValidator = require('./albums/validator');

// Songs
const SongsHandler = require('./songs/handler');
const songsRoutes = require('./songs/routes');
const SongsService = require('./songs/service');
const SongsValidator = require('./songs/validator');

// Users
const usersRoutes = require('./users/routes');
const UsersHandler = require('./users/handler');
const UsersService = require('./users/service');
const UsersValidator = require('./users/validator');

// Authentications
const authenticationsRoutes = require('./authentications/routes');
const AuthenticationsHandler = require('./authentications/handler');
const AuthenticationsService = require('./authentications/service');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./authentications/validator');

// Playlists
const playlistsRoutes = require('./playlists/routes');
const PlaylistsHandler = require('./playlists/handler');
const PlaylistsService = require('./playlists/service');
const PlaylistsValidator = require('./playlists/validator');

// Playlist Songs
const playlistSongsRoutes = require('./playlist_songs/routes');
const PlaylistSongsHandler = require('./playlist_songs/handler');
const PlaylistSongsService = require('./playlist_songs/service');
const PlaylistSongsValidator = require('./playlist_songs/validator');

// Collaborations
const collaborationsRoutes = require('./collaborations/routes');
const CollaborationsHandler = require('./collaborations/handler');
const CollaborationsService = require('./collaborations/service');
const CollaborationsValidator = require('./collaborations/validator');

// Playlist Activities
const playlistActivitiesRoutes = require('./playlist_activities/routes');
const PlaylistActivitiesHandler = require('./playlist_activities/handler');
const PlaylistActivitiesService = require('./playlist_activities/service');

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{ plugin: Jwt }]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: parseInt(process.env.ACCESS_TOKEN_AGE, 10),
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // Inisialisasi services
  const albumService = new AlbumService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const collaborationsService = new CollaborationsService(); // ✅ tidak perlu argumen
  const playlistsService = new PlaylistsService(collaborationsService);
  const authenticationsService = new AuthenticationsService();
  const playlistActivitiesService = new PlaylistActivitiesService();
  const playlistSongsService = new PlaylistSongsService(songsService, playlistActivitiesService);

  // Registrasi routes
  server.route(albumRoutes(new AlbumHandler(albumService, AlbumValidator)));
  server.route(songsRoutes(new SongsHandler(songsService, SongsValidator)));
  server.route(usersRoutes(new UsersHandler(usersService, UsersValidator)));
  server.route(authenticationsRoutes(
    new AuthenticationsHandler(authenticationsService, usersService, TokenManager, AuthenticationsValidator)
  ));
  server.route(playlistsRoutes(new PlaylistsHandler(playlistsService, PlaylistsValidator)));
  server.route(playlistSongsRoutes(
    new PlaylistSongsHandler(playlistSongsService, playlistsService, PlaylistSongsValidator)
  ));
  server.route(collaborationsRoutes(
    new CollaborationsHandler(collaborationsService, playlistsService, CollaborationsValidator)
  ));
  server.route(playlistActivitiesRoutes(
    new PlaylistActivitiesHandler(playlistActivitiesService, playlistsService)
  ));

  // Global error handler
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode);
    }

    if (response.isBoom && response.output.statusCode >= 400 && response.output.statusCode < 500) {
      return h.response({
        status: 'fail',
        message: response.output.payload.message,
      }).code(response.output.statusCode);
    }

    if (response instanceof Error) {
      console.error(response);
      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      }).code(500);
    }

    return h.continue;
  });

  return server;
};

if (require.main === module) {
  (async () => {
    try {
      const server = await createServer();
      await server.start();
      console.log(`✅ Server berjalan pada ${server.info.uri}`);
    } catch (err) {
      console.error('❌ Gagal menjalankan server:', err);
    }
  })();
}

module.exports = createServer;
