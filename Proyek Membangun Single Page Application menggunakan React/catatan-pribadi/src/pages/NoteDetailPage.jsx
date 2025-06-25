import React from "react";
import PropTypes from "prop-types";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function NoteDetailPage({ notes, onDelete, onArchiveToggle }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <div style={{ textAlign: "center", marginTop: "2em", color: "#888" }}>
        <h2>Catatan tidak ditemukan 😢</h2>
        <Link to="/">← Kembali ke Daftar</Link>
      </div>
    );
  }

  const handleDelete = () => {
    onDelete(id);
    navigate("/");
  };

  const handleArchiveToggle = () => {
    onArchiveToggle(id);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
      <article>
        <h1>{note.title}</h1>
        <p><i>{new Date(note.createdAt).toLocaleString()}</i></p>
        <p>{note.body}</p>
        <div style={{ marginTop: "1em" }}>
          <button onClick={handleDelete}>🗑️ Hapus</button>{" "}
          <button onClick={handleArchiveToggle}>
            {note.archived ? "Batal Arsip" : "Arsipkan"}
          </button>
        </div>
        <div style={{ marginTop: "2em" }}>
          <Link to="/">← Kembali ke Daftar Aktif</Link> |{" "}
          <Link to="/archived">📦 Lihat Arsip</Link>
        </div>
      </article>
    </div>
  );
}

NoteDetailPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchiveToggle: PropTypes.func.isRequired,
};
