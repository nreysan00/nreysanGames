<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import api from '../services/api';

const route = useRoute();
const username = route.params.username;
const juegos = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(fetchPerfil);

async function fetchPerfil() {
  try {
    const response = await api.getPerfilUsuario(username);
    juegos.value = response.data.juegos;
  } catch (e) {
    error.value = e.response?.status === 404
      ? 'Usuario no encontrado.'
      : 'Error al cargar el perfil.';
  } finally {
    loading.value = false;
  }
}

const estadoLabel = {
  pendiente:  '⏳ Pendiente',
  jugando:    '🎮 Jugando',
  completado: '🏆 Completado',
  abandonado: '❌ Abandonado',
};
</script>

<template>
  <div class="site-wrapper">
    <AppHeader />

    <main class="container my-5 min-vh-100">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 class="text-white mb-0">Perfil de <span class="text-accent">{{ username }}</span></h1>
        <span class="badge bg-primary">{{ juegos.length }} juegos</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-white my-5">
        <div class="spinner-border" role="status"></div>
        <p class="mt-2">Cargando perfil...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center text-secondary my-5">
        <i class="bi bi-exclamation-circle fs-1"></i>
        <p class="mt-3">{{ error }}</p>
      </div>

      <!-- Empty -->
      <div v-else-if="juegos.length === 0" class="text-center text-secondary my-5">
        <i class="bi bi-controller fs-1"></i>
        <p class="mt-3">{{ username }} aún no tiene juegos en su lista.</p>
      </div>

      <!-- Grid -->
      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div class="col" v-for="game in juegos" :key="game.id">
          <div class="card h-100 game-card border-0 shadow">
            <div class="game-cover">
              <img :src="game.imagen_url" class="card-img-top" :alt="game.titulo">
            </div>
            <div class="card-body d-flex flex-column">
              <router-link
                :to="`/juego/${game.game_id_rawg}`"
                class="card-title fs-6 fw-bold text-white text-decoration-none mb-2"
              >{{ game.titulo }}</router-link>
              <span class="estado-chip mt-auto">{{ estadoLabel[game.estado] ?? game.estado }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.text-accent { color: var(--accent-light); }
.game-card { background: var(--bg-card); border: 1px solid var(--border) !important; transition: transform .2s, box-shadow .2s; }
.game-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(139,92,246,.15); }
.game-cover { height: 160px; overflow: hidden; }
.game-cover img { width: 100%; height: 100%; object-fit: cover; }
.estado-chip { display: inline-block; font-size: .78rem; font-weight: 600; background: rgba(139,92,246,.12); border: 1px solid rgba(139,92,246,.25); color: var(--accent-light); border-radius: 20px; padding: .2rem .75rem; }
</style>
