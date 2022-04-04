<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
import NavHeader from './components/NavHeader.vue'
import NavFooter from './components/NavFooter.vue'
import Home from './components/Home.vue'
import Northwind from './components/Northwind.vue'
import Chinook from './components/Chinook.vue'
import Talent from './components/Talent.vue'
import Pricing from './components/Pricing.vue'
import Features from './components/Features.vue'
</script>

<template>
  <Layout>
    <template #home-hero>
      <NavHeader/>
      <Home />
      <Features />
      <Northwind />
      <Chinook />
      <Talent />
      <Pricing />
    </template>
    <template #home-footer>
      <NavFooter />
    </template>
  </Layout>
</template>
