<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&family=Pacifico&family=Oswald:wght@600;700&display=swap');

/* Typography utility classes */
.brand-font { font-family: 'Pacifico', cursive, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
.latest-posts-heading { font-family: 'Oswald', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }

/* Layout helpers */
.app-bg {
  min-height: 100vh;
  background: url('/photo/illustrationjpg.jpg') center center / cover no-repeat fixed;
}
.content-shell {
  padding: 2.5rem clamp(1rem,3vw,2.5rem);
  margin-top: 5rem; /* push below nav */
  margin-bottom: 3rem;
}

@media (max-width: 640px) {
  .content-shell { padding: 1.5rem 1.25rem; margin-top: 5.5rem; }
}

html, body, #__nuxt { height: 100%; min-height: 100vh; margin:0; padding:0; }
body { background: none; }
</style>
<template>
  <div class="app-bg">
    <TopNav />
    <main class="px-6 sm:px-8 lg:px-12">
      <div class="content-shell">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TopNav from '~/components/TopNav.vue'
</script>



