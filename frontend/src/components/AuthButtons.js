import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext';

const StyledAuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StyledButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  text-align: center;

  ${props => props.primary ? `
    background-color: #007bff;
    color: white;
    border: 2px solid #007bff;

    &:hover, &:focus {
      background-color: #0056b3;
      border-color: #0056b3;
    }
  ` : `
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;

    &:hover, &:focus {
      background-color: #007bff;
      color: white;
    }
  `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  padding: 10px;
  border-radius: 5px;

  &:hover, &:focus {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const UserMenuDropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 0;
  margin: 5px 0 0;
  list-style-type: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 10;

  li {
    padding: 5px 20px;

    a {
      color: #333;
      text-decoration: none;

      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }
`;

const AuthButtons = ({ loginText = "Login", signUpText = "Sign Up" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleClickOutside = (event) => {
    if (isMenuOpen && !event.target.closest('.user-menu')) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (user) {
    return (
      <UserMenu className="user-menu">
        <UserMenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          {user.name} ▼
        </UserMenuButton>
        {isMenuOpen && (
          <UserMenuDropdown>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </UserMenuDropdown>
        )}
      </UserMenu>
    );
  }

  return (
    <StyledAuthButtons>
      <StyledButton to="/login" aria-label={loginText}>
        {loginText}
      </StyledButton>
      <StyledButton to="/signup" primary aria-label={signUpText}>
        {signUpText}
      </StyledButton>
    </StyledAuthButtons>
  );
};

AuthButtons.propTypes = {
  loginText: PropTypes.string,
  signUpText: PropTypes.string,
};

export default AuthButtons;