<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api.js';

const email  = ref('');
const pass   = ref('');
const error  = ref('');
const loading = ref(false);
const router = useRouter();


const loginUser = async () => {
  error.value = '';
  loading.value = true;

  try {
    const response = await api.login({
      email:    email.value,
      password: pass.value
    });

    localStorage.setItem('login', JSON.stringify(response.data.user));
    router.push('/');

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    error.value = err.response?.data?.error
      ?? err.response?.data?.message
      ?? 'Error de conexión con el servidor.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">

    <!-- Background decorations -->
    <div class="login-bg" aria-hidden="true">
      <div class="login-blob login-blob-1"></div>
      <div class="login-blob login-blob-2"></div>
      <div class="login-dots"></div>
    </div>

    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-login">
        <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

          <!-- Card -->
          <div class="login-card">

            <!-- Header -->
            <div class="text-center mb-4">
              <a href="/" class="login-logo" aria-label="Volver al inicio">
                <i class="bi bi-controller logo-icon" aria-hidden="true"></i>
                <span><span class="logo-hl">nreysan</span>Games</span>
              </a>
              <h1 class="login-title mt-3 mb-1">Bienvenido de nuevo</h1>
              <p class="login-sub">Inicia sesión para acceder a tu biblioteca</p>
            </div>

            <!-- Error alert -->
            <div
              v-if="error"
              class="login-error"
              role="alert"
              aria-live="polite"
            >
              <i class="bi bi-exclamation-circle-fill me-2" aria-hidden="true"></i>
              {{ error }}
            </div>

            <!-- Form -->
            <form @submit.prevent="loginUser()">

              <div class="form-group mb-3">
                <label for="login-email" class="form-lbl">Correo electrónico</label>
                <div class="input-wrap">
                  <i class="bi bi-envelope input-icon" aria-hidden="true"></i>
                  <input
                    id="login-email"
                    type="email"
                    class="form-inp"
                    v-model="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    autocomplete="email"
                  >
                </div>
              </div>

              <div class="form-group mb-4">
                <div class="d-flex justify-content-between align-items-center">
                  <label for="login-pass" class="form-lbl">Contraseña</label>
                  <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="input-wrap">
                  <i class="bi bi-lock input-icon" aria-hidden="true"></i>
                  <input
                    id="login-pass"
                    type="password"
                    class="form-inp"
                    v-model="pass"
                    placeholder="••••••••"
                    required
                    autocomplete="current-password"
                  >
                </div>
              </div>

              <button
                type="submit"
                class="btn-login-submit w-100"
                :disabled="loading"
              >
                <span v-if="loading">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </span>
                <span v-else>
                  <i class="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>
                  Iniciar sesión
                </span>
              </button>

            </form>

            <!-- Footer link -->
            <p class="text-center mt-4 register-link">
              ¿No tienes cuenta?
              <a href="/register" @click.prevent="$router.push('/register')">Crear cuenta gratis</a>
            </p>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Page ── */
.login-page {
  min-height: 100vh;
  background: var(--bg, #0b0914);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.min-vh-login {
  min-height: 100vh;
}

/* ── Background ── */
.login-bg { position: absolute; inset: 0; pointer-events: none; }

.login-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.16;
}
.login-blob-1 {
  width: 480px; height: 480px;
  background: #8b5cf6;
  top: -150px; left: -120px;
}
.login-blob-2 {
  width: 360px; height: 360px;
  background: #a78bfa;
  bottom: -100px; right: -80px;
}
.login-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(139,92,246,0.1) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* ── Card ── */
.login-card {
  background: #13102a;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 22px;
  padding: 2.5rem 2rem;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(139,92,246,0.08);
  position: relative;
  z-index: 1;
}

/* ── Logo ── */
.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 800;
  color: #f1f5f9;
}
.logo-icon {
  font-size: 1.6rem;
  color: #8b5cf6;
}
.logo-hl { color: #8b5cf6; }

.login-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}
.login-sub {
  font-size: 0.87rem;
  color: #64748b;
  margin: 0;
}

/* ── Error ── */
.login-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #fca5a5;
  font-size: 0.87rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
}

/* ── Labels ── */
.form-lbl {
  display: block;
  font-size: 0.84rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 0.45rem;
}

/* ── Input wrapper ── */
.input-wrap {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #475569;
  font-size: 0.95rem;
  pointer-events: none;
  transition: color 0.2s;
}
.form-inp {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(139, 92, 246, 0.18);
  border-radius: 11px;
  color: #f1f5f9;
  font-size: 0.93rem;
  padding: 0.7rem 1rem 0.7rem 2.6rem;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
}
.form-inp::placeholder { color: #334155; }
.form-inp:focus {
  border-color: rgba(139, 92, 246, 0.55);
  background: rgba(139, 92, 246, 0.06);
}
.form-inp:focus + .input-icon,
.input-wrap:focus-within .input-icon {
  color: #8b5cf6;
}

.forgot-link {
  font-size: 0.8rem;
  color: #8b5cf6;
  text-decoration: none;
  transition: color 0.2s;
}
.forgot-link:hover { color: #a78bfa; }

/* ── Submit button ── */
.btn-login-submit {
  background: #8b5cf6;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.78rem 1rem;
  font-size: 0.97rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 4px 18px rgba(139, 92, 246, 0.4);
}
.btn-login-submit:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(139, 92, 246, 0.55);
}
.btn-login-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

/* ── Register link ── */
.register-link {
  font-size: 0.87rem;
  color: #475569;
  margin: 0;
}
.register-link a {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.register-link a:hover { color: #a78bfa; }
</style>
