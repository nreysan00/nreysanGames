<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api.js';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

const route = useRoute();
const juegosCoincidentesBusqueda = ref([]);
const busquedaInput = ref('');
const loading = ref(false);
const hasSearched = ref(false);
const toast = ref({ show: false, message: '', type: 'success' });

let toastTimer = null;

onMounted(() => {
  const q = route.query.q || '';
  if (q) {
    busquedaInput.value = q;
    buscarJuegos(q);
  }
});

async function buscarJuegos(nombreJuego) {
  if (!nombreJuego?.trim()) return;
  loading.value = true;
  hasSearched.value = true;
  juegosCoincidentesBusqueda.value = [];

  const API_KEY = '372286ed50fe4f79a2573c915a595a68';
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(nombreJuego)}&page_size=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la respuesta de la API');
    const data = await response.json();
    juegosCoincidentesBusqueda.value = data.results;
  } catch (error) {
    console.error('Error al consultar RAWG:', error);
    showToast('Error al conectar con la API de RAWG.', 'error');
  } finally {
    loading.value = false;
  }
}

function onSubmit() {
  buscarJuegos(busquedaInput.value);
}

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.value = { show: true, message, type };
  toastTimer = setTimeout(() => { toast.value.show = false; }, 3500);
}

const agregarAlBacklog = async (game) => {
  const user = JSON.parse(localStorage.getItem('login'));
  if (!user) {
    showToast('Debes iniciar sesión para añadir juegos.', 'error');
    return;
  }

  const gameData = {
    user_id: user.id,
    game_id_rawg: game.id,
    titulo: game.name,
    imagen_url: game.background_image,
    estado: 'pendiente'
  };

  try {
    const response = await api.addGameToBacklog(gameData);
    if (response.data && !response.data.error) {
      showToast(`"${game.name}" añadido a tu lista.`, 'success');
    } else {
      showToast(response.data.error || 'No se pudo guardar el juego.', 'error');
    }
  } catch (error) {
    console.error('Error en la petición al backlog:', error);
    showToast('Error de conexión con el servidor.', 'error');
  }
};

function formatRating(rating) {
  return rating ? rating.toFixed(1) : null;
}

function formatYear(dateStr) {
  return dateStr ? dateStr.substring(0, 4) : 'TBA';
}

function ratingColor(rating) {
  if (!rating) return 'var(--text-muted)';
  if (rating >= 4) return 'var(--green)';
  if (rating >= 3) return 'var(--gold)';
  return 'var(--red)';
}
</script>

