import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Autenticación
  register(userData) {
    return apiClient.post('/auth.php?action=register', userData);
  },
  login(credentials) {
    return apiClient.post('/auth.php?action=login', credentials);
  },
  // Backlog
  getUserBacklog(userId) {
    return apiClient.get(`/backlog.php?user_id=${userId}`);
  },
  addGameToBacklog(gameData) {
    return apiClient.post('/backlog.php', gameData);
  },
  updateGameStatus(id, estado) {
    return apiClient.post('/backlog.php?action=update', { id, estado })
  },
  deleteGameFromBacklog(id) {
    return apiClient.post('/backlog.php?action=delete', { id })
  },
  // Admin
  getAdminUsers() {
    return apiClient.get('/admin.php');
  },
  deleteAdminUser(id) {
    return apiClient.post('/admin.php?action=delete', { id });
  },
  // Perfil
  getPerfilUsuario(username) {
    return apiClient.get(`/perfil.php?username=${username}`);
  }
};