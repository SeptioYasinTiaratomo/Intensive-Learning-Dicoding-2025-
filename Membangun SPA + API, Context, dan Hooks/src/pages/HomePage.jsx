import React, { useEffect, useState } from 'react';
import { getActiveNotes } from '../utils/network-data';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    }

    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword, notes]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>{t('active_notes') || 'Catatan Aktif'}</h2>
      </div>

      <SearchBar keyword={keyword} onKeywordChange={setKeyword} />

      {filteredNotes.length === 0 ? (
        <p className="empty-message">{t('no_notes') || 'Tidak ada catatan.'}</p>
      ) : (
        <NoteList notes={filteredNotes} />
      )}

      <Link to="/add" className="floating-add-button" title={t('add_note') || 'Tambah Catatan'}>
        +
      </Link>
    </div>
  );
}

export default HomePage;
