<template>
  <section id="caracteristicas" class="py-5" aria-labelledby="features-title">
    <div class="container">
      <h2 id="features-title" class="visually-hidden">Características principales</h2>
      
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card h-100 bg-dark text-light border-secondary feature-card">
            <div class="card-body text-center p-4">
              <i class="bi bi-controller display-4 brand-icon mb-3" aria-hidden="true"></i>
              <h3 class="card-title h5">Catálogo Infinito</h3>
              <p class="card-text text-secondary mt-3">
                Conectado a la base de datos de RAWG para encontrar cualquier juego al instante, con carátulas e información detallada.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="card h-100 bg-dark text-light border-secondary feature-card">
            <div class="card-body text-center p-4">
              <i class="bi bi-journal-check display-4 brand-icon mb-3" aria-hidden="true"></i>
              <h3 class="card-title h5">Gestión Total</h3>
              <p class="card-text text-secondary mt-3">
                Marca tus juegos como completados, dales una nota y escribe tus propias reseñas para llevar tu diario personal.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="card h-100 bg-dark text-light border-secondary feature-card">
            <div class="card-body text-center p-4">
              <i class="bi bi-people-fill display-4 brand-icon mb-3" aria-hidden="true"></i>
              <h3 class="card-title h5">Perfiles Sociales</h3>
              <p class="card-text text-secondary mt-3">
                Visita los perfiles de otros jugadores, descubre sus gustos y compara tu backlog con el resto de la comunidad.
              </p>
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
.brand-icon {
  color: #42b883;
}
.feature-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.feature-card:hover,
.feature-card:focus-within {
  transform: translateY(-5px);
  border-color: #42b883 !important;
}
</style>