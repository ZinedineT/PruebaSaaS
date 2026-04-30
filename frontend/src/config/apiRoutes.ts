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
    APPROVE: (id: number | string) => `/registrados/${id}/verificar-aprobar`,
    OBSERVE: (id: number | string) => `/registrados/${id}/observar`,
    REJECT: (id: number | string) => `/registrados/${id}/rechazar`,
    REGISTER_PAYMENT: (id: number | string) => `/registrados/${id}/registrar-pago`,
  },
    // 👇 NUEVA SECCIÓN PARA CLIENTS
  CLIENTS: {
    BASE: '/clients',
    ALL: '/clients',
    ACTIVE: '/clients?status=active',
    DETAIL: (id: number) => `/clients/${id}`,
    CREATE: '/clients',
    UPDATE: (id: number) => `/clients/${id}`,
    DELETE: (id: number) => `/clients/${id}`,
  },
} as const;