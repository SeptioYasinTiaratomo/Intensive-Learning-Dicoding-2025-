import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../utils/network-data';
import { useInput } from '../hooks/useInput';

function RegisterPage() {
  const { t } = useTranslation();

  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      alert(t('all_fields_required'));
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert(t('password_mismatch'));
      return;
    }

    if (password.value.length < 6) {
      alert(t('password_minimum'));
      return;
    }

    setLoading(true);
    const { error } = await register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    setLoading(false);

    if (!error) {
      alert(t('register_success'));
      navigate('/login');
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">{t('app_title')}</h1>
      <div className="login-box">
        <h2 className="login-heading">{t('fill_form')}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">{t('name')}</label>
          <input id="name" type="text" placeholder={t('enter_name')} {...name} required />

          <label htmlFor="email">{t('email')}</label>
          <input id="email" type="email" placeholder={t('enter_email')} {...email} required />

          <label htmlFor="password">{t('password')}</label>
          <input id="password" type="password" placeholder={t('enter_password')} {...password} required />

          <label htmlFor="confirm-password">{t('confirm_password')}</label>
          <input
            id="confirm-password"
            type="password"
            placeholder={t('repeat_password')}
            {...confirmPassword}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? t('registering') : t('register')}
          </button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          {t('already_have_account')}{' '}
          <Link to="/login" style={{ textDecoration: 'underline' }}>
            {t('login_here')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
