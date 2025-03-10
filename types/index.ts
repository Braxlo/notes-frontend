export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}
