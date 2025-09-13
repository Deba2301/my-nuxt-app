<template>
  <header class="w-full bg-blue-50 text-slate-800 fixed top-0 left-0 z-50 shadow-sm animate-slide-down">
    <div class="relative h-16">
      <div class="absolute inset-0 flex items-center justify-center">
        <NuxtLink to="/" class="inline-flex items-baseline gap-2 text-2xl font-semibold">
          <span class="text-emerald-600">My</span>
          <span class="text-sky-600">Blog</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// navbar is static
</script>