<template>
  <div class="site-wrapper">
    <AppHeader />

    <main class="busqueda-page">

      <!-- Search Hero -->
      <section class="search-hero">
        <div class="search-hero-content">
          <h1 class="search-title">
            <i class="bi bi-search me-2 accent-text"></i>Buscador de Juegos
          </h1>
          <p class="search-subtitle">Encuentra cualquier juego y añádelo a tu lista personal</p>

          <form class="search-form" @submit.prevent="onSubmit">
            <div class="search-input-wrap">
              <i class="bi bi-search search-icon"></i>
              <input
                type="text"
                class="search-input"
                placeholder="Busca un juego... ej: Red Dead Redemption"
                v-model="busquedaInput"
                autocomplete="off"
              />
              <button type="submit" class="search-btn" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                <span v-else><i class="bi bi-arrow-right-circle-fill me-1"></i></span>
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Results -->
      <section class="results-section">
        <div class="container py-5">

          <!-- Loading skeleton -->
          <div v-if="loading" class="skeleton-grid">
            <div v-for="n in 8" :key="n" class="skeleton-card">
              <div class="skeleton-img"></div>
              <div class="skeleton-body">
                <div class="skeleton-line w-75"></div>
                <div class="skeleton-line w-50 short"></div>
                <div class="skeleton-btn"></div>
              </div>
            </div>
          </div>

          <!-- Initial state -->
          <div v-else-if="!hasSearched" class="empty-state">
            <div class="empty-icon"><i class="bi bi-joystick"></i></div>
            <h3>¿Qué juego buscas?</h3>
            <p>Escribe un título en la barra de búsqueda para comenzar.</p>
          </div>

          <!-- No results -->
          <div v-else-if="juegosCoincidentesBusqueda.length === 0" class="empty-state">
            <div class="empty-icon"><i class="bi bi-emoji-frown"></i></div>
            <h3>Sin resultados</h3>
            <p>No encontramos juegos que coincidan con tu búsqueda. Prueba con otro término.</p>
          </div>

          <!-- Results grid -->
          <template v-else>
            <div class="results-header">
              <span class="results-count">
                <i class="bi bi-grid-3x3-gap-fill me-2 accent-text"></i>
                {{ juegosCoincidentesBusqueda.length }} resultados encontrados
              </span>
            </div>

            <div class="games-grid">
              <div
                class="game-card"
                v-for="game in juegosCoincidentesBusqueda"
                :key="game.id"
              >
                <!-- Cover image -->
                <div class="game-cover">
                  <img
                    :src="game.background_image || 'https://placehold.co/400x220/1a1730/8b5cf6?text=Sin+Imagen'"
                    :alt="game.name"
                  />
                  <!-- Rating badge -->
                  <span
                    v-if="formatRating(game.rating)"
                    class="rating-badge"
                    :style="{ color: ratingColor(game.rating) }"
                  >
                    <i class="bi bi-star-fill"></i> {{ formatRating(game.rating) }}
                  </span>
                </div>

                <!-- Card body -->
                <div class="game-body">
                  <router-link :to="`/juego/${game.id}`" class="game-title-link">
                    <a class="game-title" @click="route.push('/juego/:game.id')">{{ game.name }}</a>
                  </router-link>

                  <div class="game-meta">
                    <span class="meta-year">
                      <i class="bi bi-calendar3 me-1"></i>{{ formatYear(game.released) }}
                    </span>
                    <span v-if="game.genres?.length" class="meta-genre">
                      {{ game.genres[0].name }}
                    </span>
                  </div>

                  <!-- Platform icons -->
                  <div v-if="game.parent_platforms?.length" class="platforms">
                    <i
                      v-for="p in game.parent_platforms.slice(0, 4)"
                      :key="p.platform.id"
                      :class="platformIcon(p.platform.slug)"
                      class="platform-icon"
                      :title="p.platform.name"
                    ></i>
                  </div>

                  <button class="add-btn" @click="agregarAlBacklog(game)">
                    <i class="bi bi-plus-circle-fill me-2"></i>Añadir a mi lista
                  </button>
                </div>
              </div>
            </div>
          </template>

        </div>
      </section>
    </main>

    <AppFooter />

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast-notif" :class="toast.type">
        <i :class="toast.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'" class="me-2"></i>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script>
// Helper needed outside setup for template
export default {
  methods: {
    platformIcon(slug) {
      const map = {
        pc: 'bi bi-pc-display',
        playstation: 'bi bi-playstation',
        xbox: 'bi bi-xbox',
        nintendo: 'bi bi-nintendo-switch',
        ios: 'bi bi-apple',
        android: 'bi bi-android2',
        mac: 'bi bi-apple',
        linux: 'bi bi-ubuntu',
      };
      return map[slug] || 'bi bi-controller';
    }
  }
}
</script>

<style scoped>
.game-title-link { text-decoration: none; }
.game-title-link:hover .game-title { color: var(--accent-light); }

/* ── Page layout ──────────────────────────────────── */
.busqueda-page {
  min-height: calc(100vh - 64px);
  background: var(--bg);
}

/* ── Search Hero ─────────────────────────────────── */
.search-hero {
  background: linear-gradient(160deg, #12102b 0%, #0f0c22 60%, #0b0914 100%);
  border-bottom: 1px solid var(--border);
  padding: 4rem 1rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.search-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.search-hero-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
}

.search-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  margin-bottom: .5rem;
}

