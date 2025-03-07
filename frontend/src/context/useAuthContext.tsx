import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

type ChildrenType = Readonly<{ children: ReactNode }>;

type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

export type AuthContextType = {
    user: UserType | undefined;
    isAuthenticated: boolean;
    saveSession: (session: UserType) => void;
    removeSession: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

const authSessionKey = '_EDUPORT_AUTH_KEY_';

export function AuthProvider({ children }: ChildrenType) {
    const navigate = useNavigate();

    const getSession = (): AuthContextType['user'] => {
        const fetchedCookie = getCookie(authSessionKey)?.toString();
        if (!fetchedCookie) {
            return;
        }
        return JSON.parse(fetchedCookie);
    };

    const [user, setUser] = useState<UserType | undefined>(getSession());

    const saveSession = (user: UserType) => {
        setCookie(authSessionKey, JSON.stringify(user));
        setUser(user);
    };

    const removeSession = () => {
        deleteCookie(authSessionKey);
        setUser(undefined);
        navigate('/auth/sign-in');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: hasCookie(authSessionKey),
                saveSession,
                removeSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
