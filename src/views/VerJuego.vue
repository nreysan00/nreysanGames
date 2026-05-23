<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import api from '../services/api.js';

const API_KEY = '372286ed50fe4f79a2573c915a595a68';

const route = useRoute();
const juego = ref(null);
const loading = ref(true);
const toast = ref({ show: false, message: '', type: 'success' });
const descExpanded = ref(false);
const descEspanol = ref('');
const traduciendo = ref(false);

let toastTimer = null;

onMounted(() => {
  juegoBuscado();
});

const juegoBuscado = async () => {
  const id = route.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error en la respuesta de la API');
    juego.value = await response.json();
    traducirDesc();
  } catch (error) {
    console.error('Error al cargar los detalles del juego:', error);
  } finally {
    loading.value = false;
  }
};

const heroStyle = computed(() => ({
  backgroundImage: juego.value?.background_image
    ? `url(${juego.value.background_image})`
    : 'none',
}));

const descCompleta = computed(() => descEspanol.value || juego.value?.description_raw || '');

const descCorta = computed(() => {
  const desc = descCompleta.value;
  return desc.length > 600 ? desc.substring(0, 600) + '…' : desc;
});

function formatYear(dateStr) {
  return dateStr ? dateStr.substring(0, 4) : 'TBA';
}

function metacriticColor(score) {
  if (!score) return 'var(--text-muted)';
  if (score >= 75) return 'var(--green)';
  if (score >= 50) return 'var(--gold)';
  return 'var(--red)';
}

function ratingBarColor(title) {
  const map = { exceptional: '#22c55e', recommended: '#a78bfa', meh: '#f59e0b', skip: '#ef4444' };
  return map[title] || 'var(--accent)';
}

function platformIcon(slug) {
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

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.value = { show: true, message, type };
  toastTimer = setTimeout(() => { toast.value.show = false; }, 3500);
}

const agregarAlBacklog = async () => {
  const user = JSON.parse(localStorage.getItem('login'));
  if (!user) {
    showToast('Debes iniciar sesión para añadir juegos.', 'error');
    return;
  }
  const gameData = {
    user_id: user.id,
    game_id_rawg: juego.value.id,
    titulo: juego.value.name,
    imagen_url: juego.value.background_image,
    estado: 'pendiente',
  };
  try {
    const response = await api.addGameToBacklog(gameData);
    if (response.data && !response.data.error) {
      showToast(`"${juego.value.name}" añadido a tu lista.`, 'success');
    } else {
      showToast(response.data.error || 'No se pudo guardar el juego.', 'error');
    }
  } catch (error) {
    console.error('Error en la petición al backlog:', error);
    showToast('Error de conexión con el servidor.', 'error');
  }
};

