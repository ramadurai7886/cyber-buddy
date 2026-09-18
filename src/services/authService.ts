import { UserProfile, LoginFormData, SignupFormData } from '../types/auth';
import { StorageService } from './storageService';

// Default pre-seeded demo user
const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_8829',
  name: 'Alex Chen',
  email: 'demo@cyberbuddy.dev',
  preferredLanguage: 'en',
  role: 'SecOps Lead',
  createdAt: new Date().toISOString(),
};

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

export const AuthService = {
  /**
   * Calculates password strength score (0 to 100) and category
   */
  calculatePasswordStrength(password: string): { score: number; label: 'weak' | 'medium' | 'strong' } {
    if (!password) return { score: 0, label: 'weak' };
    
    let score = 0;
    if (password.length >= 8) score += 30;
    if (password.length >= 12) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;

    let label: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 70) label = 'strong';
    else if (score >= 40) label = 'medium';

    return { score, label };
  },

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  /**
   * Get active session user
   */
  getCurrentUser(): UserProfile | null {
    return StorageService.getItem<UserProfile | null>(StorageService.KEYS.SESSION_USER, null);
  },

  /**
   * Demo quick login with pre-configured user
   */
  async demoLogin(): Promise<AuthResponse> {
    // Artificial 400ms loading effect for realistic UX
    await new Promise(resolve => setTimeout(resolve, 400));
    StorageService.setItem(StorageService.KEYS.SESSION_USER, DEFAULT_DEMO_USER);
    return { success: true, user: DEFAULT_DEMO_USER };
  },

  /**
   * Authenticate with email & password in demo mode
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    if (!email) {
      return { success: false, error: 'emailRequired' };
    }
    if (!this.isValidEmail(email)) {
      return { success: false, error: 'emailInvalid' };
    }
    if (!password) {
      return { success: false, error: 'passwordRequired' };
    }

    // Check registered demo users or default demo user
    const users = StorageService.getItem<Record<string, { user: UserProfile; passwordHash: string }>>(
      StorageService.KEYS.REGISTERED_USERS,
      {}
    );

    if (users[email]) {
      if (users[email].passwordHash === password) {
        StorageService.setItem(StorageService.KEYS.SESSION_USER, users[email].user);
        return { success: true, user: users[email].user };
      } else {
        return { success: false, error: 'invalidLogin' };
      }
    }

    // Default demo login accepted
    if (email === 'demo@cyberbuddy.dev') {
      StorageService.setItem(StorageService.KEYS.SESSION_USER, DEFAULT_DEMO_USER);
      return { success: true, user: DEFAULT_DEMO_USER };
    }

    // For ease of demo testing: any user providing a valid email and non-trivial password can log in
    if (password.length >= 6) {
      const generatedUser: UserProfile = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Developer',
        email: email,
        preferredLanguage: 'en',
        role: 'Developer',
        createdAt: new Date().toISOString(),
      };
      StorageService.setItem(StorageService.KEYS.SESSION_USER, generatedUser);
      return { success: true, user: generatedUser };
    }

    return { success: false, error: 'invalidLogin' };
  },

  /**
   * Register a new user in demo storage
   */
  async register(data: SignupFormData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 700));

    const fullName = data.fullName.trim();
    const email = data.email.trim().toLowerCase();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (!fullName) return { success: false, error: 'nameRequired' };
    if (!email) return { success: false, error: 'emailRequired' };
    if (!this.isValidEmail(email)) return { success: false, error: 'emailInvalid' };
    if (!password) return { success: false, error: 'passwordRequired' };
    if (password.length < 6) return { success: false, error: 'passwordLength' };
    if (password !== confirmPassword) return { success: false, error: 'passwordMismatch' };
    if (!data.agreeTerms) return { success: false, error: 'termsRequired' };

    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: fullName,
      email: email,
      preferredLanguage: data.preferredLanguage || 'en',
      role: 'Developer',
      createdAt: new Date().toISOString(),
    };

    // Save to registered users pool
    const users = StorageService.getItem<Record<string, { user: UserProfile; passwordHash: string }>>(
      StorageService.KEYS.REGISTERED_USERS,
      {}
    );
    users[email] = { user: newUser, passwordHash: password };
    StorageService.setItem(StorageService.KEYS.REGISTERED_USERS, users);

    // Set active session
    StorageService.setItem(StorageService.KEYS.SESSION_USER, newUser);
    return { success: true, user: newUser };
  },

  /**
   * Simulated forgot password
   */
  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return { success: false, error: 'emailRequired' };
    if (!this.isValidEmail(trimmed)) return { success: false, error: 'emailInvalid' };
    return { success: true };
  },

  /**
   * Log out and clean session
   */
  logout(): void {
    StorageService.removeItem(StorageService.KEYS.SESSION_USER);
  }
};
