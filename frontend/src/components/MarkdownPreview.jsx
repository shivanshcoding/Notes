'use client';

import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiEye, FiClock, FiEdit, FiTrash2, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import MarkdownRenderer from './MarkdownRenderer';

export default function MarkdownPreview({ note, isOpen, onClose, onEdit, onDelete }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div 
        className={`bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-slide-in-up note-card sparkle ${
          isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl max-h-[90vh] h-full'
        } flex flex-col transition-all duration-500`}
      >
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-gradient-to-r from-brand/5 via-accent-blue/5 to-accent-purple/5 note-card-content">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-success rounded-xl bounce">
              <FiEye size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground line-clamp-1">
                {note.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <FiClock size={14} />
                <span>Last updated {formatDate(note.updatedAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="btn-action bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
            </button>
            
            <button
              onClick={() => {
                onEdit();
                onClose();
              }}
              className="btn-action bg-gradient-tertiary hover:shadow-lg text-white"
              title="Edit note"
            >
              <FiEdit size={18} />
            </button>
            
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="btn-action bg-gradient-secondary hover:shadow-lg text-white shake"
              title="Delete note"
            >
              <FiTrash2 size={18} />
            </button>
            
            <button
              onClick={onClose}
              className="btn-action hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Close preview"
            >
              <IoMdClose size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 note-card-content">
          <div className="max-w-none">
            <MarkdownRenderer content={note.content} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 bg-gradient-to-r from-muted/20 via-transparent to-muted/20 note-card-content">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{note.content.length} characters</span>
              <span>•</span>
              <span>{note.content.split(' ').length} words</span>
              <span>•</span>
              <span>{Math.ceil(note.content.split(' ').length / 200)} min read</span>
            </div>
            <div className="text-xs opacity-70">
              Press ESC to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}