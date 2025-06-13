import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../app/(auth)/login/components/LoginForm';
import DashboardPage from '../app/dashboard/page';
import { AuthService } from '../app/lib/services/auth.service';
import { UserRole } from '../app/lib/types/auth';

const mockSignIn = jest.fn();
const mockSignOut = jest.fn();

jest.mock('next-auth/react', () => ({
  signIn: (...args: any[]) => mockSignIn(...args),
  signOut: (...args: any[]) => mockSignOut(...args),
  useSession: jest.fn(() => ({
    data: {
      user: {
        email: 'test@example.com',
        role: UserRole.USER
      }
    },
    status: 'authenticated'
  }))
}));

jest.mock('../app/lib/services/auth.service', () => ({
  AuthService: {
    getInstance: jest.fn(() => ({
      getUserRole: jest.fn().mockResolvedValue(UserRole.USER),
      validateUserAccess: jest.fn().mockReturnValue(true)
    }))
  }
}));

describe('Authentication', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockSignOut.mockClear();
  });

  it('should handle sign in', async () => {
    render(<LoginForm />);
    const signInButton = screen.getByText('Giriş Yap');
    fireEvent.click(signInButton);
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('auth0', expect.any(Object));
    });
  });

  it('should handle sign out', async () => {
    render(<DashboardPage />);
    const signOutButton = screen.getByText('Çıkış Yap');
    fireEvent.click(signOutButton);
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('should validate user role', async () => {
    const authService = AuthService.getInstance();
    const role = await authService.getUserRole('test@example.com');
    expect(role).toBe(UserRole.USER);
  });
}); 