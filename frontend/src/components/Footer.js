import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  color: #333;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1 1 200px;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex: 1 1 100%;
    }

    h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: #333;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 1rem;

    a {
      font-size: 1.5rem;
    }
  }

  .newsletter-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    input {
      flex: 1 1 150px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .footer-bottom {
    margin-top: 2rem;
    text-align: center;
    border-top: 1px solid #ddd;
    padding-top: 1rem;

    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <StyledFooter role="contentinfo">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>{t('footer.quickLinks')}</h3>
          <nav aria-label={t('footer.quickLinksNavLabel')}>
            <ul>
              <li><Link to="/">{t('footer.home')}</Link></li>
              <li><Link to="/features">{t('footer.features')}</Link></li>
              <li><Link to="/pricing">{t('footer.pricing')}</Link></li>
              <li><Link to="/about">{t('footer.about')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contactUs')}</h3>
          <address>
            <p>{t('footer.email')}: <a href="mailto:pdfdoctor@gmail.com">pdfdoctor@gmail.com</a></p>
            <p>{t('footer.phone')}: <a href="tel:+254743819365">+254743819365</a></p>
          </address>
        </div>

        <div className="footer-section">
          <h3>{t('footer.followUs')}</h3>
          <nav aria-label={t('footer.socialMediaNavLabel')}>
            <ul className="social-icons">
              <li>
                <a href="https://facebook.com/pdfdoctor" target="_blank" rel="noopener noreferrer" aria-label={t('footer.facebookAriaLabel')}>
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/pdfdoctor" target="_blank" rel="noopener noreferrer" aria-label={t('footer.twitterAriaLabel')}>
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/pdfdoctor" target="_blank" rel="noopener noreferrer" aria-label={t('footer.linkedinAriaLabel')}>
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-section">
          <h3>{t('footer.newsletter')}</h3>
          <form onSubmit={handleNewsletterSubmit} aria-label={t('footer.newsletterFormAriaLabel')} className="newsletter-form">
            <label htmlFor="newsletter-email" className="visually-hidden">{t('footer.emailLabel')}</label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.emailPlaceholder')}
              required
              aria-required="true"
            />
            <button type="submit">{t('footer.subscribe')}</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright', { year: currentYear })}</p>
        <nav aria-label={t('footer.legalNavLabel')}>
          <ul>
            <li><Link to="/privacy-policy">{t('footer.privacyPolicy')}</Link></li>
            <li><Link to="/terms-of-service">{t('footer.termsOfService')}</Link></li>
          </ul>
        </nav>
      </div>
    </StyledFooter>
  );
};

export default Footer;