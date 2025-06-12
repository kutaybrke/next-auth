'use client';
import { useSession } from 'next-auth/react';
import { UserRole } from '../lib/types/auth';

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Paneli
          </h1>
          
          {session?.user && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-lg font-medium text-gray-900">Kullanıcı Bilgileri</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Email: {session.user.email}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Rol: {session.user.role || UserRole.USER}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 