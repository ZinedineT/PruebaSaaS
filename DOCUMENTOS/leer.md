# 🚀 Guía de Configuración del Proyecto (Frontend + Backend + Docker)

Esta guía explica cómo configurar correctamente el entorno para ejecutar el proyecto en una nueva máquina.

---

# 📦 Arquitectura del Proyecto

El sistema está dividido en:

* **Backend (Laravel)** → corre en Docker (puerto `8081`)
* **Frontend (React/Vite)** → corre en Nginx (puerto `80`)
* **Base de datos (MySQL)** → Docker (puerto `3307`)

---

# ⚙️ Requisitos

Antes de comenzar, asegúrate de tener:

* Docker
* Docker Compose
* Node.js + npm

---

# 🐳 Backend (Laravel en Docker)

## 📍 Puerto importante

El backend está expuesto en:

```
http://localhost:8081
```

---

## ▶️ Levantar contenedores

```bash
docker-compose up -d
```

---

## 📌 Migraciones

```bash
docker-compose exec php bash
php artisan migrate
php artisan db:seed
```

---

## ⚠️ Importante

Las rutas API funcionan bajo:

```
http://localhost:8081/api
```

Ejemplo:

```
POST http://localhost:8081/api/login
```

---

# 🌐 Frontend (React + Nginx)

## 📍 Configuración clave (API)

En el frontend debes configurar correctamente la URL del backend:

```ts
const apiService = axios.create({
  baseURL: 'http://localhost:8081/api',
});
```

---

## ❌ Error común

NO usar:

```
/api ❌
http://localhost ❌
http://admincf.localhost ❌
```

👉 porque el backend está en Docker en el puerto `8081`.

---

# 🔁 Proxy Nginx (Frontend)

Archivo: `.conf`

## 📌 Función

* Sirve el frontend
* Redirige llamadas `/api` al backend

---

## 🔧 Configuración importante

```nginx
location /api/ {
    proxy_pass http://cistcorfact_nginx:80/api/;
    proxy_set_header Host admincf.localhost;
}
```

👉 Esto permite que el frontend haga llamadas como:

```
/api/login
```

y Nginx las redirige al backend.

---

# 🐳 Docker (Resumen)

## 📄 docker-compose.yml

### Servicios:

* `mysql` → base de datos
* `nginx` → frontend
* `php` → backend

---

## 📍 Puertos

| Servicio          | Puerto |
| ----------------- | ------ |
| Frontend (nginx)  | 80     |
| Backend (Laravel) | 8081   |
| MySQL             | 3307   |

---

# 🧠 Flujo completo

1. Frontend llama:

```
http://localhost/api/login
```

2. Nginx intercepta `/api`

3. Redirige a:

```
http://cistcorfact_nginx:80/api/login
```

4. Backend Laravel responde

---

# ⚠️ Problemas comunes

## ❌ 404 Not Found

Causa:

* URL incorrecta
* Backend en puerto equivocado

✅ Solución:

```ts
baseURL: 'http://localhost:8081/api'
```

---

## ❌ API no responde

Verifica:

```bash
docker ps
```

y que el contenedor esté corriendo.

---

## ❌ Migraciones no aplican

Ejecutar:

```bash
php artisan migrate:fresh
php artisan db:seed
```

---

# 🧪 Prueba rápida

Abrir en navegador:

```
http://localhost:8081/api/login
```

👉 Debe responder (aunque sea error 405)

---

# ✅ Conclusión

Para que todo funcione correctamente:

* Backend → `http://localhost:8081`
* API → `http://localhost:8081/api`
* Frontend → usa esa URL en Axios

---

# 💡 Recomendación

Si el proyecto se mueve a otro entorno:

* Revisar puertos en Docker
* Ajustar `baseURL`
* Verificar proxy Nginx

---

# 👨‍💻 Autor Notes

Este proyecto usa Docker, por lo que:

👉 **localhost NO siempre es el backend**
👉 Siempre revisar el puerto expuesto (`docker-compose.yml`)

---

🚀 Con esto el proyecto debería correr sin problemas en cualquier máquina.
