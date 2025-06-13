import { User, UserRole } from '../types/auth';

export interface IAuthService {
  getUserRole(email: string): Promise<UserRole>;
  validateUserAccess(user: User, requiredRole: UserRole): boolean;
}

interface Auth0Role {
  name: string;
  description?: string;
  id: string;
}

export class AuthService implements IAuthService {
  private static instance: AuthService;
  private readonly AUTH0_DOMAIN: string;
  private readonly AUTH0_M2M_CLIENT_ID: string;
  private readonly AUTH0_M2M_CLIENT_SECRET: string;

  private constructor() {
    this.AUTH0_DOMAIN = process.env.AUTH0_ISSUER?.replace('https://', '') || '';
    this.AUTH0_M2M_CLIENT_ID = process.env.AUTH0_M2M_CLIENT_ID || '';
    this.AUTH0_M2M_CLIENT_SECRET = process.env.AUTH0_M2M_CLIENT_SECRET || '';
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async getAuth0Token(): Promise<string> {
    const response = await fetch(`https://${this.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.AUTH0_M2M_CLIENT_ID,
        client_secret: this.AUTH0_M2M_CLIENT_SECRET,
        audience: `https://${this.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
    });

    const data = await response.json();
    return data.access_token;
  }

  async getUserRole(email: string): Promise<UserRole> {
    try {
      const token = await this.getAuth0Token();
      
      // Kullanıcıyı email ile bul
      const usersResponse = await fetch(
        `https://${this.AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const users = await usersResponse.json();
      if (!users.length) return UserRole.USER;

      const userId = users[0].user_id;

      // Kullanıcının rollerini al
      const rolesResponse = await fetch(
        `https://${this.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const roles = await rolesResponse.json();
      
      // Admin rolü varsa ADMIN, yoksa USER döndür
      return roles.some((role: Auth0Role) => role.name === 'admin') 
        ? UserRole.ADMIN 
        : UserRole.USER;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return UserRole.USER;
    }
  }

  validateUserAccess(user: User, requiredRole: UserRole): boolean {
    if (user.role === UserRole.ADMIN) return true;
    return user.role === requiredRole;
  }
} 

