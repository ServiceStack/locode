<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
import NavHeader from './components/NavHeader.vue'
import NavFooter from './components/NavFooter.vue'
import Home from './components/Home.vue'

import { watch } from 'vue'
import { useRouter } from 'vitepress'
const router = useRouter()

// Only run this on the client. Not during build.
if (typeof window !== 'undefined' && window.ga) {
  watch(() => router.route.data.relativePath, (path) => {
    ga('send', 'pageview', path);
  }, { immediate: true });
}
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

