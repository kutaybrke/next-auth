export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Session {
  user: User;
  accessToken: string;
  expires: string;
} 