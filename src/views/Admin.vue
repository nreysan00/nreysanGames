<script setup>
import { onMounted, ref, computed } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import api from '../services/api.js';

const usuarios = ref([]);
const loading = ref(true);
const busqueda = ref('');

onMounted(fetchUsuarios);

async function fetchUsuarios() {
  loading.value = true;
  try {
    const response = await api.getAdminUsers();
    usuarios.value = response.data;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  } finally {
    loading.value = false;
  }
}

const usuariosFiltrados = computed(() => {
  const q = busqueda.value.trim().toLowerCase();
  if (!q) return usuarios.value;
  return usuarios.value.filter(u =>
    u.username.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q)
  );
});

function maskPassword(hash) {
  return '*'.repeat(12);
}

async function eliminarUsuario(usuario) {
  if (!confirm(`¿Eliminar al usuario "${usuario.username}" y todos sus datos?`)) return;
  try {
    await api.deleteAdminUser(usuario.id);
    usuarios.value = usuarios.value.filter(u => u.id !== usuario.id);
  } catch (error) {
    alert('No se pudo eliminar el usuario.');
  }
}
</script>

<template>
  <div class="site-wrapper">
    <AppHeader />

    <main class="admin-page">
      <div class="container py-5">

        <!-- Page header -->
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div class="d-flex align-items-center gap-3">
            <div class="page-icon" aria-hidden="true">
              <i class="bi bi-shield-lock-fill"></i>
            </div>
            <div>
              <h1 class="fs-4 fw-bold mb-0">Panel de Administración</h1>
              <p class="text-muted small mb-0">Gestión de usuarios registrados</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="stat-chip">
              <i class="bi bi-people-fill me-1"></i>{{ usuarios.length }} usuarios
            </span>
            <button class="refresh-btn" @click="fetchUsuarios" :disabled="loading" aria-label="Recargar lista">
              <i class="bi bi-arrow-clockwise" :class="{ 'spin': loading }"></i>
            </button>
          </div>
        </div>

        <!-- Search bar -->
        <div class="position-relative mb-4">
          <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" aria-hidden="true"></i>
          <input type="search" class="admin-search ps-5" placeholder="Filtrar por nombre o email…"
            v-model="busqueda" aria-label="Filtrar usuarios" />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="d-flex flex-column align-items-center justify-content-center gap-3 text-center text-muted py-5" role="status" aria-live="polite">
          <div class="spinner-border" aria-hidden="true"></div>
          <p class="mb-0">Cargando usuarios…</p>
        </div>

        <!-- Empty -->
        <div v-else-if="usuariosFiltrados.length === 0" class="d-flex flex-column align-items-center justify-content-center gap-3 text-center text-muted py-5">
          <i class="bi bi-person-x" style="font-size:3.5rem; opacity:.3" aria-hidden="true"></i>
          <h3>Sin resultados</h3>
          <p class="mb-0">No se encontró ningún usuario con ese criterio.</p>
        </div>

        <!-- Table -->
        <div v-else class="table-card">
          <div class="table-responsive">
            <table class="admin-table" aria-label="Tabla de usuarios registrados">
              <thead>
                <tr>
                  <th scope="col" class="col-id">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo electrónico</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col" class="col-games">Juegos en lista</th>
                  <th scope="col" class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="usuario in usuariosFiltrados" :key="usuario.id" class="table-row">
                  <td class="col-id"><span class="id-badge">{{ usuario.id }}</span></td>

                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="user-avatar" aria-hidden="true">{{ usuario.username.charAt(0).toUpperCase() }}</div>
                      <span class="fw-semibold">{{ usuario.username }}</span>
                    </div>
                  </td>

                  <td>
                    <a :href="`mailto:${usuario.email}`" class="text-decoration-none text-white small">
                      <i class="bi bi-envelope me-1" aria-hidden="true"></i>{{ usuario.email }}
                    </a>
                  </td>

                  <td>
                    <span class="password-mask" aria-label="Contraseña oculta">{{ maskPassword(usuario.password) }}</span>
                  </td>

                  <td class="col-games">
                    <span class="games-badge" :class="{ 'games-badge--empty': usuario.juegos_count == 0 }"
                      :aria-label="`${usuario.juegos_count} juegos en la lista`">
                      <i class="bi bi-controller me-1" aria-hidden="true"></i>{{ usuario.juegos_count }}
                    </span>
                  </td>
                  <td class="col-actions">
                    <button
                      v-if="usuario.username !== 'admin'"
                      class="delete-btn"
                      @click="eliminarUsuario(usuario)"
                      :aria-label="`Eliminar usuario ${usuario.username}`"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-3 py-2 small text-muted border-top" style="background:var(--bg-surface)">
            Mostrando {{ usuariosFiltrados.length }} de {{ usuarios.length }} usuarios
          </div>
        </div>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.admin-page { min-height: calc(100vh - 64px); background: var(--bg); }

