'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiEdit, FiTrash2, FiClock, FiEye } from 'react-icons/fi';

export default function NoteCard({ note, onEdit, onDelete, onPreview }) {
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

  return (
    <div className="group note-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-brand/20 hover:scale-[1.03] hover:border-brand/50 transition-all duration-500 cursor-pointer sparkle">
      <div className="note-card-content flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-all duration-300 line-clamp-2 leading-tight color-shift">
            {note.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 transform translate-x-2 group-hover:translate-x-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              className="btn-action btn-preview"
              title="Preview note"
            >
              <FiEye size={14} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="btn-action btn-edit"
              title="Edit note"
            >
              <FiEdit size={14} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="btn-action btn-delete"
              title="Delete note"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 mb-4">
          <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none overflow-hidden">
            <div className="line-clamp-4 leading-relaxed group-hover:text-foreground transition-colors duration-300">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Simplify markdown rendering for preview
                  h1: ({...props}) => <span className="font-semibold" {...props} />,
                  h2: ({...props}) => <span className="font-semibold" {...props} />,
                  h3: ({...props}) => <span className="font-semibold" {...props} />,
                  h4: ({...props}) => <span className="font-medium" {...props} />,
                  h5: ({...props}) => <span className="font-medium" {...props} />,
                  h6: ({...props}) => <span className="font-medium" {...props} />,
                  p: ({...props}) => <span {...props} />,
                  ul: ({...props}) => <span {...props} />,
                  ol: ({...props}) => <span {...props} />,
                  li: ({...props}) => <span {...props} />,
                  strong: ({...props}) => <strong className="font-semibold" {...props} />,
                  em: ({...props}) => <em {...props} />,
                  code: ({...props}) => <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props} />,
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50 group-hover:border-brand/30 transition-colors duration-300">
          <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-brand/80 transition-colors duration-300">
            <FiClock size={12} className="bounce" />
            <span>{formatDate(note.updatedAt)}</span>
          </div>
          <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            Click to preview • Edit • Delete
          </div>
        </div>
      </div>
    </div>
  );
}
