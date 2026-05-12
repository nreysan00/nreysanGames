<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';

const usuarioLogado = ref(localStorage.getItem('login'));
const username = usuarioLogado.value ? JSON.parse(usuarioLogado.value).username : null;
usuarioLogado.value = username;
const toggleSearchVisible = ref(false);
const toggleSearchButtonVisible = ref(true);
const busquedaInput = ref('');

function toggleSearch() {
  toggleSearchVisible.value = !toggleSearchVisible.value;
  toggleSearchButtonVisible.value = !toggleSearchButtonVisible.value;
}

function cerrarSesion() {
  localStorage.removeItem('login');
  usuarioLogado.value = null;
  router.push('/');
}
</script>

<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg" aria-label="Navegación principal">
      <div class="container">

        <!-- Logo -->
        <a class="navbar-brand" href="/" aria-label="Inicio de nreysanGames">
          <i class="bi bi-controller brand-icon" aria-hidden="true"></i>
          <span class="brand-name"><span class="brand-hl">nreysan</span>Games</span>
        </a>

        <!-- Toggler -->
        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <i class="bi bi-list text-light fs-2"></i>
        </button>

        <!-- Nav -->
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto gap-1 mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-lnk active" href="#inicio" aria-current="page">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-lnk" href="#juegos">Juegos</a>
            </li>
            <li class="nav-item">
              <a class="nav-lnk" href="#categorias">Categorías</a>
            </li>
            <li class="nav-item">
              <a class="nav-lnk" href="#oferta">
                Ofertas&nbsp;<span class="hot-badge">HOT</span>
              </a>
            </li>
          </ul>

          <!-- Actions -->
          <div class="nav-actions">

            <!-- Búsqueda -->
            <div class="search-wrap">
              <button @click="toggleSearch()" v-show="toggleSearchButtonVisible" class="icon-btn" aria-label="Buscar">
                <i class="bi bi-search"></i>
              </button>
              <input
                v-show="toggleSearchVisible"
                type="text"
                v-model="busquedaInput"
                @keyup.enter="router.push({ path: '/busqueda', query: { q: busquedaInput } })"
                class="form-control search-input"
                placeholder="Buscar juegos..."
                aria-label="Campo de búsqueda de juegos"
              />
            </div>

            <!-- Usuario logado -->
            <template v-if="usuarioLogado">
              <button class="icon-btn pos-rel" aria-label="Carrito de compra">
                <i class="bi bi-cart"></i>
                <span class="cart-dot" aria-label="2 artículos en el carrito">2</span>
              </button>

              <div class="dropdown">
                <button
                  class="btn icon-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Menú de usuario"
                >
                  <i class="bi bi-person-circle"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end user-dropdown">
                  <span class="dropdown-header" @click.stop>Hola, {{ usuarioLogado }}</span>
                  <li><a class="dropdown-item user-dropdown-item" href="/milista">Mis Listas</a></li>
                  <li><hr class="dropdown-divider user-divider"></li>
                  <li>
                    <button class="dropdown-item user-dropdown-item text-danger-soft" @click="cerrarSesion">
                      <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </template>

            <!-- Usuario no logado -->
            <template v-else>
              <div class="vr-line d-none d-lg-block" aria-hidden="true"></div>
              <div class="auth-btns">
                <button class="btn btn-outline-accent" type="button" @click="router.push('/login')">Iniciar sesión</button>
                <button class="btn btn-accent" type="button" @click="router.push('/register')">Registro</button>
              </div>
            </template>

          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(11, 9, 20, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.15);
}

.navbar { padding: 0.85rem 0; }

/* ── Logo ── */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
}
.brand-icon {
  font-size: 1.6rem;
  color: #8b5cf6;
  line-height: 1;
}
.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: -0.4px;
}
.brand-hl { color: #8b5cf6; }

/* ── Nav links ── */
.nav-lnk {
  display: block;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}
.nav-lnk:hover,
.nav-lnk.active {
  color: #f1f5f9;
  background: rgba(139, 92, 246, 0.12);
}
.nav-lnk.active { color: #a78bfa; }

.hot-badge {
  display: inline-block;
  font-size: 0.58rem;
  font-weight: 700;
  background: #ef4444;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  letter-spacing: 0.6px;
  vertical-align: middle;
}

/* ── Icon buttons ── */
.icon-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.07);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 9px;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.icon-btn:hover {
  background: rgba(139, 92, 246, 0.18);
  border-color: rgba(139, 92, 246, 0.45);
  color: #f1f5f9;
}
.pos-rel { position: relative; }
.cart-dot {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 17px;
  height: 17px;
  background: #8b5cf6;
  color: #fff;
  border-radius: 50%;
  font-size: 0.62rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0b0914;
}

/* ── Vertical divider ── */
.vr-line {
  width: 1px;
  height: 22px;
  background: rgba(139, 92, 246, 0.2);
  margin: 0 2px;
}

/* ── Buttons ── */
.btn-outline-accent {
  color: #a78bfa;
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  background: transparent;
  padding: 0.4rem 1rem;
  border-radius: 9px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-outline-accent:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.55);
  color: #c4b5fd;
}
.btn-accent {
  background: #8b5cf6;
  color: #fff;
  border: none;
  padding: 0.4rem 1.1rem;
  border-radius: 9px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-accent:hover {
  background: #7c3aed;
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(139, 92, 246, 0.45);
  color: #fff;
}

/* ── Dropdown ── */
.dropdown-toggle::after { display: none; } /* quitamos la flechita por defecto */

.user-dropdown {
  background: #1a1730;
  border: 1px solid rgba(139, 92, 246, 0.22);
  border-radius: 12px;
  padding: 0.4rem;
  min-width: 160px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  margin-top: 6px !important;
}

.user-dropdown-item {
  color: #cbd5e1;
  font-size: 0.88rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.5rem 0.85rem;
  transition: background 0.15s, color 0.15s;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  display: block;
}
.user-dropdown-item:hover {
  background: rgba(139, 92, 246, 0.12);
  color: #f1f5f9;
}
.text-danger-soft { color: #fca5a5 !important; }
.text-danger-soft:hover { background: rgba(239, 68, 68, 0.1) !important; }

.user-divider {
  border-color: rgba(139, 92, 246, 0.15);
  margin: 0.3rem 0;
}

/* ── Actions layout ── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  background: rgba(139, 92, 246, 0.07);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 9px;
  color: #f1f5f9;
  font-size: 0.88rem;
  padding: 0.4rem 0.8rem;
  width: 200px;
  transition: border-color 0.2s, width 0.3s;
}

.search-input:focus {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: none;
  color: #f1f5f9;
  outline: none;
}

.search-input::placeholder { color: #64748b; }

.auth-btns {
  display: flex;
  gap: 0.5rem;
}

/* ── Responsive móvil ── */
@media (max-width: 991px) {
  .navbar-collapse {
    border-top: 1px solid rgba(139, 92, 246, 0.15);
    margin-top: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }

  .navbar-nav {
    gap: 0 !important;
    margin-bottom: 1rem !important;
  }

  .nav-lnk {
    padding: 0.7rem 0.85rem;
    font-size: 1rem;
  }

  .nav-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    width: 100%;
  }

  .search-wrap {
    width: 100%;
  }

  .search-input {
    width: 100%;
    flex: 1;
  }

  .auth-btns {
    width: 100%;
  }

  .auth-btns .btn-outline-accent,
  .auth-btns .btn-accent {
    flex: 1;
    text-align: center;
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
}
</style>
