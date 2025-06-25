const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Username sudah digunakan');
    }
  }

  async getUserByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    return result.rows[0]; // jangan melempar error di sini
  }

  async verifyUserCredential(username, password) {
    const user = await this.getUserByUsername(username);

    if (!user) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return user.id;
  }
}

module.exports = UsersService;
