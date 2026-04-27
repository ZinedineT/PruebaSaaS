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
    // 👇 NUEVA SECCIÓN PARA REGISTRADOS
  REGISTRADOS: {
    BASE: '/registrados',                    // GET - Lista todos los registrados
    DETAIL: (id: number) => `/registrados/${id}`,  // GET - Detalle de un registrado
    WITH_HISTORY: (id: number) => `/registrados/${id}/with-history`,  // Historial de un registrado
    APPROVE: (id: number) => `/registrados/${id}/approve`,  // POST - Aprobar
    REJECT: (id: number) => `/registrados/${id}/reject`,    // POST - Rechazar
    OBSERVE: (id: number) => `/registrados/${id}/observe`,  // POST - Observar
  },
} as const;