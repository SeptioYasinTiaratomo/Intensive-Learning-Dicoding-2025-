exports.up = (pgm) => {
  // Menambahkan kolom cover_url pada tabel albums
  pgm.addColumn('albums', {
    cover_url: {
      type: 'TEXT',
      allowNull: true,
    },
  });

  // Tabel user_album_likes
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // Constraint: foreign key user_id → users.id
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  // Constraint: foreign key album_id → albums.id
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id', {
    foreignKeys: {
      columns: 'album_id',
      references: 'albums(id)',
      onDelete: 'CASCADE',
    },
  });

  // Constraint: kombinasi unik user dan album (1 user hanya boleh like 1x)
  pgm.addConstraint('user_album_likes', 'unique_user_album_like', {
    unique: ['user_id', 'album_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
  pgm.dropColumn('albums', 'cover_url');
};
