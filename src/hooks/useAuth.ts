import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

export const useAuth = () => {
    const { data: session, status } = useSession();

    const login = useCallback(async (provider: string) => {
        try {
            await signIn(provider, { callbackUrl: '/' });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await signOut({ callbackUrl: '/' });
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }, []);

    return {
        user: session?.user,
        isAuthenticated: !!session,
        isLoading: status === 'loading',
        login,
        logout,
    };
};