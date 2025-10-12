'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiEdit, FiTrash2, FiClock } from 'react-icons/fi';

export default function NoteCard({ note, onEdit, onDelete }) {
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
    <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:scale-[1.02] hover:border-brand/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-brand transition-colors duration-200 line-clamp-2 leading-tight">
            {note.title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 hover:bg-brand/10 hover:text-brand rounded-lg transition-all duration-200 transform hover:scale-110"
              title="Edit note"
            >
              <FiEdit size={16} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-200 transform hover:scale-110"
              title="Delete note"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 mb-4">
          <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none overflow-hidden">
            <div className="line-clamp-4 leading-relaxed">
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
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FiClock size={12} />
            <span>{formatDate(note.updatedAt)}</span>
          </div>
          <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to edit
          </div>
        </div>
      </div>
    </div>
  );
}
