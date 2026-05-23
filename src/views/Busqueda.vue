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
  if (q) { busquedaInput.value = q; buscarJuegos(q); }
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
    juegosCoincidentesBusqueda.value = (await response.json()).results;
  } catch (error) {
    showToast('Error al conectar con la API de RAWG.', 'error');
  } finally {
    loading.value = false;
  }
}

function onSubmit() { buscarJuegos(busquedaInput.value); }

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.value = { show: true, message, type };
  toastTimer = setTimeout(() => { toast.value.show = false; }, 3500);
}

const agregarAlBacklog = async (game) => {
  const user = JSON.parse(localStorage.getItem('login'));
  if (!user) { showToast('Debes iniciar sesión para añadir juegos.', 'error'); return; }
  try {
    const response = await api.addGameToBacklog({
      user_id: user.id, game_id_rawg: game.id,
      titulo: game.name, imagen_url: game.background_image, estado: 'pendiente'
    });
    if (response.data && !response.data.error)
      showToast(`"${game.name}" añadido a tu lista.`, 'success');
    else
      showToast(response.data.error || 'No se pudo guardar el juego.', 'error');
  } catch { showToast('Error de conexión con el servidor.', 'error'); }
};

function formatRating(r) { return r ? r.toFixed(1) : null; }
function formatYear(d)    { return d ? d.substring(0, 4) : 'TBA'; }
function ratingColor(r)   { return r >= 4 ? 'var(--green)' : r >= 3 ? 'var(--gold)' : 'var(--red)'; }
function platformIcon(slug) {
  const map = { pc:'bi bi-pc-display', playstation:'bi bi-playstation', xbox:'bi bi-xbox',
    nintendo:'bi bi-nintendo-switch', ios:'bi bi-apple', android:'bi bi-android2',
    mac:'bi bi-apple', linux:'bi bi-ubuntu' };
  return map[slug] || 'bi bi-controller';
}
</script>

<template>
  <div class="site-wrapper">
    <AppHeader />

    <main>
      <!-- Search Hero -->
      <section class="search-hero">
        <div class="search-hero-content mx-auto px-3">
          <h1 class="fw-bold mb-2">
            <i class="bi bi-search me-2 accent-text"></i>Buscador de Juegos
          </h1>
          <p class="text-muted mb-4">Encuentra cualquier juego y añádelo a tu lista personal</p>

          <form @submit.prevent="onSubmit">
            <div class="search-input-wrap">
              <i class="bi bi-search search-icon"></i>
              <input type="text" class="search-input" placeholder="Busca un juego... ej: Red Dead Redemption"
                v-model="busquedaInput" autocomplete="off" />
              <button type="submit" class="search-btn" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="bi bi-arrow-right-circle-fill me-1"></i>Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Results -->
      <section class="container py-5">

        <!-- Loading skeleton -->
        <div v-if="loading" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div v-for="n in 8" :key="n" class="col">
            <div class="skeleton-card">
              <div class="skeleton-img"></div>
              <div class="p-3 d-flex flex-column gap-2">
                <div class="skeleton-line w-75"></div>
                <div class="skeleton-line w-50 short"></div>
                <div class="skeleton-btn mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty states -->
        <div v-else-if="!hasSearched" class="d-flex flex-column align-items-center text-center gap-3 py-5">
          <div class="empty-icon"><i class="bi bi-joystick"></i></div>
          <h3>¿Qué juego buscas?</h3>
          <p class="text-muted">Escribe un título en la barra de búsqueda para comenzar.</p>
        </div>

        <div v-else-if="juegosCoincidentesBusqueda.length === 0" class="d-flex flex-column align-items-center text-center gap-3 py-5">
          <div class="empty-icon"><i class="bi bi-emoji-frown"></i></div>
          <h3>Sin resultados</h3>
          <p class="text-muted">No encontramos juegos que coincidan con tu búsqueda.</p>
        </div>

        <!-- Results grid -->
        <template v-else>
          <p class="text-muted small mb-3">
            <i class="bi bi-grid-3x3-gap-fill me-1 accent-text"></i>
            {{ juegosCoincidentesBusqueda.length }} resultados encontrados
          </p>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col" v-for="game in juegosCoincidentesBusqueda" :key="game.id">
              <div class="game-card h-100 d-flex flex-column">
                <!-- Cover -->
                <div class="game-cover position-relative overflow-hidden">
                  <img :src="game.background_image || 'https://placehold.co/400x220/1a1730/8b5cf6?text=Sin+Imagen'"
                    :alt="game.name" />
                  <span v-if="formatRating(game.rating)" class="rating-badge"
                    :style="{ color: ratingColor(game.rating) }">
                    <i class="bi bi-star-fill"></i> {{ formatRating(game.rating) }}
                  </span>
                </div>

                <!-- Body -->
                <div class="p-3 d-flex flex-column gap-2 flex-grow-1">
                  <router-link :to="`/juego/${game.id}`" class="game-title text-decoration-none">
                    {{ game.name }}
                  </router-link>

                  <div class="d-flex align-items-center gap-2 flex-wrap">
                    <span class="text-muted small">
                      <i class="bi bi-calendar3 me-1"></i>{{ formatYear(game.released) }}
                    </span>
                    <span v-if="game.genres?.length" class="meta-genre">{{ game.genres[0].name }}</span>
                  </div>

                  <div v-if="game.parent_platforms?.length" class="d-flex flex-wrap gap-2">
                    <i v-for="p in game.parent_platforms.slice(0, 4)" :key="p.platform.id"
                      :class="platformIcon(p.platform.slug)" class="platform-icon" :title="p.platform.name"></i>
                  </div>

                  <button class="add-btn mt-auto" @click="agregarAlBacklog(game)">
                    <i class="bi bi-plus-circle-fill me-2"></i>Añadir a mi lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

      </section>
    </main>

    <AppFooter />

    <Transition name="toast">
      <div v-if="toast.show" class="toast-notif" :class="toast.type">
        <i :class="toast.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'" class="me-2"></i>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.accent-text { color: var(--accent-light); }

