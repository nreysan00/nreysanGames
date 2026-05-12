<template>
  <section id="categorias" class="cats-section" aria-labelledby="cats-title">
    <div class="container">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 id="cats-title" class="section-title">
          Explorar por <span class="hl">Género</span>
        </h2>
        <a href="#juegos" class="see-all-link">
          Ver todos <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
        </a>
      </div>

      <div class="cats-grid" role="list" aria-label="Géneros de videojuegos">
        <button
          v-for="cat in categories"
          :key="cat.name"
          class="cat-card"
          :class="{ active: activeCat === cat.name }"
          :style="{ '--cat-color': cat.color }"
          @click="activeCat = cat.name"
          role="listitem"
          :aria-pressed="activeCat === cat.name"
          :aria-label="`Filtrar por ${cat.name}`"
        >
          <div class="cat-icon-wrap">
            <i :class="`bi ${cat.icon}`" aria-hidden="true"></i>
          </div>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ cat.count }}</span>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeCat = ref('Todos');

const categories = [
  { name: 'Todos',      icon: 'bi-grid-fill',         color: '#8b5cf6', count: '50K+' },
  { name: 'Acción',     icon: 'bi-lightning-fill',     color: '#ef4444', count: '8.2K' },
  { name: 'RPG',        icon: 'bi-magic',              color: '#f59e0b', count: '5.4K' },
  { name: 'Aventura',   icon: 'bi-compass-fill',       color: '#10b981', count: '6.1K' },
  { name: 'Estrategia', icon: 'bi-diagram-3-fill',     color: '#3b82f6', count: '4.3K' },
  { name: 'Deportes',   icon: 'bi-trophy-fill',        color: '#22c55e', count: '3.8K' },
  { name: 'Terror',     icon: 'bi-moon-stars-fill',    color: '#a855f7', count: '2.9K' },
  { name: 'Simulación', icon: 'bi-controller',         color: '#06b6d4', count: '3.2K' },
];
</script>

<style scoped>
.cats-section {
  padding: 3.5rem 0;
  background: var(--bg);
}

.section-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #f1f5f9;
}
.hl {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.see-all-link {
  font-size: 0.88rem;
  font-weight: 600;
  color: #8b5cf6;
  text-decoration: none;
  transition: color 0.2s;
}
.see-all-link:hover { color: #a78bfa; }

/* ── Grid ── */
.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

/* ── Card ── */
.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.2rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s;
  text-align: center;
}
.cat-card:hover {
  background: var(--bg-card-h);
  border-color: rgba(var(--cat-color), 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.cat-card.active {
  border-color: var(--cat-color);
  background: var(--bg-card-h);
  box-shadow: 0 0 0 1px var(--cat-color), 0 8px 24px rgba(0,0,0,0.3);
}

.cat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: var(--cat-color);
  transition: background 0.25s;
}
.cat-card.active .cat-icon-wrap,
.cat-card:hover .cat-icon-wrap {
  background: color-mix(in srgb, var(--cat-color) 18%, transparent);
}

.cat-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #cbd5e1;
}
.cat-card.active .cat-name { color: #f1f5f9; }

.cat-count {
  font-size: 0.72rem;
  color: #475569;
  font-weight: 500;
}
</style>
