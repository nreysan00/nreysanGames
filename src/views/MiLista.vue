<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import api from '../services/api';

const router = useRouter();
const listaJuegos = ref([])
const loading = ref(true)
onMounted(() => {
    fetchUserGames();
})

const fetchUserGames = async () => {
  const session = JSON.parse(localStorage.getItem('login'));
  console.log("Sesión recuperada:", session);
  if (!session || !session.id) {
    console.error("No hay sesión activa");
    loading.value = false;
    return;
  }

  try {
    const response = await api.getUserBacklog(session.id);
    
    // Axios guarda los datos en .data
    listaJuegos.value = response.data;
  } catch (error) {
    console.error("Error al cargar el backlog:", error);
  } finally {
    loading.value = false;
  }
};

const cambiarEstado = async (id, nuevoEstado) => {
  try {
    const response = await api.updateGameStatus(id, nuevoEstado);
    if (response.data.success) {
      console.log("Estado actualizado correctamente");
    }
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    alert("No se pudo actualizar el estado.");
  }
};

// Función para borrar un juego de la lista
const borrarJuego = async (id) => {
  if (!confirm("¿Seguro que quieres eliminar este juego?")) return;
  
  try {
    await api.deleteGameFromBacklog(id);
    // Filtramos el array local para que desaparezca visualmente sin recargar
    listaJuegos.value = listaJuegos.value.filter(g => g.id !== id);
  } catch (error) {
    console.error("Error al borrar:", error);
  }
};
</script>

<template>
    <div class="site-wrapper">
        <AppHeader/>
            <main class="container my-5 min-vh-100">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="text-white">Mi Colección</h1>
            <span class="badge bg-primary">{{ listaJuegos.length }} Juegos</span>
        </div>

        <div v-if="loading" class="text-center text-white my-5">
            <div class="spinner-border" role="status"></div>
            <p class="mt-2">Cargando tu lista...</p>
        </div>

        <div v-else-if="listaJuegos.length === 0" class="text-center text-secondary my-5">
            <i class="bi bi-controller fs-1"></i>
            <p class="mt-3">Aún no has añadido ningún juego a tu lista.</p>
            <router-link to="/busqueda" class="btn btn-outline-primary mt-2">Buscar juegos</router-link>
        </div>

        <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col" v-for="game in listaJuegos" :key="game.id">
  <div class="card h-100 game-card shadow border-0">
    <div class="game-cover-container">
      <img :src="game.imagen_url" class="card-img-top" :alt="game.titulo">
    </div>

    <div class="card-body d-flex flex-column">
      <router-link :to="`/juego/${game.game_id_rawg}`" class="card-title fs-6 fw-bold text-white text-decoration-none">{{ game.titulo }}</router-link>
      <div class="mt-3">
        <label class="text-secondary small d-block mb-1">Estado del juego:</label>
        <select 
          v-model="game.estado" 
          class="form-select form-select-sm bg-dark text-white border-secondary"
          @change="cambiarEstado(game.id, game.estado)"
        >
          <option value="pendiente">⏳ Pendiente</option>
          <option value="jugando">🎮 Jugando</option>
          <option value="completado">🏆 Completado</option>
          <option value="abandonado">❌ Abandonado</option>
        </select>
      </div>

      <button 
        @click="borrarJuego(game.id)"  
        class="btn btn-outline-danger btn-sm mt-3 w-100"
      >
        <i class="bi bi-trash"></i> Eliminar
      </button>
    </div>
  </div>
</div>
        </div>
        </main>
        <AppFooter/>
    </div>
</template>

<style scoped>
.game-card { background: var(--bg-card); border: 1px solid var(--border) !important; transition: transform .2s, box-shadow .2s; }
.game-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(139,92,246,.15); }
.game-cover-container { height: 160px; overflow: hidden; }
.game-cover-container img { width: 100%; height: 100%; object-fit: cover; }
</style>