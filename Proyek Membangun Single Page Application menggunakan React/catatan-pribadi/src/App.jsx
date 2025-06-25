import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ActiveNotesPage from "./pages/ActiveNotesPage";
import ArchivedNotesPage from "./pages/ArchivedNotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NoteAddPage from "./pages/NoteAddPage";
import NotFoundPage from "./pages/NotFoundPage";

import {
  getAllNotes,
  addNote as addNoteLocal,
  deleteNote as deleteNoteLocal,
  archiveNote as archiveNoteLocal,
  unarchiveNote as unarchiveNoteLocal,
  editNote as editNoteLocal,
} from "./utils/local-data";

export default function App() {
  // State notes
  const [notes, setNotes] = useState([]);

  // Load data awal
  useEffect(() => {
    setNotes(getAllNotes());
  }, []);

  // Fungsi notes
  const addNote = (note) => {
    addNoteLocal(note);
    setNotes(getAllNotes());
  };
  const deleteNote = (id) => {
    deleteNoteLocal(id);
    setNotes(getAllNotes());
  };
  const toggleArchive = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    if (note.archived) {
      unarchiveNoteLocal(id);
    } else {
      archiveNoteLocal(id);
    }
    setNotes(getAllNotes());
  };
  const editNote = ({ id, title, body }) => {
    editNoteLocal({ id, title, body });
    setNotes(getAllNotes());
  };

  // DARK MODE
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(prefersDark);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode(prev => !prev);
  }

  return (
    <Router>
      <header style={{ padding: '10px', textAlign: 'right' }}>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </header>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Aktif</Link> | <Link to="/archived">Arsip</Link> |{" "}
        <Link to="/notes/new">Tambah</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ActiveNotesPage
              notes={notes}
              onDelete={deleteNote}
              onArchiveToggle={toggleArchive}
            />
          }
        />
        <Route
          path="/archived"
          element={
            <ArchivedNotesPage
              notes={notes}
              onDelete={deleteNote}
              onArchiveToggle={toggleArchive}
            />
          }
        />
        <Route path="/notes/new" element={<NoteAddPage onAddNote={addNote} />} />
        <Route
          path="/notes/:id"
          element={
            <NoteDetailPage
              notes={notes}
              onDelete={deleteNote}
              onArchiveToggle={toggleArchive}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
