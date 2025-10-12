'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-card rounded-lg p-5 flex flex-col justify-between shadow-sm border border-muted hover:border-brand-light dark:hover:border-brand-dark transition-all duration-300">
      <div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2">{note.title}</h3>
        <div className="prose prose-sm dark:prose-invert text-muted-foreground max-h-40 overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-muted">
        <p className="text-xs text-muted-foreground">
          Updated {new Date(note.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-3">
          <button onClick={onEdit} className="text-muted-foreground hover:text-blue-500 transition-colors"><FiEdit size={18} /></button>
          <button onClick={onDelete} className="text-muted-foreground hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
      </div>
    </div>
  );
}