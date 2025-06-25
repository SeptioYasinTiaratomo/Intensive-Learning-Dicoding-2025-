import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

export default function NotesList({ notes, onDelete, onArchiveToggle }) {
  if (notes.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>Tidak ada catatan</p>;
  }

  return (
    <ul style={{ maxWidth: "800px", margin: "0 auto", listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchiveToggle={onArchiveToggle}
        />
      ))}
    </ul>
  );
}

NotesList.propTypes = {
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
