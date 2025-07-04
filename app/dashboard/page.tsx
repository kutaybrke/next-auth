'use client';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import LoadingComponent from '@/components/loading';
import { FaUser, FaShieldAlt, FaCog } from 'react-icons/fa';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  if (isSigningOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hoş Geldiniz
              </h1>
              <p className="text-gray-600 mt-1">Kullanıcı Paneli</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Çıkış Yap
            </button>
          </div>
          
          {session?.user && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Kullanıcı Bilgileri</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaShieldAlt className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rol</p>
                      <p className="text-gray-900 font-medium">{session.user.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {session.user.role === 'ADMIN' && (
                <div className="mt-6">
                  <Link 
                    href="/admin"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                  >
                    <FaCog className="w-5 h-5 mr-2" />
                    Admin Paneline Git
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 