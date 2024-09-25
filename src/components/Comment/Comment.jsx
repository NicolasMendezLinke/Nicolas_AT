import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import './Comment.css';

function Comment({ name, email, body, onDelete }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDelete = () => {
    onDelete();
    closeConfirmationModal();
  };

  return (
    <div className="comments">
      <h3>{name}</h3>
      <p className="email">{email}</p>
      <p>{body}</p>
      <button className="delete-btn" onClick={openConfirmationModal}>
        <FaTrash /> Excluir
      </button>

      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Você tem certeza que deseja excluir?</h4>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDelete}>Confirmar</button>
              <button className="cancel-btn" onClick={closeConfirmationModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;


