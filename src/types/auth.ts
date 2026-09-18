export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
  role: 'Developer' | 'SecOps Lead' | 'Security Admin';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferredLanguage: string;
  agreeTerms: boolean;
}
