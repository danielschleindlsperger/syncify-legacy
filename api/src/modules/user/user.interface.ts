export interface IUser {
  id: string;
  name: string;
  accessToken?: AccessToken;
  refreshToken?: RefreshToken;
  expiresAt?: number;
  avatarUrl: string;
  updatedAt?: string;
  createdAt?: string;
}