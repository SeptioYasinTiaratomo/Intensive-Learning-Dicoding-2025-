import React from 'react';

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="🔍 Cari catatan..."
      aria-label="Cari catatan"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
