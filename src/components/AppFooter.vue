<template>
  <footer class="site-footer" role="contentinfo" aria-label="Pie de página">
    <div class="container">

      <div class="row g-4 footer-top">

        <div class="col-lg-4 col-md-6">
          <a class="footer-brand" href="#inicio" aria-label="Inicio de nreysanGames">
            <i class="bi bi-controller brand-ico" aria-hidden="true"></i>
            <span><span class="brand-hl">nreysan</span>Games</span>
          </a>
          <p class="footer-desc mt-3">
            Tu plataforma gamer para gestionar backlog, leer reseñas y conectar con
            la comunidad. Conectado a <strong class="rawg-link">RAWG API</strong>
            con +50.000 juegos.
          </p>
          <div class="social-links mt-3" aria-label="Redes sociales">
            <a href="#" class="social-btn" aria-label="GitHub del proyecto">
              <i class="bi bi-github" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-btn" aria-label="Twitter / X">
              <i class="bi bi-twitter-x" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-btn" aria-label="Discord de la comunidad">
              <i class="bi bi-discord" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-btn" aria-label="Instagram">
              <i class="bi bi-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 col-6">
          <h3 class="footer-col-title">Explorar</h3>
          <ul class="footer-list" role="list">
            <li><a href="#inicio" class="footer-link">Inicio</a></li>
            <li><a href="#juegos" class="footer-link">Juegos</a></li>
            <li><a href="#categorias" class="footer-link">Categorías</a></li>
            <li><a href="#oferta" class="footer-link">Ofertas</a></li>
            <li><a href="#" class="footer-link">Top Rated</a></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 col-6">
          <h3 class="footer-col-title">Mi Cuenta</h3>
          <ul class="footer-list" role="list">
            <li><a href="/register" class="footer-link">Registro</a></li>
            <li><a href="/login" class="footer-link">Iniciar sesión</a></li>
            <li><a href="/milista" class="footer-link">Mi Backlog</a></li>
            <li><a href="#" class="footer-link">Mi Perfil</a></li>
            <li><a href="#" class="footer-link">Reseñas</a></li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-6">
          <h3 class="footer-col-title">Información</h3>
          <ul class="footer-list" role="list">
            <li><a href="#" class="footer-link">Sobre el proyecto</a></li>
            <li><a href="#" class="footer-link">Documentación API</a></li>
            <li><a href="#" class="footer-link">Política de privacidad</a></li>
            <li><a href="#" class="footer-link">Términos de uso</a></li>
          </ul>
          <div class="rawg-badge mt-3" aria-label="Impulsado por RAWG API">
            <i class="bi bi-database-fill me-2" aria-hidden="true"></i>
            Impulsado por RAWG API
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span class="footer-copy">
          &copy; {{ currentYear }} nreysanGames — Proyecto TFG Desarrollo de Aplicaciones Web
        </span>
        <div class="footer-bottom-links">
          <a href="#" class="footer-link-sm">Privacidad</a>
          <a href="#" class="footer-link-sm">Términos</a>
          <a href="#" class="footer-link-sm">Cookies</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.site-footer {
  background: #080613;
  border-top: 1px solid rgba(139, 92, 246, 0.13);
  padding-top: 3.5rem;
}

/* ── Brand ── */
.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 800;
  color: #f1f5f9;
}
.brand-ico {
  font-size: 1.5rem;
  color: #8b5cf6;
}
.brand-hl { color: #8b5cf6; }

.footer-desc {
  font-size: 0.87rem;
  color: #64748b;
  line-height: 1.65;
  max-width: 300px;
}
.rawg-link { color: #8b5cf6; font-weight: 600; }

/* ── Social ── */
.social-links { display: flex; gap: 0.6rem; }
.social-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
}
.social-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.35);
  color: #a78bfa;
  transform: translateY(-2px);
}

/* ── Columns ── */
.footer-col-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #f1f5f9;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}
.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.footer-link {
  font-size: 0.88rem;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover { color: #a78bfa; }

/* ── RAWG badge ── */
.rawg-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  padding: 0.4rem 0.85rem;
}

/* ── Bottom bar ── */
.footer-top { padding-bottom: 2.5rem; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.footer-copy {
  font-size: 0.8rem;
  color: #334155;
}
.footer-bottom-links {
  display: flex;
  gap: 1.25rem;
}
.footer-link-sm {
  font-size: 0.8rem;
  color: #334155;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link-sm:hover { color: #8b5cf6; }
</style>
