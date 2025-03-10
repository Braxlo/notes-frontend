"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteNote } from "@/lib/notes";
import { Note } from "@/types";

interface NoteCardProps {
    note: Note;
    onUpdate: () => void;
}

export default function NoteCard({ note, onUpdate }: NoteCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = () => {
        router.push(`/notes/${note.id}/edit`);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNote(note.id);
            toast.success("Note deleted", {
                description: "Your note has been deleted successfully",
            });
            onUpdate();
        } catch (error) {
            toast.error("Error", {
                description: "Failed to delete note",
            });
        } finally {
            setIsDeleting(false);
            setIsDialogOpen(false);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="line-clamp-2">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleEdit}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your note.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    );
}