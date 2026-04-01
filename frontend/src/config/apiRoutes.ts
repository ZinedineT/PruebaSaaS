export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
  },
  
  // Profile routes
  PROFILE: {
    BASE: '/me',
    UPDATE: '/me',           // PUT /me
    CHANGE_PASSWORD: '/me/password',  // PUT /me/password
    REGENERATE_TOKEN: '/me/token',    // POST /me/token
  },
} as const;