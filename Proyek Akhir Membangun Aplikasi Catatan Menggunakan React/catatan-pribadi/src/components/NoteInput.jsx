import React, { useState } from 'react';

export default function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const maxChar = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="char-count">
        Sisa karakter judul: {maxChar - title.length}
      </div>

      <input
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, maxChar))}
        placeholder="Masukkan judul catatan..."
        required
      />

      <textarea
        className="textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Tulis isi catatan di sini..."
        required
      ></textarea>

      <button className="btn-add" type="submit">
        ➕ Tambahkan Catatan
      </button>
    </form>
  );
}
