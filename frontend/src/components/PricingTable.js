import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ToggleLabel = styled.span`
  margin: 0 10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196F3;
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const PricingTiersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const PricingTier = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;

  ${props => props.highlighted && `
    border: 2px solid #007bff;
    position: relative;
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #007bff;
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
  `}
`;

const TierName = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const Price = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
  text-align: left;

  li {
    padding: 5px 0;
    display: flex;
    align-items: center;
    
    &::before {
      content: '✓';
      color: #28a745;
      margin-right: 10px;
    }
  }
`;

const FeatureInfo = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: #007bff;
`;

const CtaButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover, &:focus {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  ${props => props.disabled && `
    background-color: #6c757d;
    cursor: not-allowed;

    &:hover {
      background-color: #6c757d;
    }
  `}
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const PricingTable = ({ pricingData }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleSelectTier = (tierName) => {
    setSelectedTier(tierName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTier(null);
  };

  const getPrice = (tier) => {
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
    return isYearly ? `${price}/year` : `${price}/month`;
  };

  return (
    <PricingContainer>
      <ToggleContainer>
        <ToggleLabel>Monthly</ToggleLabel>
        <ToggleSwitch>
          <ToggleInput type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
          <ToggleSlider />
        </ToggleSwitch>
        <ToggleLabel>Yearly (Save 20%)</ToggleLabel>
      </ToggleContainer>

      <PricingTiersContainer>
        <AnimatePresence>
          {pricingData.map((tier, index) => (
            <PricingTier
              key={tier.name}
              highlighted={tier.highlighted}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TierName>{tier.name}</TierName>
              <Price
                key={isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getPrice(tier)}
              </Price>
              <FeatureList>
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    {feature.name}
                    <FeatureInfo data-tip data-for={`${tier.name}-${featureIndex}`}>ⓘ</FeatureInfo>
                    <ReactTooltip id={`${tier.name}-${featureIndex}`} effect="solid">
                      {feature.description}
                    </ReactTooltip>
                  </li>
                ))}
              </FeatureList>
              <CtaButton 
                onClick={() => handleSelectTier(tier.name)}
                disabled={user && user.tier === tier.name}
                aria-label={`Select ${tier.name} plan`}
              >
                {user && user.tier === tier.name ? 'Current Plan' : 'Select Plan'}
              </CtaButton>
            </PricingTier>
          ))}
        </AnimatePresence>
      </PricingTiersContainer>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            {pricingData.map(tier => (
              <th key={tier.name}>{tier.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(pricingData[0].featureComparison).map(feature => (
            <tr key={feature}>
              <td>{feature}</td>
              {pricingData.map(tier => (
                <td key={`${tier.name}-${feature}`}>{tier.featureComparison[feature]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </ComparisonTable>

      <AnimatePresence>
        {showModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h2>Checkout for {selectedTier}</h2>
              <p>Here you would implement your checkout process.</p>
              <CtaButton onClick={closeModal}>Close</CtaButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PricingContainer>
  );
};

PricingTable.propTypes = {
  pricingData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    monthlyPrice: PropTypes.string.isRequired,
    yearlyPrice: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
    highlighted: PropTypes.bool,
    featureComparison: PropTypes.object.isRequired,
  })).isRequired,
};

export default PricingTable;