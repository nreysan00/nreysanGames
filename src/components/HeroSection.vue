<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <section id="inicio" class="hero" aria-labelledby="hero-title">

    <!-- Background decorations -->
    <div class="hero-bg" aria-hidden="true">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="dot-grid"></div>
    </div>

    <div class="container py-5">
      <div class="row align-items-center g-5">

        <!-- ── Left: text ── -->
        <div class="col-lg-6">
          <span class="new-badge">
            <i class="bi bi-stars me-1"></i> Nuevo en nreysanGames
          </span>

          <h1 id="hero-title" class="hero-title mt-3 mb-3">
            Descubre y Gestiona<br>
            Tu <span class="title-hl">Colección</span><br>
            de Videojuegos
          </h1>

          <p class="hero-sub mb-4">
            Lleva el control de los juegos que has completado, descubre nuevos títulos
            y comparte tu perfil con la comunidad gamer.
          </p>

          <!-- Platform chips -->
          <div class="d-flex flex-wrap gap-2 mb-4" aria-label="Plataformas soportadas">
            <span class="platform-chip"><i class="bi bi-windows" aria-hidden="true"></i>&nbsp;PC</span>
            <span class="platform-chip"><i class="bi bi-playstation" aria-hidden="true"></i>&nbsp;PlayStation</span>
            <span class="platform-chip"><i class="bi bi-xbox" aria-hidden="true"></i>&nbsp;Xbox</span>
            <span class="platform-chip" aria-label="Nintendo Switch">
              <i class="bi bi-joystick" aria-hidden="true"></i>&nbsp;Switch
            </span>
          </div>

          <!-- CTAs -->
          <div class="d-flex flex-wrap gap-3 mb-5">
            <button class="btn btn-hero-primary" @click="router.push('/register')">
              <i class="bi bi-play-circle-fill me-2" aria-hidden="true"></i>Empezar Gratis
            </button>
            <button class="btn btn-hero-ghost" @click="router.push('/busqueda')">
              <i class="bi bi-grid-3x3-gap me-2" aria-hidden="true"></i>Ver Catálogo
            </button>
          </div>

          <!-- Stats -->
          <div class="hero-stats" role="list" aria-label="Estadísticas de la plataforma">
            <div class="stat" role="listitem">
              <span class="stat-num">50K+</span>
              <span class="stat-lbl">Juegos</span>
            </div>
            <div class="stat-sep" aria-hidden="true"></div>
            <div class="stat" role="listitem">
              <span class="stat-num">12K+</span>
              <span class="stat-lbl">Usuarios</span>
            </div>
            <div class="stat-sep" aria-hidden="true"></div>
            <div class="stat" role="listitem">
              <span class="stat-num">98K+</span>
              <span class="stat-lbl">Reseñas</span>
            </div>
          </div>
        </div>

        <!-- ── Right: featured game visual ── -->
        <div class="col-lg-6 d-none d-lg-flex justify-content-center">
          <div class="hero-visual" role="img" aria-label="Juego destacado: Cyber Chronicles">

            <!-- Main game card -->
            <div class="feat-card">
              <div class="feat-cover">
                <div class="cover-art cover-art-cyber">
                  <img src="https://cdn.dlcompare.com/others_jpg/upload/news/image/clair-obscur-expedition-33-va-a-bcb51b70-image-531771b5a.jpg.webp" width="360px" height="260px">
                </div>
                <span class="cover-genre-tag">Acción / RPG</span>
                <span class="cover-new-tag">NUEVO</span>
              </div>
              <div class="feat-info">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h2 class="feat-title">Clair Obscur: Expedition 33</h2>
                    <span class="feat-studio">Sandfall Interactive · 2025</span>
                  </div>
                  <div class="feat-rating">
                    <i class="bi bi-star-fill" aria-hidden="true"></i>
                    <span>9.2</span>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <span class="feat-price">€ 49.99</span>
                  <button class="btn btn-add-cart">
                    <i class="bi bi-bag-plus me-1" aria-hidden="true"></i>Añadir
                  </button>
                </div>
              </div>
            </div>

            <!-- Floating info pills -->
            <div class="float-pill pill-top" aria-hidden="true">
              <i class="bi bi-award-fill text-warning me-2"></i>
              <span>Juego del Año 2025</span>
            </div>
            <div class="float-pill pill-bottom" aria-hidden="true">
              <i class="bi bi-people-fill me-2" style="color:#22c55e"></i>
              <span>2.4K jugando ahora</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* ── Section ── */
.hero {
  position: relative;
  overflow: hidden;
  background: var(--bg);
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* ── Background blobs ── */
.hero-bg { position: absolute; inset: 0; pointer-events: none; }

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
}
.blob-1 {
  width: 520px; height: 520px;
  background: #8b5cf6;
  top: -120px; left: -100px;
}
.blob-2 {
  width: 400px; height: 400px;
  background: #a78bfa;
  bottom: -60px; right: -60px;
}
.dot-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* ── New badge ── */
.new-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #a78bfa;
  letter-spacing: 0.3px;
}

/* ── Title ── */
.hero-title {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1.15;
  letter-spacing: -1px;
}
.title-hl {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 1.05rem;
  color: #94a3b8;
  max-width: 480px;
  line-height: 1.7;
}

/* ── Platform chips ── */
.platform-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #cbd5e1;
}

/* ── CTA buttons ── */
.btn-hero-primary {
  background: #8b5cf6;
  color: #fff;
  border: none;
  padding: 0.75rem 1.8rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.25s;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
}
.btn-hero-primary:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(139, 92, 246, 0.55);
  color: #fff;
}
.btn-hero-ghost {
  background: rgba(255, 255, 255, 0.06);
  color: #f1f5f9;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.8rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.25s;
}
.btn-hero-ghost:hover {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(255, 255, 255, 0.28);
  color: #fff;
  transform: translateY(-2px);
}

/* ── Stats ── */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1;
}
.stat-lbl {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 2px;
}
.stat-sep {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.1);
}

/* ── Hero visual ── */
.hero-visual {
  position: relative;
  width: 360px;
}

/* ── Featured card ── */
.feat-card {
  background: var(--bg-card);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.12);
}

.feat-cover {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.cover-art {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-art-cyber {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #5b21b6 100%);
}
.cover-icon {
  font-size: 5rem;
  color: rgba(167, 139, 250, 0.55);
}
.cover-genre-tag {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  color: #c4b5fd;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(139,92,246,0.3);
}
.cover-new-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #8b5cf6;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  letter-spacing: 0.8px;
}

.feat-info {
  padding: 1.1rem 1.25rem;
}
.feat-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 2px;
}
.feat-studio {
  font-size: 0.78rem;
  color: #64748b;
}
.feat-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 8px;
  padding: 4px 9px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #f59e0b;
}
.feat-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: #a78bfa;
}
.btn-add-cart {
  background: #8b5cf6;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 9px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-add-cart:hover {
  background: #7c3aed;
  color: #fff;
  transform: translateY(-1px);
}

/* ── Floating pills ── */
.float-pill {
  position: absolute;
  display: flex;
  align-items: center;
  background: rgba(26, 23, 48, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 100px;
  padding: 0.5rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.pill-top { top: 30px; right: -50px; }
.pill-bottom { bottom: 80px; left: -55px; }
</style>
