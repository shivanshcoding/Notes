'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MarkdownGuide from '@/components/MarkdownGuide';
import MarkdownPreview from '@/components/MarkdownPreview';
import ConfirmationModal from '@/components/ConfirmationModal';
import NoteCard from '@/components/NoteCard';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { FiEdit, FiEye, FiBook } from 'react-icons/fi';

export default function Dashboard() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('write'); // For mobile: 'write' or 'preview'
  const [isLoading, setIsLoading] = useState(true);
  const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger'
  });

  const fetchNotes = async () => {
    if (!session?.accessToken) return;
    setIsLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, config);
      setNotes(data);
    } catch (error) {
      toast.error('Failed to fetch notes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(session) fetchNotes();
  }, [session]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!currentNote.title || !currentNote.content) {
      return toast.error("Title and content are required.");
    }
    const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
    const noteData = { title: currentNote.title, content: currentNote.content };

    const promise = currentNote.id
      ? axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${currentNote.id}`, noteData, config)
      : axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, noteData, config);

    toast.promise(promise, {
      loading: 'Saving note...',
      success: `Note ${currentNote.id ? 'updated' : 'created'}!`,
      error: 'Failed to save note.',
    });

    try {
      await promise;
      closeEditor();
      fetchNotes();
    } catch (error) { /* Toast handles error */ }
  };

  const handleDeleteNote = (id, noteTitle) => {
    setConfirmationModal({
      isOpen: true,
      title: 'Delete Note? 🗑️',
      message: `Are you sure you want to delete "${noteTitle}"? This action cannot be undone and your note will be lost forever.`,
      type: 'danger',
      onConfirm: async () => {
        const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
        const promise = axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, config);

        toast.promise(promise, {
          loading: 'Deleting note... 🔄',
          success: 'Note deleted successfully! ✅',
          error: 'Failed to delete note. ❌',
        });

        try {
          await promise;
          fetchNotes();
        } catch (error) { /* Toast handles error */ }
      }
    });
  };

  const openEditorForNew = () => {
    setCurrentNote({ id: null, title: '', content: '' });
    setActiveTab('write');
    setIsEditorOpen(true);
  };

  const openEditorForEdit = (note) => {
    setCurrentNote({ id: note._id, title: note.title, content: note.content });
    setActiveTab('write');
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setActiveTab('write');
  };

  const openPreview = (note) => {
    setPreviewNote(note);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewNote(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted animate-pulse rounded-lg w-48"></div>
          <div className="h-10 bg-muted animate-pulse rounded-lg w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 h-48 animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-6 mb-12">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand via-accent-purple to-accent-pink bg-clip-text animate-fade-in color-shift">
            Your Notes ✨
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-medium">
            {notes.length === 0 ? (
              <span className="animate-bounce">🚀 Start your creative journey</span>
            ) : (
              <span className="">
                📚 {notes.length} {notes.length === 1 ? 'masterpiece' : 'masterpieces'} created
              </span>
            )}
          </p>
        </div>
        <button 
          onClick={openEditorForNew} 
          className="btn btn-primary text-base px-8 py-4 h-auto shadow-xl hover:shadow-2xl rainbow-glow transform hover:scale-105 transition-all duration-300 sparkle"
        >
          <IoMdAdd size={22} className="mr-3" />
        Create Magic ✨
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={note._id} className={`stagger-animation stagger-${Math.min(index + 1, 9)}`}>
              <div onClick={() => openPreview(note)}>
                <NoteCard 
                  note={note} 
                  onPreview={() => openPreview(note)}
                  onEdit={() => openEditorForEdit(note)} 
                  onDelete={() => handleDeleteNote(note._id, note.title)} 
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <FiEdit size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-6">Create your first note to get started on your journey.</p>
              <button 
                onClick={openEditorForNew}
                className="btn btn-primary"
              >
                <IoMdAdd size={20} className="mr-2" />
                Create First Note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sophisticated Markdown Editor Modal */}
      {isEditorOpen && (
        <div className="modal-backdrop animate-in">
          <div className="editor-modal bg-card border border-border rounded-2xl shadow-2xl overflow-hidden modal-enter flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    {currentNote.id ? 'Edit Note' : 'New Note'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowMarkdownGuide(true)}
                    className="flex btn-action bg-gradient-info hover:shadow-lg sparkle relative overflow-hidden transform hover:scale-110 transition-all duration-300"
                    title="Markdown Guide - Learn formatting tips!"
                  >
                    <span className="hidden sm:inline font-medium text-black">📖 Guide</span>
                  </button>
                </div>
                {/* Mobile Tab Controls */}
                <div className="flex md:hidden bg-gradient-to-r from-muted to-muted/50 rounded-xl p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                      activeTab === 'write'
                        ? 'bg-gradient-tertiary text-white shadow-lg scale-105 sparkle'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <FiEdit size={16} className={activeTab === 'write' ? 'bounce' : ''} />
                    ✍️ Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                      activeTab === 'preview'
                        ? 'bg-gradient-success text-white shadow-lg scale-105 sparkle'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <FiEye size={16} className={activeTab === 'preview' ? 'bounce' : ''} />
                    👁️ Preview
                  </button>
                </div>
              </div>
              <button
                onClick={closeEditor}
                className="btn-action hover:bg-destructive/20 hover:text-destructive hover:shadow-lg transform hover:scale-110 hover:rotate-90 transition-all duration-300"
                type="button"
                title="Close editor"
              >
                <IoMdClose size={20} className="shake" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col min-h-0">
              {/* Title Input */}
              <div className="px-6 py-4 border-b border-border">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full text-2xl font-semibold bg-transparent border-none focus:outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>

              {/* Editor Content */}
              <div className="flex-1 flex min-h-0">
                {/* Desktop: Side-by-side layout */}
                <div className="hidden md:flex w-full">
                  {/* Editor Panel */}
                  <div className="w-1/2 border-r border-border flex flex-col">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FiEdit size={16} />
                        Markdown Editor
                      </div>
                    </div>
                    <textarea
                      placeholder={`# Welcome to Modern Notes ✨

