import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import LanguageSwitcher from './LanguageSwitcher';
import { UserContext } from '../contexts/UserContext';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" aria-label="Home">PDF DOCTOR</Link>
      </div>

      <nav className={`menu ${isMenuOpen ? 'open' : ''}`} aria-label="Main Navigation">
        <ul>
          <li><Link to="/" className={isActive('/')} aria-current={isActive('/') ? 'page' : undefined}>Home</Link></li>
          <li className="dropdown">
            <span tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isMenuOpen} onKeyDown={(e) => handleKeyDown(e, toggleMenu)}>PDF TOOLS</span>
            <ul className="dropdown-content">
              <li><Link to="/merge_pdf" className={isActive('/merge_pdf')}>Merge PDF</Link></li>
              <li><Link to="/split_pdf" className={isActive('/split_pdf')}>Split PDF</Link></li>
              <li><Link to="/compress_pdf" className={isActive('/compress_pdf')}>Compress PDF</Link></li>
              <li><Link to="/ocr_pdf" className={isActive('/ocr_pdf')}>OCR PDF</Link></li>
              <li><Link to="/organize_pdf" className={isActive('/organize_pdf')}>Organize PDF</Link></li>
              <li><Link to="/rotate_pdf" className={isActive('/rotate_pdf')}>Rotate PDF</Link></li>
              <li><Link to="/sign_pdf" className={isActive('/sign_pdf')}>Sign PDF</Link></li>
              <li><Link to="/watermark_pdf" className={isActive('/watermark_pdf')}>Watermark PDF</Link></li>
              <li><Link to="/repair_pdf" className={isActive('/repair_pdf')}>Repair PDF</Link></li>
              <li><Link to="/number_pdf" className={isActive('/number_pdf')}>Number PDF</Link></li>
              <li><Link to="/edit_pdf" className={isActive('/edit_pdf')}>Edit PDF</Link></li>
              <li><Link to="/extract_table" className={isActive('/extract_table')}>Extract Table</Link></li>
              {/* ... other PDF tools ... */}
            </ul>
          </li>
          <li className="dropdown">
            <span tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isMenuOpen} onKeyDown={(e) => handleKeyDown(e, toggleMenu)}>CONVERT</span>
            <ul className="dropdown-content">
              <li><Link to="/pdf_to_excel" className={isActive('/pdf_to_excel')}>PDF to Excel</Link></li>
              <li><Link to="/excel_to_pdf" className={isActive('/excel_to_pdf')}>Excel to PDF</Link></li>
              {/* ... other conversion tools ... */}
            </ul>
          </li>
          <li className="dropdown">
            <span tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isMenuOpen} onKeyDown={(e) => handleKeyDown(e, toggleMenu)}>ANALYZE DOCUMENT</span>
            <ul className="dropdown-content">
              <li><Link to="/analyze_excel" className={isActive('/analyze_excel')}>ANALYZE EXCEL</Link></li>
              <li><Link to="/analyze_word" className={isActive('/analyze_word')}>ANALYZE WORD</Link></li>
              {/* ... other analysis tools ... */}
            </ul>
          </li>
          <li className="dropdown">
            <span tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isMenuOpen} onKeyDown={(e) => handleKeyDown(e, toggleMenu)}>IMAGE TOOLS</span>
            <ul className="dropdown-content">
              <li><Link to="/extract_table_from_image" className={isActive('/extract_table_from_image')}>Extract Table</Link></li>
              <li><Link to="/apply_ocr" className={isActive('/apply_ocr')}>Apply OCR</Link></li>
              {/* ... other image tools ... */}
            </ul>
          </li>
          <li><Link to="/pricing" className={isActive('/pricing')}>Pricing</Link></li>
          <li><Link to="/help" className={isActive('/help')}>Help and FAQs</Link></li>
        </ul>
      </nav>

      <div className="user-actions">
        <LanguageSwitcher />
        {user ? (
          <div className="user-menu dropdown">
            <span tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isMenuOpen} onKeyDown={(e) => handleKeyDown(e, toggleMenu)}>
              {user.name}
            </span>
            <ul className="dropdown-content">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/account-settings">Account Settings</Link></li>
              <li><Link to="/billing-info">Billing Info</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>

      <div 
        className="options" 
        onClick={toggleMenu} 
        onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
        tabIndex="0" 
        role="button" 
        aria-label="Toggle menu"
      >
        ☰
        {isMenuOpen && (
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/pdf_tools">PDF Tools</Link>
            <Link to="/convert">Convert</Link>
            <Link to="/analyze_document">Analyze Document</Link>
            <Link to="/image_tools">Image Tools</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/help">Help and FAQs</Link>
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/account-settings">Account Settings</Link>
                <Link to="/billing-info">Billing Info</Link>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;