async function traducirDesc() {
  const texto = juego.value?.description_raw;
  if (!texto) return;
  traduciendo.value = true;
  // MyMemory free API: límite de 500 caracteres por petición
  const fragmento = texto.substring(0, 500);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fragmento)}&langpair=en|es`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    descEspanol.value = data.responseData.translatedText;
  } catch (error) {
    console.error('Error traduciendo:', error);
  } finally {
    traduciendo.value = false;
  }
}
</script>

<template>
  <div class="site-wrapper">
    <AppHeader />

    <main style="min-height:calc(100vh - 64px); background:var(--bg)">

      <!-- Loading -->
      <div v-if="loading" class="d-flex flex-column align-items-center justify-content-center gap-3 text-center text-muted" style="min-height:60vh">
        <div class="spinner-border" role="status"></div>
        <p class="mb-0">Cargando detalles del juego…</p>
      </div>

      <!-- Error -->
      <div v-else-if="!juego" class="d-flex flex-column align-items-center justify-content-center gap-3 text-center text-muted" style="min-height:60vh">
        <i class="bi bi-exclamation-triangle empty-icon"></i>
        <h3>No se pudo cargar el juego</h3>
        <p>Comprueba tu conexión o vuelve a intentarlo.</p>
        <router-link to="/busqueda" class="back-link">
          <i class="bi bi-arrow-left me-1"></i>Volver al buscador
        </router-link>
      </div>

      <template v-else>

        <!-- Hero -->
        <section class="game-hero" :style="heroStyle">
          <div class="hero-overlay">
            <div class="container">

              <nav class="d-flex align-items-center gap-2 mb-4 small">
                <router-link to="/busqueda" class="breadcrumb-link">
                  <i class="bi bi-search me-1"></i>Búsqueda
                </router-link>
                <span class="text-muted">/</span>
                <span class="text-muted text-truncate" style="max-width:260px">{{ juego.name }}</span>
              </nav>

              <div class="d-flex gap-4 align-items-end">
                <img v-if="juego.background_image" :src="juego.background_image" :alt="juego.name"
                  class="hero-thumb d-none d-md-block" />

                <div class="flex-grow-1">
                  <div class="d-flex flex-wrap gap-2 mb-2">
                    <span v-if="juego.esrb_rating" class="badge-chip esrb">{{ juego.esrb_rating.name }}</span>
                    <span v-if="juego.metacritic" class="badge-chip metacritic"
                      :style="{ borderColor: metacriticColor(juego.metacritic), color: metacriticColor(juego.metacritic) }">
                      MC {{ juego.metacritic }}
                    </span>
                    <span class="badge-chip rating-chip"><i class="bi bi-star-fill me-1"></i>{{ juego.rating?.toFixed(1) }} / 5</span>
                    <span class="badge-chip year-chip"><i class="bi bi-calendar3 me-1"></i>{{ formatYear(juego.released) }}</span>
                  </div>

                  <h1 class="hero-title">{{ juego.name }}</h1>

                  <div v-if="juego.genres?.length" class="d-flex flex-wrap gap-2 mb-3">
                    <span v-for="g in juego.genres" :key="g.id" class="genre-pill">{{ g.name }}</span>
                  </div>

                  <div class="d-flex flex-wrap gap-2">
                    <button class="add-btn" @click="agregarAlBacklog">
                      <i class="bi bi-plus-circle-fill me-2"></i>Añadir a mi lista
                    </button>
                    <a v-if="juego.website" :href="juego.website" target="_blank" rel="noopener" class="site-btn">
                      <i class="bi bi-globe2 me-2"></i>Web oficial
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Detail content -->
        <section class="container py-5">
          <div class="row g-4 align-items-start">

            <!-- Main column -->
            <div class="col-12 col-lg-8">

              <!-- Description -->
              <div v-if="juego.description_raw" class="detail-block mb-4">
                <h2 class="block-title"><i class="bi bi-file-text me-2 accent-text"></i>Descripción</h2>
                <div v-if="traduciendo" class="d-flex align-items-center gap-2 text-muted fst-italic small py-2">
                  <span class="spinner-border spinner-border-sm"></span> Traduciendo descripción…
                </div>
                <p v-else class="description-text mb-2">{{ descExpanded ? descCompleta : descCorta }}</p>
                <button v-if="descCompleta.length > 600" class="expand-btn" @click="descExpanded = !descExpanded">
                  {{ descExpanded ? 'Ver menos' : 'Leer más' }}
                  <i :class="descExpanded ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="ms-1"></i>
                </button>
              </div>

              <!-- Rating breakdown -->
              <div v-if="juego.ratings?.length" class="detail-block mb-4">
                <h2 class="block-title"><i class="bi bi-bar-chart-fill me-2 accent-text"></i>Valoraciones</h2>
                <div class="d-flex flex-column gap-3">
                  <div v-for="r in juego.ratings" :key="r.id" class="d-flex align-items-center gap-3">
                    <span class="rating-label text-muted small text-capitalize text-end" style="min-width:100px">{{ r.title }}</span>
                    <div class="bar-track flex-grow-1">
                      <div class="bar-fill" :style="{ width: r.percent + '%', background: ratingBarColor(r.title) }"></div>
                    </div>
                    <span class="text-muted small text-end" style="min-width:42px">{{ r.percent.toFixed(1) }}%</span>
                  </div>
                </div>
              </div>

              <!-- Platforms -->
              <div v-if="juego.platforms?.length" class="detail-block mb-4">
                <h2 class="block-title"><i class="bi bi-display me-2 accent-text"></i>Plataformas</h2>
                <div class="row g-2">
                  <div v-for="p in juego.platforms" :key="p.platform.id" class="col-6 col-md-4">
                    <div class="platform-item d-flex align-items-center gap-2">
                      <i :class="platformIcon(p.platform.slug)" class="platform-icon"></i>
                      <span class="small text-muted">{{ p.platform.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Sidebar -->
            <aside class="col-12 col-lg-4">

              <div class="sidebar-block mb-3">
                <div class="d-flex flex-column gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="sidebar-label">Tiempo de juego</span>
                    <span class="fw-semibold small"><i class="bi bi-clock me-1 accent-text"></i>{{ juego.playtime ? juego.playtime + ' h' : 'N/A' }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="sidebar-label">Logros</span>
                    <span class="fw-semibold small"><i class="bi bi-trophy me-1 accent-text"></i>{{ juego.parent_achievements_count ?? 'N/A' }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="sidebar-label">Lanzamiento</span>
                    <span class="fw-semibold small"><i class="bi bi-calendar3 me-1 accent-text"></i>{{ juego.released || 'TBA' }}</span>
                  </div>
                </div>
              </div>

              <div v-if="juego.developers?.length" class="sidebar-block mb-3">
                <p class="sidebar-title">Desarrolladora</p>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="d in juego.developers" :key="d.id" class="tag">{{ d.name }}</span>
                </div>
              </div>

              <div v-if="juego.publishers?.length" class="sidebar-block mb-3">
                <p class="sidebar-title">Distribuidora</p>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="p in juego.publishers" :key="p.id" class="tag">{{ p.name }}</span>
                </div>
              </div>

              <div v-if="juego.genres?.length" class="sidebar-block mb-3">
                <p class="sidebar-title">Géneros</p>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="g in juego.genres" :key="g.id" class="tag accent-tag">{{ g.name }}</span>
                </div>
              </div>

              <div v-if="juego.tags?.length" class="sidebar-block mb-3">
                <p class="sidebar-title">Etiquetas</p>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="t in juego.tags.filter(t => t.language === 'eng').slice(0, 12)" :key="t.id"
                    class="tag small-tag">{{ t.name }}</span>
                </div>
              </div>

            </aside>

          </div>
        </section>

      </template>
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
.empty-icon  { font-size: 3.5rem; color: var(--accent); opacity: .4; }
.back-link   { color: var(--accent-light); text-decoration: none; }
.back-link:hover { text-decoration: underline; }

/* Hero */
.game-hero { background-size: cover; background-position: center top; }
.hero-overlay {
  background: linear-gradient(to bottom, rgba(11,9,20,.55) 0%, rgba(11,9,20,.82) 50%, rgba(11,9,20,1) 100%);
  padding: 5rem 0 3rem;
}
.hero-thumb { width: 180px; flex-shrink: 0; border-radius: var(--radius); box-shadow: 0 16px 48px rgba(0,0,0,.6); border: 1px solid var(--border-h); object-fit: cover; aspect-ratio: 3/4; }
.breadcrumb-link { color: var(--accent-light); text-decoration: none; }
.breadcrumb-link:hover { text-decoration: underline; }
.hero-title { font-size: clamp(1.8rem,5vw,3.2rem); font-weight: 800; line-height: 1.1; margin-bottom: .8rem; text-shadow: 0 2px 16px rgba(0,0,0,.5); }

/* Badges */
.badge-chip { display: inline-flex; align-items: center; font-size: .72rem; font-weight: 700; padding: .2rem .65rem; border-radius: 20px; border: 1px solid transparent; text-transform: uppercase; }
.esrb        { background: rgba(139,92,246,.18); border-color: rgba(139,92,246,.35); color: var(--accent-light); }
.metacritic  { background: rgba(0,0,0,.35); }
.rating-chip { background: rgba(245,158,11,.12); border-color: rgba(245,158,11,.3); color: #fbbf24; }
.year-chip   { background: rgba(148,163,184,.1); border-color: rgba(148,163,184,.2); color: var(--text-muted); }

.genre-pill { font-size: .75rem; background: rgba(139,92,246,.15); border: 1px solid rgba(139,92,246,.25); color: var(--accent-light); padding: .15rem .6rem; border-radius: 20px; }

/* Buttons */
.add-btn  { display: inline-flex; align-items: center; background: var(--accent); color: #fff; border: none; border-radius: var(--radius-sm); padding: .65rem 1.4rem; font-weight: 700; font-size: .9rem; cursor: pointer; transition: background .18s, transform .15s; }
.add-btn:hover { background: var(--accent-dark); transform: translateY(-2px); }
.site-btn { display: inline-flex; align-items: center; background: transparent; border: 1.5px solid var(--border-h); color: var(--text-muted); border-radius: var(--radius-sm); padding: .65rem 1.2rem; font-size: .9rem; font-weight: 600; text-decoration: none; transition: border-color .18s, color .18s; }
.site-btn:hover { border-color: var(--accent-light); color: var(--accent-light); }

/* Blocks */
.detail-block { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
.block-title  { font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem; padding-bottom: .6rem; border-bottom: 1px solid var(--border); }
.description-text { color: var(--text-muted); line-height: 1.75; font-size: .95rem; white-space: pre-line; }
.expand-btn { background: none; border: none; color: var(--accent-light); font-size: .85rem; font-weight: 600; cursor: pointer; padding: .4rem 0 0; display: flex; align-items: center; }
.expand-btn:hover { text-decoration: underline; }

/* Rating bars */
.bar-track { height: 6px; background: var(--bg-surface); border-radius: 3px; overflow: hidden; }
.bar-fill  { height: 100%; border-radius: 3px; transition: width .6s ease; }

/* Platforms */
.platform-item { background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: .35rem .7rem; }
.platform-icon { font-size: 1rem; color: var(--accent-light); }

/* Sidebar */
.sidebar-block { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.sidebar-title { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--text-muted); margin-bottom: .6rem; }
.sidebar-label { font-size: .8rem; color: var(--text-muted); }

/* Tags */
.tag        { font-size: .78rem; background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-muted); padding: .2rem .6rem; border-radius: 20px; }
.accent-tag { background: rgba(139,92,246,.12); border-color: rgba(139,92,246,.25); color: var(--accent-light); }
.small-tag  { font-size: .72rem; }

/* Toast */
.toast-notif { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999; padding: .8rem 1.3rem; border-radius: var(--radius-sm); font-size: .9rem; font-weight: 600; display: flex; align-items: center; box-shadow: 0 8px 30px rgba(0,0,0,.4); max-width: 340px; }
.toast-notif.success { background: rgba(34,197,94,.15); border: 1px solid rgba(34,197,94,.35); color: #4ade80; }
.toast-notif.error   { background: rgba(239,68,68,.15);  border: 1px solid rgba(239,68,68,.35);  color: #f87171; }
.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
