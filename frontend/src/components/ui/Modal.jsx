/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Modal.css'; // Make sure to style your modal

const Modal = ({ image, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt="Transfered" className="modal-image" />
      </div>
    </div>
  );
};

export default Modal;
