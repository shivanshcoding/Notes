'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MarkdownGuide from '@/components/MarkdownGuide';
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

  const handleDeleteNote = async (id) => {
    // A custom modal would be better than confirm, but for simplicity:
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
    const promise = axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, config);

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note.',
    });

    try {
      await promise;
      fetchNotes();
    } catch (error) { /* Toast handles error */ }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Your Notes</h1>
          <p className="text-muted-foreground text-lg">
            {notes.length === 0 ? 'Start your journey' : `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} created`}
          </p>
        </div>
        <button 
          onClick={openEditorForNew} 
          className="btn btn-primary text-base px-6 py-3 h-auto shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          <IoMdAdd size={20} className="mr-2" />
          New Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={note._id} className={`stagger-animation stagger-${Math.min(index + 1, 9)}`}>
              <div onClick={() => openEditorForEdit(note)}>
                <NoteCard 
                  note={note} 
                  onEdit={() => openEditorForEdit(note)} 
                  onDelete={() => handleDeleteNote(note._id)} 
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-animate flex items-center justify-center p-4 z-50 animate-slide-in-up">
          <div className="bg-card border border-border rounded-2xl w-full max-w-7xl max-h-[90vh] h-full shadow-2xl overflow-hidden animate-slide-in-up flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {currentNote.id ? 'Edit Note' : 'New Note'}
                </h2>
                {/* Mobile Tab Controls */}
                <div className="flex md:hidden bg-muted rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'write'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FiEdit size={16} />
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FiEye size={16} />
                    Preview
                  </button>
                </div>
              </div>
              <button
                onClick={closeEditor}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                type="button"
              >
                <IoMdClose size={20} className="text-muted-foreground" />
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
              <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  {currentNote.content.length} characters
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={closeEditor} 
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!currentNote.title.trim() || !currentNote.content.trim()}
                  >
                    {currentNote.id ? 'Update Note' : 'Create Note'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}