/* Search hero */
.search-hero {
  background: linear-gradient(160deg, #12102b 0%, #0f0c22 60%, #0b0914 100%);
  border-bottom: 1px solid var(--border);
  padding: 4rem 1rem 3rem;
  text-align: center;
}
.search-hero-content { max-width: 680px; }
.search-input-wrap {
  display: flex; align-items: center;
  background: var(--bg-card); border: 1.5px solid var(--border-h);
  border-radius: 50px; padding: .35rem .35rem .35rem 1.1rem;
  transition: border-color .2s, box-shadow .2s;
}
.search-input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.search-icon  { color: var(--text-muted); margin-right: .6rem; flex-shrink: 0; }
.search-input { flex: 1; background: transparent; border: none; outline: none; color: var(--text); font-size: 1rem; }
.search-input::placeholder { color: var(--text-muted); }
.search-btn {
  background: var(--accent); color: #fff; border: none;
  border-radius: 50px; padding: .55rem 1.4rem; font-weight: 600; cursor: pointer; white-space: nowrap;
  transition: background .2s;
}
.search-btn:hover:not(:disabled) { background: var(--accent-dark); }
.search-btn:disabled { opacity: .65; cursor: not-allowed; }

/* Game card */
.game-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
  transition: transform .22s, border-color .22s, box-shadow .22s;
}
.game-card:hover { transform: translateY(-6px); border-color: var(--border-h); box-shadow: 0 12px 40px rgba(139,92,246,.18); }
.game-cover { height: 160px; }
.game-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.game-card:hover .game-cover img { transform: scale(1.05); }
.rating-badge {
  position: absolute; top: .5rem; right: .5rem;
  background: rgba(11,9,20,.82); backdrop-filter: blur(6px);
  border-radius: 20px; padding: .2rem .55rem; font-size: .75rem; font-weight: 700;
}
.game-title { font-size: .95rem; font-weight: 700; color: var(--text); line-height: 1.3; }
.game-title:hover { color: var(--accent-light); }
.meta-genre {
  font-size: .72rem; background: rgba(139,92,246,.15); color: var(--accent-light);
  border: 1px solid rgba(139,92,246,.25); border-radius: 20px; padding: .1rem .5rem;
}
.platform-icon { font-size: .85rem; color: var(--text-muted); }
.add-btn {
  background: transparent; border: 1.5px solid var(--accent);
  color: var(--accent-light); border-radius: var(--radius-sm);
  padding: .45rem; font-size: .82rem; font-weight: 600; cursor: pointer;
  transition: background .18s, color .18s; width: 100%;
  display: flex; align-items: center; justify-content: center;
}
.add-btn:hover { background: var(--accent); color: #fff; }

/* Skeleton */
.skeleton-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; animation: pulse 1.6s ease-in-out infinite; }
.skeleton-img  { height: 160px; background: var(--bg-surface); }
.skeleton-line { height: .8rem; background: var(--bg-surface); border-radius: 4px; }
.skeleton-line.short { height: .6rem; }
.skeleton-btn  { height: 2rem; background: var(--bg-surface); border-radius: var(--radius-sm); }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }

/* Empty */
.empty-icon { font-size: 4rem; color: var(--accent); opacity: .4; }

/* Toast */
.toast-notif {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
  padding: .8rem 1.3rem; border-radius: var(--radius-sm); font-size: .9rem; font-weight: 600;
  display: flex; align-items: center; box-shadow: 0 8px 30px rgba(0,0,0,.4); max-width: 340px;
}
.toast-notif.success { background: rgba(34,197,94,.15); border: 1px solid rgba(34,197,94,.35); color: #4ade80; }
.toast-notif.error   { background: rgba(239,68,68,.15);  border: 1px solid rgba(239,68,68,.35);  color: #f87171; }
.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
