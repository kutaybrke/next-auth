'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { technologies } from '@/app/lib/login/technologies';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTech, setActiveTech] = useState<number | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn('auth0', { callbackUrl: '/user' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="group relative flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative flex items-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Giriş yapılıyor...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>Giriş Yap</span>
              </>
            )}
          </span>
        </button>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-14">
            Auth0 Kimlik Doğrulama
          </h1>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeTech === index ? 'scale-105' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveTech(index)}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-white mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-gray-400">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <div className="h-1 w-1 rounded-full bg-indigo-500 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-purple-500 animate-pulse delay-100" />
            <div className="h-1 w-1 rounded-full bg-pink-500 animate-pulse delay-200" />
          </div>
        </div>
      </div>
    </div>
  );
} 