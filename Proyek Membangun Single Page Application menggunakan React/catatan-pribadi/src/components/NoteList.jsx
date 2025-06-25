import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { Link } from "react-router-dom";

const cardBackgrounds = [
  "#FFDAB9", // Pastel Peach
  "#C3E0DC", // Pastel Mint
  "#D6CDEA", // Pastel Lavender
  "#FFF9C4", // Pastel Light Yellow
  "#B3D4FC", // Pastel Light Blue
];

export default function NotesList({ notes }) {
  if (notes.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>Tidak ada catatan</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="card"
          style={{
            backgroundColor: cardBackgrounds[index % cardBackgrounds.length],
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <h2>{note.title}</h2>
          <p style={{ fontSize: "0.9em", color: "#555" }}>
            Dibuat pada: {new Date(note.createdAt).toLocaleString()}
          </p>
          <p>{note.body}</p>
          <Link to={`/notes/${note.id}`} style={{ color: "blue", textDecoration: "underline" }}>
            Lihat Detail
          </Link>
        </div>
      ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};
