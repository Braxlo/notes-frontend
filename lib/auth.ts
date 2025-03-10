import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3001";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const register = async (data: RegisterData, p0: boolean) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        const {user, accessToken} = response.data;

        localStorage.setItem("token", accessToken)
        localStorage.setItem("user", JSON.stringify(user));

        return user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Registration failed");
        }
        throw new Error("Registration failed");
    }
}

export const login = async (data: LoginData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        const {user, accessToken} = response.data;

        localStorage.setItem("token", accessToken)
        localStorage.setItem("user", JSON.stringify(user));

        return user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Login failed");
        }
        throw new Error("Login failed");
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return{
        Authorization: `Bearer ${token}`,
    };
};