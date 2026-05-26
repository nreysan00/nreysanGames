<script setup>
import AppHeader from '../components/AppHeaderHome.vue';
import AppFooter from '../components/AppFooter.vue';
import HeroSection from '../components/HeroSection.vue';
import CategoriesSection from '../components/CategoriesSection.vue';
import GamesGrid from '../components/GamesGrid.vue';
import SpecialOfferBanner from '../components/SpecialOfferBanner.vue';
</script>

<template>
    <div class="site-wrapper">
      <AppHeader />
      <HeroSection />
      <CategoriesSection />
      <GamesGrid />
      <SpecialOfferBanner />
      <AppFooter />
  </div>
</template>