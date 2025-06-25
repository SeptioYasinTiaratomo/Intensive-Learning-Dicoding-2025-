import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert(t('all_fields_required'));
      return;
    }

    try {
      setLoading(true);
      await addNote({ title, body });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="add-page">
      <h2>{t('add_new_note')}</h2>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder={t('title_placeholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder={t('body_placeholder')}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit">{t('save')}</button>
      </form>
    </div>
  );
}

export default AddPage;
