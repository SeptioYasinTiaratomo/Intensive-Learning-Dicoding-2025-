import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

export default function NoteAddPage({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Judul dan isi catatan tidak boleh kosong.");
      return;
    }

    const newNote = {
      id: "notes-" + +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    onAddNote(newNote);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1em" }}>
      <h1>Tambah Catatan Baru</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Judul:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Masukkan judul catatan"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.5em",
                padding: "0.5em",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>
            Isi:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder="Tulis isi catatanmu di sini..."
              rows={6}
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.5em",
                padding: "0.5em",
              }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "0.5em 1em" }}>
          Tambah
        </button>
      </form>
      <div style={{ marginTop: "1.5em" }}>
        <Link to="/">← Kembali ke Daftar Catatan</Link>
      </div>
    </div>
  );
}

NoteAddPage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
