'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '@/components/NoteCard';
import { IoMdAdd } from 'react-icons/io';

export default function Dashboard() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const fetchNotes = async () => {
    if (!session?.accessToken) return;
    try {
      const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, config);
      setNotes(data);
    } catch (error) {
      toast.error('Failed to fetch notes.');
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
    setIsEditorOpen(true);
  };

  const openEditorForEdit = (note) => {
    setCurrentNote({ id: note._id, title: note.title, content: note.content });
    setIsEditorOpen(true);
  };

  const closeEditor = () => setIsEditorOpen(false);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <button onClick={openEditorForNew} className="flex items-center gap-2 bg-brand-light dark:bg-indigo-600 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-opacity">
          <IoMdAdd size={20} />
          New Note
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteCard key={note._id} note={note} onEdit={() => openEditorForEdit(note)} onDelete={() => handleDeleteNote(note._id)} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center mt-8">No notes yet. Create one to get started!</p>
        )}
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-in fade-in-0">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl border border-muted shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">{currentNote.id ? 'Edit Note' : 'New Note'}</h2>
            <form onSubmit={handleSaveNote}>
              <input
                type="text"
                placeholder="Note Title"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className="w-full bg-muted/50 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brand-light dark:focus:ring-brand-dark"
              />
              <textarea
                placeholder="Content (Markdown supported)"
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                rows={10}
                className="w-full bg-muted/50 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brand-light dark:focus:ring-brand-dark"
              />
              <div className="flex justify-end gap-4">
                <button type="button" onClick={closeEditor} className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-brand-light dark:bg-indigo-600 hover:opacity-90 text-white transition-opacity">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}