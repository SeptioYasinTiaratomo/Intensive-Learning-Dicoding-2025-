const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../exceptions/NotFoundError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserExists(userId) {
    const result = await this._pool.query('SELECT id FROM users WHERE id = $1', [userId]);

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
  }

  async addCollaboration(playlistId, userId) {
    // Verifikasi user yang ingin dijadikan kolaborator ada
    await this.verifyUserExists(userId);

    const id = `collab-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO collaborations (id, playlist_id, user_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new Error('Kolaborasi gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Kolaborasi gagal dihapus. Data tidak ditemukan.');
    }
  }

  // Opsional: Digunakan oleh playlistsService untuk verifikasi akses kolaborator
  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Kolaborasi tidak ditemukan');
    }
  }
}

module.exports = CollaborationsService;
