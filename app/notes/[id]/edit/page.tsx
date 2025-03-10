"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getNote, updateNote } from "@/lib/notes";
import Header from "@/components/header";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditNotePage() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const noteId = Number(params.id);
                const note = await getNote(noteId);
                form.reset({
                    title: note.title,
                    content: note.content,
                });
            } catch (error) {
                toast.error("Error", {
                    description: "Failed to fetch note",
                });
                router.push("/notes");
            } finally {
                setIsFetching(false);
            }
        };

        fetchNote();
    }, [params.id, form, router]);

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            const noteId = Number(params.id);
            await updateNote(noteId, values);
            toast.success("Note updated", {
                description: "Your note has been updated successfully",
            });
            router.push("/notes");
        } catch (error) {
            toast.error("Error", {
                description: "Failed to update note",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
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
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Note</CardTitle>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Note title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Write your note content here..."
                                                        className="min-h-[200px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" type="button" onClick={() => router.push("/notes")}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? "Updating..." : "Update Note"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </main>
        </div>
    );
}