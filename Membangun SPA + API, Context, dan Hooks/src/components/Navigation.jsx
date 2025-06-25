import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

import moonIcon from '../assets/moon-icon.jpg';
import languageIcon from '../assets/language-icon.gif';
import logoutIcon from '../assets/logout-icon.jpg';

function Navigation() {
  const { toggleTheme } = React.useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const { authedUser, logout } = React.useContext(AuthContext);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/">{t('Home')}</Link>

        {authedUser ? (
          <>
            <Link to="/archives">{t('Archives')}</Link>
            <button onClick={logout} className="nav-btn">
              <img
                src={logoutIcon}
                alt="Logout Icon"
                className="theme-icon"
                style={{ width: '20px', marginRight: '6px', verticalAlign: 'middle' }}
              />
              {t('Logout')}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">{t('login')}</Link>
            <Link to="/register">{t('register')}</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {authedUser && (
          <span
            className="user-info"
            style={{ marginRight: '10px', fontWeight: 'bold' }}
          >
            {authedUser.name}
          </span>
        )}
        <button className="theme-toggle-btn" onClick={toggleLanguage}>
          <img src={languageIcon} alt="Ganti Bahasa" className="theme-icon" />
        </button>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <img src={moonIcon} alt="Toggle Theme" className="theme-icon" />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
