import React, { JSX } from 'react';
import { ButtonProps, InputProps, TitleProps, ModalProps, CardProps, DropdownProps } from '@/types/UIprops';
import Image from 'next/image'; // Fixed import for next/image

// Button Component
const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

// Input Component
const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  required,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
  readOnly,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  );
};

// Card Component
const Card: React.FC<CardProps> = ({ title, description, imageUrl, onClick, className }) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {imageUrl && <Image src={imageUrl} alt={title} width={150} height={150} />} {/* Added width and height */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// Title Component
const Title: React.FC<TitleProps> = ({ text, level = 1, className }) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return <Heading className={className}>{text}</Heading>;
};

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        {title && <h2>{title}</h2>}
        <button onClick={onClose}>Close</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

// Dropdown Component
const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, className }) => {
  return (
    <select className={className} onChange={(e) => onSelect(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export { Button, Input, Title, Modal, Card, Dropdown };