import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword, onKeywordChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Cari catatan..."
      value={keyword}
      onChange={(e) => onKeywordChange(e.target.value)}
    />
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
