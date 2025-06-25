import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { login as loginRequest } from '../utils/network-data';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation();
  const email = useInput('');
  const password = useInput('');
  const { theme } = React.useContext(ThemeContext);
  const { login } = React.useContext(AuthContext); // ✅ pakai `login`
  const navigate = useNavigate(); // ✅ redirect setelah login berhasil

  const onSubmit = async (event) => {
    event.preventDefault();
    const { error, data } = await loginRequest({ email: email.value, password: password.value });

    if (!error) {
      await login(data);        // ✅ gunakan `login` dari AuthContext
      navigate('/');            // ✅ redirect ke halaman utama
    } else {
      alert(t('loginError'));
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">{t('app_title')}</h1>
      <div className="login-box">
        <h2 className="login-heading">{t('loginTitle')}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">{t('email')}</label>
          <input type="email" id="email" {...email} required />
          <label htmlFor="password">{t('password')}</label>
          <input type="password" id="password" {...password} required />
          <button type="submit">{t('login')}</button>
        </form>
        <p>
          {t('noAccount')}{' '}
          <Link to="/register">{t('registerHere')}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
