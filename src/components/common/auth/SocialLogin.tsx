'use client';

import { signIn } from 'next-auth/react';
import { Github, Mail } from 'lucide-react';

const SocialLogin = () => {
    return (
        <div className="flex flex-col space-y-4">
            <button
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="flex items-center justify-center space-x-2 w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
                <Github size={20} />
                <span>Continuar com Github</span>
            </button>

            <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="flex items-center justify-center space-x-2 w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
                <Mail size={20} />
                <span>Continuar com Google</span>
            </button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                        ou continue com
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;