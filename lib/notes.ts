import axios from 'axios';
import { getAuthHeader } from './auth';
import { Note } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getNotes = async (): Promise<Note[]> => {
    try {
        const response = await axios.get(`${API_URL}/notes`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to fetch notes");
        }
        throw new Error("Failed to fetch notes");
    }
};

export const getNote = async (id: number): Promise<Note> => {
    try {
        const response = await axios.get(`${API_URL}/notes/${id}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to fetch note");
        }
        throw new Error("Failed to fetch note");
    }
}

export const createNote = async (data: { title: string; content: string}): Promise<Note> => {
    try {
        const response = await axios.post(`${API_URL}/notes`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to create note");
        }
        throw new Error("Failed to create note");
    }
}

export const updateNote = async (id: number, data: { title?: string; content?: string}): Promise<Note> => {
    try {
        const response = await axios.put(`${API_URL}/notes/${id}`, data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to update note");
        }
        throw new Error("Failed to update note");
    }
}

export const deleteNote = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/notes/${id}`, {
            headers: getAuthHeader(),
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Failed to delete note");
        }
        throw new Error("Failed to delete note");
    }
}