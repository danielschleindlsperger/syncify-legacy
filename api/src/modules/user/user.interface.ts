export interface User {
  id?: string;
  name: string;
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  expiresAt: number;
  avatarUrl: string;
  createdAt?: string;
  updatedAt?: string;
}