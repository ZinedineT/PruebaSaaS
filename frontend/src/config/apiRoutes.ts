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
    // Users management routes (NUEVO)
  USERS: {
    BASE: '/users',                    // GET (activos), POST (crear)
    ALL: '/users/all',                 // GET (todos activos e inactivos)
    TRASHED: '/users/trashed',         // GET (eliminados soft)
    DETAIL: (id: number) => `/users/${id}`,           // PUT, DELETE
    RESTORE: (id: number) => `/users/${id}/restore`,  // POST
    FORCE: (id: number) => `/users/${id}/force`,      // POST (hard delete)
    CHANGE_PASSWORD: (id: number) => `/users/${id}/password`, // PUT
  },
} as const;