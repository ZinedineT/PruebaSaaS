export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
  },
  
  // Profile routes
  PROFILE: {
    BASE: '/profile',
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/change-password',
  },
} as const;