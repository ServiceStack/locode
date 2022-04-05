<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
import NavHeader from './components/NavHeader.vue'
import NavFooter from './components/NavFooter.vue'
import Home from './components/Home.vue'
</script>

<template>
  <Layout>
    <template #home-hero>
      <NavHeader/>
      <Home />
    </template>
    <template #home-footer>
      <NavFooter />
    </template>
  </Layout>
</template>