.search-subtitle {
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.accent-text { color: var(--accent-light); }

/* Search form */
.search-form { width: 100%; }

.search-input-wrap {
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1.5px solid var(--border-h);
  border-radius: 50px;
  padding: .35rem .35rem .35rem 1.1rem;
  transition: border-color .2s, box-shadow .2s;
}

.search-input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.search-icon {
  color: var(--text-muted);
  font-size: 1rem;
  flex-shrink: 0;
  margin-right: .6rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 1rem;
}

.search-input::placeholder { color: var(--text-muted); }

.search-btn {
  display: flex;
  align-items: center;
  gap: .3rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: .55rem 1.4rem;
  font-weight: 600;
  font-size: .9rem;
  cursor: pointer;
  transition: background .2s, transform .15s;
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  background: var(--accent-dark);
  transform: scale(1.03);
}

.search-btn:disabled { opacity: .65; cursor: not-allowed; }

/* ── Results section ─────────────────────────────── */
.results-section { background: var(--bg); }

.results-header {
  margin-bottom: 1.5rem;
}

.results-count {
  color: var(--text-muted);
  font-size: .9rem;
}

/* ── Games grid ──────────────────────────────────── */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.game-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
}

.game-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-h);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.18);
}

/* Cover */
.game-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  background: var(--bg-surface);
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .35s ease;
}

.game-card:hover .game-cover img {
  transform: scale(1.05);
}

.rating-badge {
  position: absolute;
  top: .5rem;
  right: .5rem;
  background: rgba(11, 9, 20, 0.82);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  padding: .2rem .55rem;
  font-size: .75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: .25rem;
}

/* Body */
.game-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .5rem;
}

.game-title {
  font-size: .95rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.game-meta {
  display: flex;
  align-items: center;
  gap: .5rem;
  flex-wrap: wrap;
}

.meta-year {
  font-size: .78rem;
  color: var(--text-muted);
}

.meta-genre {
  font-size: .72rem;
  background: rgba(139, 92, 246, 0.15);
  color: var(--accent-light);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 20px;
  padding: .1rem .5rem;
}

/* Platforms */
.platforms {
  display: flex;
  gap: .4rem;
  flex-wrap: wrap;
}

.platform-icon {
  font-size: .85rem;
  color: var(--text-muted);
}

/* Add button */
.add-btn {
  margin-top: auto;
  background: transparent;
  border: 1.5px solid var(--accent);
  color: var(--accent-light);
  border-radius: var(--radius-sm);
  padding: .45rem .8rem;
  font-size: .82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .18s, color .18s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.add-btn:hover {
  background: var(--accent);
  color: #fff;
}

/* ── Empty / Loading states ──────────────────────── */
.empty-state {
  text-align: center;
  padding: 5rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: var(--accent);
  opacity: .4;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.4rem;
  margin-bottom: .5rem;
}

/* Skeleton */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  animation: pulse 1.6s ease-in-out infinite;
}

.skeleton-img {
  height: 160px;
  background: var(--bg-surface);
}

.skeleton-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .6rem;
}

.skeleton-line {
  height: .8rem;
  background: var(--bg-surface);
  border-radius: 4px;
}

.skeleton-line.short { height: .6rem; }
.w-75 { width: 75%; }
.w-50 { width: 50%; }

.skeleton-btn {
  height: 2rem;
  background: var(--bg-surface);
  border-radius: var(--radius-sm);
  margin-top: .4rem;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: .45; }
}

/* ── Toast ───────────────────────────────────────── */
.toast-notif {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  padding: .8rem 1.3rem;
  border-radius: var(--radius-sm);
  font-size: .9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 30px rgba(0,0,0,.4);
  max-width: 340px;
}

.toast-notif.success {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #4ade80;
}

.toast-notif.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #f87171;
}

/* Toast transition */
.toast-enter-active  { transition: all .3s ease; }
.toast-leave-active  { transition: all .25s ease; }
.toast-enter-from    { opacity: 0; transform: translateY(12px); }
.toast-leave-to      { opacity: 0; transform: translateY(12px); }
</style>
