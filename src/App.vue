<script setup>
</script>

<template>
  <a href="#main-content" class="visually-hidden-focusable">Saltar al contenido principal</a>

  <div class="site-wrapper">

    <RouterView />
  </div>
</template>

<style>
.site-wrapper {
  min-height: 100vh;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
}

.site-wrapper main {
  flex: 1;
}
</style>
