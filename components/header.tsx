"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth";

export default function Header() {
    const router = useRouter();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    return (
        <header className="border-b bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/notes" className="text-xl font-bold">
                    Notes App
                </Link>

                <div className="hidden md:flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                                <User className="h-4 w-4" />
                                <span className="font-medium">
                                    {user.name}
                                </span>
                            </div>
                            <Button variant="secondary" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    )}
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="secondary" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-4 mt-8">
                            {user && (
                                <>
                                    <div className="flex items-center gap-2 py-2">
                                        <User className="h-4 w-4" />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleLogout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}