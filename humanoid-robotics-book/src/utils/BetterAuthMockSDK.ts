// src/utils/BetterAuthMockSDK.ts

// src/utils/BetterAuthMockSDK.ts

/**
 * Placeholder function for user registration, matching the expected signature
 * of a real SDK call.
 * @param email - User's email address.
 * @param password - User's password.
 * @param backgroundData - Personalization data (software/hardware skills).
 * @returns A Promise that resolves to a mock user object.
 */
export const registerUser = async (
  email: string,
  password: string,
  backgroundData: { softwareSkill: string; hardwareSkill: string }
): Promise<{ userId: string; token: string }> => {
  console.log('--- MOCK SDK: Registering User ---');
  console.log('Email:', email);
  console.log('Background Data:', backgroundData);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    userId: 'user-' + Math.floor(Math.random() * 1000),
    token: 'mock-auth-token-12345',
  };
};

/**
 * Placeholder function for user login.
 */
export const loginUser = async (email: string, password: string): Promise<string> => {
  console.log('--- MOCK SDK: Logging In User ---');
  console.log('Email:', email);
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'mock-auth-token-67890';
};

export const signOut = async (): Promise<any> => {
  console.log('Mock signOut called');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
};

export const getCurrentUser = async (): Promise<any> => {
  console.log('Mock getCurrentUser called');
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate no logged-in user initially, or a logged-in user
      const loggedInUser = null; // { id: '123', email: 'test@example.com', name: 'Test User' };
      resolve({ user: loggedInUser });
    }, 200);
  });
};
