const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity({ playlistId, songId, userId, action }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO playlist_song_activities (id, playlist_id, song_id, user_id, action, time)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [id, playlistId, songId, userId, action, time],
    };

    await this._pool.query(query);
  }

  async getActivities(playlistId) {
    const query = {
      text: `
        SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
        FROM playlist_song_activities
        JOIN users ON playlist_song_activities.user_id = users.id
        JOIN songs ON playlist_song_activities.song_id = songs.id
        WHERE playlist_song_activities.playlist_id = $1
        ORDER BY playlist_song_activities.time ASC
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Aktivitas playlist tidak ditemukan');
    }

    return result.rows;
  }
}

module.exports = PlaylistActivitiesService;
