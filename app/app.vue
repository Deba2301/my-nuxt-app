<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Pacifico&family=Oswald:wght@700&display=swap');
</style>
/* Pacifico for MyBlog brand */
.brand-font {
  font-family: 'Pacifico', cursive, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
/* Oswald for Latest Posts heading */
.latest-posts-heading {
  font-family: 'Oswald', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
/* Montserrat for Latest Posts heading and section */
.latest-posts-heading, .latest-posts-section {
  font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
<template>
  <div style="min-height:100vh; background: url('/photo/illustrationjpg.jpg') center center / cover no-repeat fixed;">
    <TopNav />

    <main class="min-h-screen bg-transparent px-6 sm:px-8 lg:px-12">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopNav from '~/components/TopNav.vue'
</script>

<style>
html, body, #__nuxt {
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
body {
  min-height: 100vh;
  background: none;
}
</style>



