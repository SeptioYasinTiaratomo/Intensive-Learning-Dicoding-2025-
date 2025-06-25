const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    // Verifikasi playlist ada
    const playlistQuery = {
      text: `
        SELECT id, name
        FROM playlists
        WHERE id = $1
      `,
      values: [playlistId],
    };
    const playlistResult = await this._pool.query(playlistQuery);

    // Ambil daftar lagu dari playlist
    const songsQuery = {
      text: `
        SELECT songs.id, songs.title, songs.performer
        FROM playlist_songs
        JOIN songs ON playlist_songs.song_id = songs.id
        WHERE playlist_songs.playlist_id = $1
      `,
      values: [playlistId],
    };
    const songsResult = await this._pool.query(songsQuery);

    const songs = songsResult.rows.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));

    const playlist = {
      id: playlistResult.rows[0].id,
      name: playlistResult.rows[0].name,
      songs: songs, // username dihapus
    };

    return { playlist };
  }
}

module.exports = PlaylistsService;
