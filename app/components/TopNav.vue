<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white shadow">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-center">
      <span class="flex items-center text-xl font-semibold tracking-tight brand-font cursor-default select-none">
        <span class="text-sky-400">My</span><span class="ml-1" style="color:#fbbf24;">Blog</span>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
// Logo removed per request; using text brand.
</script>

<style scoped>
/* Fallback styles if Tailwind hasn't loaded */
header {
  background: rgba(15, 23, 42, 0.72); /* slate-900 with opacity */
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.4);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  /* Smooth transition for background on scroll if needed */
  transition: background 0.3s;
}
header a { text-decoration: none; color: #fff; }
.brand-font {
  font-family: 'Pacifico', cursive, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif !important;
}
header a:hover { text-decoration: underline; }
/* Layout fallbacks */
header > div {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  /* Remove any top margin or padding to ensure nav is flush with top */
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 


