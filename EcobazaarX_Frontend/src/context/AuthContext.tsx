import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Helper to decode JWT tokens

// Defines the structure of the decoded JWT token
interface DecodedToken {
    sub: string;      // Subject (usually the email or username)
    roles: string[];  // Array of roles
    exp: number;      // Expiration timestamp (in seconds)
}

interface AuthContextType {
    token: string | null;
    userEmail: string | null;
    userRoles: string[];
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);
                // Check if the token is expired (exp is in seconds, Date.now() is in ms)
                if (decoded.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUserEmail(decoded.sub);
                    setUserRoles(decoded.roles);
                } else {
                    // Token is expired, clear it
                    logout();
                }
            } catch (error) {
                console.error("Invalid token found in storage:", error);
                // Directly call the logout logic
                localStorage.removeItem('token');
                setToken(null);
                setUserEmail(null);
                setUserRoles([]);
            }
        }
    }, []);

    const login = (newToken: string) => {
        try {
            const decoded: DecodedToken = jwtDecode(newToken);
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUserEmail(decoded.sub);
            setUserRoles(decoded.roles);
        } catch (error) {
            console.error("Failed to decode new token during login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserEmail(null);
        setUserRoles([]);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, userEmail, userRoles, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

