
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Types for our MongoDB-based auth
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
}

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      fetchCurrentUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      
      setUser({
        id: userData._id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAdmin: userData.isAdmin
      });
      
      setIsAdmin(userData.isAdmin || false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store the token
      localStorage.setItem('authToken', data.token);
      
      // Set user and admin status
      setUser(data.user);
      setIsAdmin(data.user.isAdmin || false);
      
      return { error: null };
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed: " + error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store the token
      localStorage.setItem('authToken', data.token);
      
      // Set user and admin status
      setUser(data.user);
      setIsAdmin(data.user.isAdmin || false);
      
      return { error: null };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    
    // Clear user state
    setUser(null);
    setIsAdmin(false);
    
    toast.success("Signed out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
