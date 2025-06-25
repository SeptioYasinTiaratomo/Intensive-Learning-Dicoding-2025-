import React from "react";
import PropTypes from "prop-types";
import { useSearchParams, Link } from "react-router-dom";
import NotesList from "../components/NoteList";

export default function ActiveNotesPage({ notes, onDelete, onArchiveToggle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      !note.archived &&
      note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
      <h1>Daftar Catatan Aktif</h1>
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={handleSearchChange}
        style={{ marginBottom: "1em", padding: "0.5em", width: "100%" }}
      />
      
      <NotesList
        notes={filteredNotes}
        onDelete={onDelete}
        onArchiveToggle={onArchiveToggle}
      />

      <div style={{ marginTop: "1em" }}>
        <Link to="/notes/new">➕ Tambah Catatan Baru</Link>
      </div>
    </div>
  );
}

ActiveNotesPage.propTypes = {
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
