import React from "react";
import PropTypes from "prop-types";
import NotesList from "../components/NoteList";
import { Link } from "react-router-dom";

export default function ArchivedNotesPage({ notes, onDelete, onArchiveToggle }) {
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
      <h1>Daftar Catatan Arsip</h1>

      <NotesList
        notes={archivedNotes}
        onDelete={onDelete}
        onArchiveToggle={onArchiveToggle}
      />

      {archivedNotes.length === 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>Tidak ada catatan yang diarsipkan</p>
      )}

      <div style={{ marginTop: "1em" }}>
        <Link to="/">← Kembali ke Daftar Aktif</Link>
      </div>
    </div>
  );
}

ArchivedNotesPage.propTypes = {
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
