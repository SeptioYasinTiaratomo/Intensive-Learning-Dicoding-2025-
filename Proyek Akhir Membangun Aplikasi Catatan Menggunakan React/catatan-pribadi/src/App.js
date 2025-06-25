import React, { useState } from 'react';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
// Di atas file App.js, biasanya baris ke-5 sampai ke-10:
import { getInitialData } from './utils'; // ✅

import './style.css';

export default function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [search, setSearch] = useState('');

  const addNote = ({ title, body }) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString()
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, archived: !note.archived } : note));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📝 Catatan Pribadi</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <NoteInput addNote={addNote} />
      <h2>📂 Catatan Aktif</h2>
      <NoteList notes={filteredNotes.filter(n => !n.archived)} onDelete={deleteNote} onArchive={toggleArchive} />
      <h2>📁 Arsip</h2>
      <NoteList notes={filteredNotes.filter(n => n.archived)} onDelete={deleteNote} onArchive={toggleArchive} />
    </div>
  );
}
