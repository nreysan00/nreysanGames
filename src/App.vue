<script setup>
import AppHeader         from './components/AppHeader.vue';
import HeroSection       from './components/HeroSection.vue';
import CategoriesSection from './components/CategoriesSection.vue';
import GamesGrid         from './components/GamesGrid.vue';
import SpecialOfferBanner from './components/SpecialOfferBanner.vue';
import AppFooter         from './components/AppFooter.vue';
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
