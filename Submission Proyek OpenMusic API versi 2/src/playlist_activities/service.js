const { Pool } = require('pg');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async getActivities(playlistId) {
    const query = {
      text: `
        SELECT users.username, songs.title, action, time
        FROM playlist_song_activities
        JOIN users ON playlist_song_activities.user_id = users.id
        JOIN songs ON playlist_song_activities.song_id = songs.id
        WHERE playlist_song_activities.playlist_id = $1
        ORDER BY time ASC
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistActivitiesService;
