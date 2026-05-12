<template>
  <section id="oferta" class="offer-section" aria-labelledby="offer-title">
    <div class="container">
      <div class="offer-card">

        <!-- Background decorations -->
        <div class="offer-blob offer-blob-1" aria-hidden="true"></div>
        <div class="offer-blob offer-blob-2" aria-hidden="true"></div>
        <div class="offer-grid" aria-hidden="true"></div>

        <div class="row align-items-center position-relative g-4">

          <!-- Left: text -->
          <div class="col-lg-7">
            <span class="offer-eyebrow">
              <i class="bi bi-lightning-charge-fill me-1" aria-hidden="true"></i>
              Oferta Especial · Por tiempo limitado
            </span>
            <h2 id="offer-title" class="offer-title mt-2 mb-3">
              Accede a <span class="offer-hl">+50.000 juegos</span><br>
              desde un solo lugar
            </h2>
            <p class="offer-desc mb-4">
              Crea tu cuenta gratis, gestiona tu backlog, lee reseñas de la comunidad
              y descubre cuáles son los juegos del momento.
            </p>
            <div class="d-flex flex-wrap align-items-center gap-3">
              <button class="btn btn-offer-primary">
                <a href="/register">
                <i class="bi bi-person-plus-fill me-2" aria-hidden="true"></i>Crear cuenta gratis
                </a>
              </button>
              <span class="offer-note">
                <i class="bi bi-check-circle-fill me-1 text-success" aria-hidden="true"></i>
                Sin tarjeta de crédito
              </span>
            </div>
          </div>

          <!-- Right: stat cards -->
          <div class="col-lg-5">
            <div class="offer-stats-wrap" role="list" aria-label="Ventajas de la plataforma">
              <div
                v-for="item in perks"
                :key="item.label"
                class="perk-card"
                role="listitem"
              >
                <div class="perk-icon" :style="{ color: item.color, background: `${item.color}18` }">
                  <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
                </div>
                <div>
                  <div class="perk-value">{{ item.value }}</div>
                  <div class="perk-label">{{ item.label }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const perks = [
  { icon: 'bi-controller',       value: '50K+',  label: 'Juegos disponibles', color: '#8b5cf6' },
  { icon: 'bi-people-fill',      value: '12K+',  label: 'Usuarios activos',   color: '#22c55e' },
  { icon: 'bi-chat-quote-fill',  value: '98K+',  label: 'Reseñas escritas',   color: '#f59e0b' },
  { icon: 'bi-star-fill',        value: '4.9/5', label: 'Valoración media',   color: '#ef4444' },
];
</script>

<style scoped>
.offer-section {
  padding: 0 0 4.5rem;
  background: var(--bg);
}

/* ── Card ── */
.offer-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #13102a 0%, #1a1730 60%, #1e1b3a 100%);
  border: 1px solid rgba(139, 92, 246, 0.22);
  border-radius: 24px;
  padding: 3.5rem 3rem;
}

/* ── Decorations ── */
.offer-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
}
.offer-blob-1 {
  width: 350px; height: 350px;
  background: rgba(139, 92, 246, 0.18);
  top: -80px; left: -60px;
}
.offer-blob-2 {
  width: 280px; height: 280px;
  background: rgba(167, 139, 250, 0.1);
  bottom: -50px; right: 100px;
}
.offer-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(139,92,246,0.08) 1px, transparent 1px);
  background-size: 26px 26px;
  pointer-events: none;
}

/* ── Eyebrow ── */
.offer-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 100px;
  padding: 0.3rem 0.85rem;
}

/* ── Title ── */
.offer-title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1.2;
  letter-spacing: -0.5px;
}
.offer-hl {
  background: linear-gradient(135deg, #8b5cf6, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.offer-desc {
  font-size: 0.97rem;
  color: #94a3b8;
  max-width: 460px;
  line-height: 1.7;
}

/* ── CTA ── */
.btn-offer-primary {
  background: #8b5cf6;
  color: #fff;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 12px;
  font-size: 0.97rem;
  font-weight: 700;
  transition: all 0.25s;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
}
.btn-offer-primary:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.55);
  color: #fff;
}
.offer-note {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 500;
}

/* ── Perk cards ── */
.offer-stats-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}
.perk-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1rem;
}
.perk-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.perk-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1;
}
.perk-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 3px;
}
div a {
  color: white;
  text-decoration: none;
}
</style>