Try these markdown features:

## Code Blocks
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## Math Equations
$E = mc^2$ or $$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

## Tables
| Feature | Supported |
|---------|----------|
| Tables  | ✅ |
| Math    | ✅ |
| Code    | ✅ |

## Task Lists
- [x] Enhanced markdown
- [ ] Your next task

> **Tip**: See the live preview on the right! 🚀`}
                      value={currentNote.content}
                      onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                      className="flex-1 w-full p-6 bg-transparent border-none focus:outline-none placeholder:text-muted-foreground resize-none font-mono text-sm leading-relaxed"
                    />
                  </div>
                  
                  {/* Preview Panel */}
                  <div className="w-1/2 flex flex-col">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FiEye size={16} />
                        Live Preview
                      </div>
                    </div>
                    <div className="flex-1 p-6 overflow-auto">
                      <MarkdownRenderer content={currentNote.content} />
                    </div>
                  </div>
                </div>

                {/* Mobile: Tabbed layout */}
                <div className="md:hidden w-full flex flex-col">
                  {activeTab === 'write' ? (
                    <textarea
                      placeholder="# Your Note Title

Start writing... Supports:
- **Bold** and *italic* text
- `code` and code blocks
- Math equations: $x^2$
- Tables, lists, and more!

Switch to Preview tab to see results 🚀"
                      value={currentNote.content}
                      onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                      className="flex-1 w-full p-6 bg-transparent border-none focus:outline-none placeholder:text-muted-foreground resize-none font-mono text-sm leading-relaxed"
                    />
                  ) : (
                    <div className="flex-1 p-6 overflow-auto">
                      <MarkdownRenderer content={currentNote.content} />
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10">
                <div className="text-sm text-muted-foreground font-medium">
                  📝 {currentNote.content.length} characters • {currentNote.content.split(' ').length} words
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={closeEditor} 
                    className="btn btn-secondary transform hover:scale-105 transition-all duration-300 sparkle hover:shadow-lg"
                  >
                    ❌ Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary transform hover:scale-105 transition-all duration-300 rainbow-glow hover:shadow-2xl sparkle disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!currentNote.title.trim() || !currentNote.content.trim()}
                  >
                    {currentNote.id ? '✨ Update Magic' : '✨ Create Magic'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Markdown Guide Modal */}
      <MarkdownGuide 
        isOpen={showMarkdownGuide} 
        onClose={() => setShowMarkdownGuide(false)} 
      />
      
      {/* Markdown Preview Modal */}
      <MarkdownPreview 
        note={previewNote}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        onEdit={() => {
          if (previewNote) {
            openEditorForEdit(previewNote);
            closePreview();
          }
        }}
        onDelete={() => {
          if (previewNote) {
            handleDeleteNote(previewNote._id, previewNote.title);
          }
        }}
      />
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        confirmText={confirmationModal.type === 'danger' ? '🗑️ Delete Forever' : 'Confirm'}
        cancelText="❌ Cancel"
      />
    </>
  );
}
