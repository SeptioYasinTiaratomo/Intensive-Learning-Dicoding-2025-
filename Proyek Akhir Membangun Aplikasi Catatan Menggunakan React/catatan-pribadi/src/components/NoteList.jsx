import React from 'react';
import NoteItem from './NoteItem'; 

export default function NoteList({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return <p className="note-empty">📭 Tidak ada catatan</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}
