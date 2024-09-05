import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Load Stripe outside of the component to avoid recreating the Stripe object
const stripePromise = loadStripe('your_stripe_publishable_key');

const ModalOverlay = styled(motion.div)`
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
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const PromoCodeInput = styled.div`
  display: flex;
  margin-bottom: 15px;

  input {
    flex-grow: 1;
    margin-right: 10px;
    margin-bottom: 0;
  }

  button {
    padding: 10px;
  }
`;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  billingPeriod: yup.string().oneOf(['monthly', 'yearly']).required(),
  promoCode: yup.string(),
});

const SubscriptionForm = ({ selectedPlan, pricingData, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [price, setPrice] = useState(null);

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      billingPeriod: 'monthly',
    },
  });

  const selectedTier = pricingData.find(tier => tier.name === selectedPlan);

  useEffect(() => {
    if (selectedTier) {
      setPrice(selectedTier.monthlyPrice);
    }
  }, [selectedTier]);

  const handlePromoCode = async () => {
    try {
      // Call your backend API to validate the promo code
      const response = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCode, plan: selectedPlan }),
      });
      const data = await response.json();
      if (data.valid) {
        setPromoCodeApplied(true);
        setPrice(data.discountedPrice);
        setError('');
      } else {
        setError('Invalid promo code');
      }
    } catch (err) {
      setError('Error applying promo code');
    }
  };

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: formData.name,
          email: formData.email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Call your backend API to create the subscription
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          plan: selectedPlan,
          billingPeriod: formData.billingPeriod,
          promoCode: promoCodeApplied ? promoCode : null,
        }),
      });

      const subscription = await response.json();

      if (subscription.error) {
        throw new Error(subscription.error);
      }

      // Update user context with new subscription info
      updateUser({
        ...user,
        subscription: {
          plan: selectedPlan,
          billingPeriod: formData.billingPeriod,
        },
      });

      setSuccess('Subscription successful! You will be redirected shortly.');
      setTimeout(() => {
        onClose();
        // Here you might want to redirect the user or update the UI
      }, 3000);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        ref={register}
        placeholder="Full Name"
      />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <Input
        name="email"
        ref={register}
        placeholder="Email"
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <Select
        name="billingPeriod"
        ref={register}
        onChange={(e) => {
          setValue('billingPeriod', e.target.value);
          setPrice(e.target.value === 'monthly' ? selectedTier.monthlyPrice : selectedTier.yearlyPrice);
        }}
      >
        <option value="monthly">Monthly - {selectedTier.monthlyPrice}/month</option>
        <option value="yearly">Yearly - {selectedTier.yearlyPrice}/year (Save 20%)</option>
      </Select>

      <PromoCodeInput>
        <Input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo Code"
        />
        <button type="button" onClick={handlePromoCode} disabled={isSubmitting}>
          Apply
        </button>
      </PromoCodeInput>

      <CardElement options={{style: {base: {fontSize: '16px'}}}} />

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : `Subscribe Now - ${price}`}
      </SubmitButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Form>
  );
};

const SubscriptionModal = ({ isOpen, onClose, selectedPlan, pricingData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <CloseButton onClick={onClose} aria-label="Close modal">&times;</CloseButton>
            <Title>Subscribe to {selectedPlan}</Title>
            <Elements stripe={stripePromise}>
              <SubscriptionForm 
                selectedPlan={selectedPlan} 
                pricingData={pricingData}
                onClose={onClose}
              />
            </Elements>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

SubscriptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  pricingData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    monthlyPrice: PropTypes.string.isRequired,
    yearlyPrice: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubscriptionModal;