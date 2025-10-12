'use client';

import { useEffect } from 'react';
import { FiAlertTriangle, FiTrash2, FiLogOut, FiX } from 'react-icons/fi';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // "danger", "warning", "info"
  icon
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-gradient-secondary',
          confirmBtn: 'bg-gradient-secondary shake',
          icon: <FiTrash2 size={24} className="text-white" />
        };
      case 'warning':
        return {
          iconBg: 'bg-gradient-warning',
          confirmBtn: 'bg-gradient-warning shake',
          icon: <FiLogOut size={24} className="text-white" />
        };
      default:
        return {
          iconBg: 'bg-gradient-info',
          confirmBtn: 'bg-gradient-info sparkle',
          icon: <FiAlertTriangle size={24} className="text-white" />
        };
    }
  };

  const typeConfig = getTypeConfig();
  const displayIcon = icon || typeConfig.icon;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop animate-in" onClick={handleBackdropClick}>
      <div className="confirmation-modal modal-enter">
        <div className="confirmation-modal-content">
          {/* Header */}
          <div className="confirmation-modal-header">
            <div className={`confirmation-modal-icon ${typeConfig.iconBg} bounce`}>
              {displayIcon}
            </div>
            <div className="space-y-3">
              <h3 className="confirmation-modal-title color-shift">
                {title}
              </h3>
              <p className="confirmation-modal-message">
                {message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="confirmation-modal-actions">
            <button
              onClick={onClose}
              className="confirmation-modal-button confirmation-modal-button-cancel flex items-center justify-center gap-2"
              title="Cancel action"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`confirmation-modal-button confirmation-modal-button-confirm ${typeConfig.confirmBtn} flex items-center justify-center gap-2`}
              title={`${confirmText} action`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}