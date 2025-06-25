import React, { useEffect, useState } from 'react';
import { getArchivedNotes, unarchiveNote } from '../utils/network-data';
import Loading from '../components/Loading';
import NoteItem from '../components/NoteItem';
import { useTranslation } from 'react-i18next';

function ArchivePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const { t } = useTranslation();

  const fetchNotes = async () => {
    const { data } = await getArchivedNotes();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUnarchive = async (id) => {
    const confirm = window.confirm(t('confirm_unarchive'));
    if (!confirm) return;

    setProcessingId(id);
    await unarchiveNote(id);
    await fetchNotes();
    setProcessingId(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="home-page">
      <h2>{t('archived_notes')}</h2>
      {notes.length === 0 ? (
        <p className="empty-message">{t('no_archived_notes')}</p>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card-wrapper">
              <NoteItem {...note} />
              <button
                onClick={() => handleUnarchive(note.id)}
                disabled={processingId === note.id}
                className="unarchive-button"
              >
                {processingId === note.id ? t('processing') : t('unarchive')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchivePage;
