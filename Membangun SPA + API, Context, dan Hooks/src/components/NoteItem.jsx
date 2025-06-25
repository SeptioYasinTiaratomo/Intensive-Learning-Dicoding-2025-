import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteItem({ id, title, body, createdAt }) {
  const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="note-card">
      <h3 className="note-title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-date">{formattedDate}</p>
      <p className="note-body">{body.slice(0, 100)}...</p>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
