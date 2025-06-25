import React from 'react';

export default function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  return (
    <div className="note-card">
      <h3>{title}</h3>
      <div className="note-date">
        📅 {new Date(createdAt).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}
      </div>
      <div className="note-content">
        {body}
      </div>

      <div className="actions">
        <button className="btn btn-delete" onClick={() => onDelete(id)}>
          🗑️ Hapus
        </button>
        <button className="btn btn-archive" onClick={() => onArchive(id)}>
          {archived ? '⬅️ Pindahkan' : '📦 Arsipkan'}
        </button>
      </div>
    </div>
  );
}
