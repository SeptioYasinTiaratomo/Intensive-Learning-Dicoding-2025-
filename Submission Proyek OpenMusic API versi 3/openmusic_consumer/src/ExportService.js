const fs = require('fs/promises');
const path = require('path');

class ExportService {
  constructor(playlistsService) {
    this._playlistsService = playlistsService;
  }

  async export(playlistId, targetEmail) {
    // ✅ Ambil langsung dari database, bukan dari HTTP server
    const playlist = await this._playlistsService.getPlaylistWithSongsById(playlistId);

    const data = {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        songs: playlist.songs.map(({ id, title, performer }) => ({ id, title, performer })),
      },
    };

    const filename = `playlist-${playlist.id}.json`;
    const filepath = path.resolve(__dirname, filename);

    await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    console.log(`✅ Diekspor ke: ${filename}`);
    console.log(`✉️ Target email: ${targetEmail}`);
  }
}

module.exports = ExportService;
