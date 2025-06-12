'use client';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Kullanıcı Paneli
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Çıkış Yap
            </button>
          </div>
          
          {session?.user && (
            <div className="mt-6 space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Kullanıcı Bilgileri</h2>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {session.user.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Rol:</span> {session.user.role}
                  </p>
                </div>
              </div>

              {session.user.role === 'ADMIN' && (
                <div className="mt-4">
                  <Link 
                    href="/admin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
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