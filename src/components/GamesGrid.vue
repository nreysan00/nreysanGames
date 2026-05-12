<template>
  <section id="juegos" class="games-section" aria-labelledby="games-title">
    <div class="container">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 id="games-title" class="section-title">
            Juegos <span class="hl">Destacados</span>
          </h2>
          <p class="section-sub">Los títulos más valorados por la comunidad</p>
        </div>
        <a href="/busqueda" class="see-all-link">
          Ver catálogo <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
        </a>
      </div>

      <!-- Grid -->
      <div class="games-grid" role="list" aria-label="Juegos destacados">
        <article
          v-for="game in games"
          :key="game.id"
          class="game-card"
          role="listitem"
        >
          <!-- Cover -->
          <div class="game-cover" :style="{ background: game.gradient }">
            <img 
              :src="game.image || 'https://via.placeholder.com/317x180?text=No+Image'" 
              width="317px" 
              height="180px"
              :alt="`Portada de ${game.title}`"
            >
            <div class="cover-overlay">
              <button class="btn-quick-add" aria-label="`Añadir ${game.title} al carrito`">
                <i class="bi bi-bag-plus" aria-hidden="true"></i>
              </button>
            </div>
            <span v-if="game.badge" class="game-badge" :class="`badge-${game.badge.type}`">
              {{ game.badge.text }}
            </span>
          </div>

          <!-- Info -->
          <div class="game-info">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <span class="game-genre">{{ game.genre }}</span>
              <div class="game-rating">
                <i class="bi bi-star-fill" aria-hidden="true"></i>
                <span>{{ game.rating }}</span>
              </div>
            </div>
            <h3 class="game-title">{{ game.title }}</h3>
            <p class="game-studio">{{ game.studio }}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="game-price-block">
                <span v-if="game.oldPrice" class="old-price">€ {{ game.oldPrice }}</span>
                <span class="game-price">€ {{ game.price }}</span>
              </div>
              <button class="btn-add" :aria-label="`Añadir ${game.title} al carrito`">
                <i class="bi bi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
const games = [
  {
    id: 1,
    title: 'Red Dead Redemption 2',
    studio: 'Rockstar Games',
    genre: 'Acción / RPG',
    rating: '9.7',
    price: '42.99',
    oldPrice: '59.99',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    badge: { type: 'sale', text: '-23%' },
  },
  {
    id: 2,
    title: "Resident Evil Requiem",
    studio: 'ArkaneWorks',
    genre: 'RPG / Fantasía',
    rating: '9.1',
    price: '39.99',
    oldPrice: '59.99',
    gradient: 'linear-gradient(135deg, #431407 0%, #9a3412 50%, #c2410c 100%)',
    image: 'https://imgproxy.eneba.games/CFbYrrQ9gtoz1Q6Wk5y33cJNhE-VMSwkrTyj7rK0Ijk/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy85/cEZJMU15UHprWmJS/bjNuNEVmNE92UkRS/WmVFSXZEZkpya2x4/NlpkLUxZLmpwZw',
    badge: { type: 'sale', text: '−33%' },
  },
  {
    id: 3,
    title: 'Crimson Desert',
    studio: 'DarkPixel',
    genre: 'Sigilo / Thriller',
    rating: '8.8',
    price: '29.99',
    oldPrice: null,
    gradient: 'linear-gradient(135deg, #0c0a1e 0%, #1e1b38 50%, #2d2b52 100%)',
    image: 'https://cdn1.epicgames.com/spt-assets/f9616d900e1048a29ee9ffe9523c1594/crimson-desert-191ki.jpg',
    badge: { type: 'new', text: 'NUEVO' },
  },
  {
    id: 4,
    title: 'Legend Of Zelda: Breath Of The Wild',
    studio: 'Nintendo',
    genre: 'Aventura / Mundo abierto',
    rating: '9.7',
    price: '59.99',
    oldPrice: null,
    gradient: 'linear-gradient(135deg, #022c22 0%, #065f46 50%, #059669 100%)',
    image: 'https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_992,q_auto:low/MNS/NOE/70010000000023/SQ_NSwitch_TheLegendOfZeldaBreathOfTheWild_E',
    badge: { type: 'hot', text: 'POPULAR' },
  },
  {
    id: 5,
    title: 'Super Mario Odyssey',
    studio: 'Nintendo',
    genre: 'Aventura / Plataformas',
    rating: '9.7',
    price: '59.99',
    oldPrice: null,
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #1d4ed8 100%)',
    image: 'https://m.media-amazon.com/images/I/71MQ0RSj1xL._AC_UF894,1000_QL80_.jpg',
    badge: { type: 'sale', text: '−18%' },
  },
  {
    id: 6,
    title: 'Uncharted 4: A Thief’s End',
    studio: 'Naughty Dog',
    genre: 'Aventura / Acción',
    rating: '9.3',
    price: '59.99',
    oldPrice: null,
    gradient: 'linear-gradient(135deg, #1c1007 0%, #44260d 50%, #78350f 100%)',
    image: 'https://static.posters.cz/image/750/28402.jpg',
    badge: null,
  },
];
</script>

<style scoped>
.games-section {
  padding: 1rem 0 4rem;
  background: var(--bg);
}

.section-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 4px;
}
.hl {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-sub {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
}
.see-all-link {
  font-size: 0.88rem;
  font-weight: 600;
  color: #8b5cf6;
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
}
.see-all-link:hover { color: #a78bfa; }

/* ── Grid ── */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

/* ── Card ── */
.game-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s;
}
.game-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.15);
}

/* ── Cover ── */
.game-cover {
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cover-ico {
  font-size: 3.5rem;
  color: rgba(255,255,255,0.22);
  transition: transform 0.3s;
}
.game-card:hover .cover-ico { transform: scale(1.1); }

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s;
}
.game-card:hover .cover-overlay { background: rgba(0,0,0,0.35); }
.btn-quick-add {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #8b5cf6;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.25s;
}
.game-card:hover .btn-quick-add { opacity: 1; transform: scale(1); }
.btn-quick-add:hover { background: #7c3aed; transform: scale(1.08) !important; }

.game-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.6px;
}
.badge-new  { background: #8b5cf6; color: #fff; }
.badge-sale { background: #22c55e; color: #fff; }
.badge-hot  { background: #ef4444; color: #fff; }

/* ── Info ── */
.game-info {
  padding: 1rem 1.1rem 1.1rem;
}
.game-genre {
  font-size: 0.72rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.game-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #f59e0b;
}
.game-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.game-studio {
  font-size: 0.78rem;
  color: #475569;
  margin: 0;
}
.game-price-block {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.old-price {
  font-size: 0.8rem;
  color: #475569;
  text-decoration: line-through;
}
.game-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #a78bfa;
}
.btn-add {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.25);
  color: #8b5cf6;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-add:hover {
  background: #8b5cf6;
  color: #fff;
  border-color: #8b5cf6;
}
</style>
