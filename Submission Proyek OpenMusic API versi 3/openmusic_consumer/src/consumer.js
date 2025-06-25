require('dotenv').config();

const { listen } = require('./ExportListener'); // listen dari ExportListener.js
const PlaylistsService = require('./PlaylistsService');
const MailSender = require('./MailSender');
const exportPlaylistListener = require('./listener'); // listener.js untuk logika proses pesan

const start = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();

  await listen(exportPlaylistListener, playlistsService, mailSender);
};

start();