.page-icon { width: 52px; height: 52px; background: rgba(139,92,246,.15); border: 1px solid rgba(139,92,246,.3); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: var(--accent-light); flex-shrink: 0; }
.stat-chip { background: rgba(139,92,246,.1); border: 1px solid rgba(139,92,246,.25); color: var(--accent-light); border-radius: 20px; padding: .3rem .85rem; font-size: .82rem; font-weight: 600; }
.refresh-btn { width: 36px; height: 36px; background: rgba(139,92,246,.07); border: 1px solid rgba(139,92,246,.2); border-radius: 9px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; }
.refresh-btn:hover:not(:disabled) { background: rgba(139,92,246,.18); color: var(--text); }
.refresh-btn:disabled { opacity: .5; cursor: not-allowed; }
@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin .8s linear infinite; }

.admin-search { width: 100%; max-width: 400px; background: var(--bg-card); border: 1px solid var(--border-h); border-radius: var(--radius-sm); color: var(--text); padding: .6rem 1rem; font-size: .9rem; transition: border-color .2s, box-shadow .2s; }
.admin-search:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.admin-search::placeholder { color: var(--text-muted); }

.table-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.admin-table { width: 100%; border-collapse: collapse; font-size: .9rem; }
.admin-table thead tr { background: var(--bg-surface); border-bottom: 1px solid var(--border-h); }
.admin-table th { padding: .9rem 1.2rem; font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--text-muted); text-align: left; white-space: nowrap; }
.admin-table td { padding: .85rem 1.2rem; color: var(--text); vertical-align: middle; }
.col-id    { width: 60px; }
.col-games { width: 130px; }
.admin-table th.col-id, .admin-table td.col-id,
.admin-table th.col-games, .admin-table td.col-games { text-align: center; }
.table-row { border-bottom: 1px solid var(--border); transition: background .15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(139,92,246,.05); }

.id-badge { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px; font-size: .75rem; font-weight: 700; color: var(--text-muted); }
.user-avatar { width: 34px; height: 34px; background: rgba(139,92,246,.2); border: 1px solid rgba(139,92,246,.35); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .85rem; font-weight: 700; color: var(--accent-light); flex-shrink: 0; }
.password-mask { font-size: 1rem; letter-spacing: .1em; color: var(--text-muted); user-select: none; }
.games-badge { display: inline-flex; align-items: center; background: rgba(139,92,246,.12); border: 1px solid rgba(139,92,246,.25); color: var(--accent-light); border-radius: 20px; padding: .2rem .75rem; font-size: .82rem; font-weight: 700; }
.games-badge--empty { background: rgba(148,163,184,.07); border-color: rgba(148,163,184,.15); color: var(--text-muted); }

.col-actions { width: 52px; text-align: center; }
.admin-table th.col-actions, .admin-table td.col-actions { text-align: center; }
.delete-btn { width: 32px; height: 32px; background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.2); border-radius: 8px; color: #f87171; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; font-size: .85rem; }
.delete-btn:hover { background: rgba(239,68,68,.18); border-color: rgba(239,68,68,.45); color: #fca5a5; }

@media (max-width: 480px) {
  .admin-search { max-width: 100%; }
  .admin-table th:nth-child(4), .admin-table td:nth-child(4) { display: none; }
}
</style>
