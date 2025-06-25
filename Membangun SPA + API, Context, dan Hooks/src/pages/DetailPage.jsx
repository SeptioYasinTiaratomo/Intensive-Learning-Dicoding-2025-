import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/network-data';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

import { FaTrash, FaArchive, FaBoxOpen } from 'react-icons/fa';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }

    fetchNote();
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm(t('confirm_delete'))) return;

    setProcessing(true);
    await deleteNote(id);
    navigate('/');
  };

  const onToggleArchive = async () => {
    const confirmMsg = note.archived ? t('confirm_unarchive') : t('confirm_archive');
    if (!window.confirm(confirmMsg)) return;

    setProcessing(true);
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }

    const { data } = await getNote(id);
    setNote(data);
    setProcessing(false);
  };

  if (loading) return <Loading />;
  if (!note) return <p>{t('note_not_found')}</p>;

  return (
    <div className="detail-page">
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <div className="button-group">
        <button onClick={onDelete} disabled={processing}>
          <FaTrash style={{ marginRight: 6 }} />
          {t('delete')}
        </button>
        <button onClick={onToggleArchive} disabled={processing}>
          {note.archived ? (
            <>
              <FaBoxOpen style={{ marginRight: 6 }} />
              {t('unarchive')}
            </>
          ) : (
            <>
              <FaArchive style={{ marginRight: 6 }} />
              {t('archive')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
