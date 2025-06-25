const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // Import routes dari routes.js

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Bolehkan CORS jika perlu
      },
    },
  });

  server.route(routes); // Registrasi semua rute

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
