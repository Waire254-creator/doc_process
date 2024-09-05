import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledIconButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '120px'};
  height: ${props => props.size || '120px'};
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  color: ${props => props.active ? '#fff' : props.color || '#333'};
  background-color: ${props => props.active ? props.activeColor || '#007bff' : props.backgroundColor || '#f8f9fa'};
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &:hover, &:focus {
    background-color: ${props => props.active ? props.activeColor || '#007bff' : '#e9ecef'};
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  img {
    width: ${props => props.iconSize || '48px'};
    height: ${props => props.iconSize || '48px'};
    margin-bottom: 8px;
  }

  .button-text {
    text-align: center;
    font-size: 14px;
    line-height: 1.2;

    .small {
      font-size: 12px;
      color: ${props => props.active ? '#fff' : '#666'};
    }
  }

  .loading-spinner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;

    &::after {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid #007bff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: ${spin} 0.8s linear infinite;
    }
  }
`;

const IconButton = ({ 
  to, 
  icon, 
  text, 
  description, 
  active, 
  loading,
  color,
  backgroundColor,
  activeColor,
  size,
  iconSize,
  onClick,
  ariaLabel
}) => {
  const buttonContent = (
    <>
      <img src={icon} alt="" aria-hidden="true" />
      <div className="button-text">
        {text}
        {description && <div className="small">{description}</div>}
      </div>
      {loading && <div className="loading-spinner" aria-label="Loading" />}
    </>
  );

  const commonProps = {
    active,
    color,
    backgroundColor,
    activeColor,
    size,
    iconSize,
    'aria-label': ariaLabel || text,
    'aria-busy': loading,
    onClick: loading ? (e) => e.preventDefault() : onClick
  };

  return to ? (
    <StyledIconButton to={to} {...commonProps}>
      {buttonContent}
    </StyledIconButton>
  ) : (
    <StyledIconButton as="button" type="button" {...commonProps}>
      {buttonContent}
    </StyledIconButton>
  );
};

IconButton.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  activeColor: PropTypes.string,
  size: PropTypes.string,
  iconSize: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string
};

export default IconButton;