"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getNotes } from "@/lib/notes";
import NoteCard from "@/components/note-card";
import Header from "@/components/header";
import { Note } from "@/types";

export default function NotesPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/auth/login");
            } else {
                fetchNotes();
            }
        }
    }, [isAuthenticated, isLoading, router]);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (error) {
            toast.error("Error", {
                description: "Failed to fetch notes",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNote = () => {
        router.push("/notes/create");
    };

    if (isLoading || loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                    <h1 className="mt-8 text-2xl font-semibold">Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Notes</h1>
                    <Button onClick={handleCreateNote}>
                        <Plus className="mr-2 h-4 w-4" /> Create Note
                    </Button>
                </div>

                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="text-xl font-medium text-muted-foreground mb-4">No notes yet</h2>
                        <p className="text-muted-foreground mb-6">Create your first note to get started</p>
                        <Button onClick={handleCreateNote}>
                            <Plus className="mr-2 h-4 w-4" /> Create Note
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} onUpdate={fetchNotes} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}