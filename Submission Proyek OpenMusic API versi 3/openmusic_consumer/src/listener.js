const exportPlaylistListener = async (message, playlistsService, mailSender) => {
  const { playlistId, targetEmail } = JSON.parse(message.content.toString());

  const playlist = await playlistsService.getSongsFromPlaylist(playlistId);

  // Kirim email langsung dengan objek playlist (tanpa membungkus lagi)
  await mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
};

module.exports = exportPlaylistListener;
