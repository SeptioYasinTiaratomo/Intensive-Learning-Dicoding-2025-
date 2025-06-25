const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        maxBytes: 512000,// 512 KB 
        output: 'stream',
        allow: 'multipart/form-data',
        multipart: true,
        parse: true, // ← tambahkan ini!
      },
      auth: false
    },
  },
];

module.exports = routes;
