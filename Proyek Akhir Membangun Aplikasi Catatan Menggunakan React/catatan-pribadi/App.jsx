import React, { useState } from 'react';
import NoteInput from './src/components/NoteInput';
import NoteList from '../src/components/NoteList';
import SearchBar from './src/components/SearchBar';
import { getInitialData } from './src';

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
    setNotes(notes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📝 <span className="highlight">Catatan Pribadi</span></h1>

      <SearchBar search={search} setSearch={setSearch} />

      <NoteInput addNote={addNote} />

      <h2>📂 <span className="highlight">Catatan Aktif</span></h2>
      <NoteList
        notes={filteredNotes.filter(note => !note.archived)}
        onDelete={deleteNote}
        onArchive={toggleArchive}
      />

      <h2>📦 <span className="highlight">Arsip</span></h2>
      <NoteList
        notes={filteredNotes.filter(note => note.archived)}
        onDelete={deleteNote}
        onArchive={toggleArchive}
      />
    </div>
  );
}

console.log("✅ Aplikasi berhasil dimuat");
