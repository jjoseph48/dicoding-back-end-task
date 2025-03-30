const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// menjalankan server Hapi dengan asynchronus
const init = async () => {
  const server = Hapi.server({
    port: 9001,
    host: 'localhost',
    routes: {
      cors: {
        // tambahkan mekanisme CORD
        origin: ['*'],
      },
    }
  })

  server.route(routes);

  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
  };

  init();
