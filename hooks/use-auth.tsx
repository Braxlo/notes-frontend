"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { User } from "@/types"

interface AuthContextType {
user: User | null
isAuthenticated: boolean
isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
user: null,
isAuthenticated: false,
isLoading: true,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<User | null>(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const checkAuth = () => {
    try {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

    if (token && userData) {
            setUser(JSON.parse(userData))
    }
        } catch (error) {
            console.error("Error checking authentication:", error)
    } finally {
            setIsLoading(false)
        }
    }

    checkAuth()
}, [])

    return (
        <AuthContext.Provider
        value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        }}
    >
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
