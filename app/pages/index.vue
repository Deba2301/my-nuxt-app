<template>
  <!-- Page content container (hero removed per request) -->
  <div class="px-6 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">

      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight latest-posts-heading">Latest Posts</h1>
      </div>

    <!-- Loading -->
    <div v-if="pending" class="space-y-4">
      <PostSkeleton v-for="n in 6" :key="n" />
    </div>

    <div v-else-if="error" class="text-red-600 text-center">Failed to load posts.</div>

    <div v-else>
      <div class="w-full flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <PostCard v-for="p in normalizedPosts" :key="p.id" :post="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import PostCard from '~/components/PostCard.vue'

interface RawPost { id: number; title: string; body: string; reactions?: number | any; tags?: string[] }
interface PostsResponse { posts: RawPost[] }
// local shape matching PostCard expected props
interface PostCardData { id: number; title: string; content: string; tags?: string[]; reactions?: number | any }
const { data, pending, error } = await useFetch<PostsResponse>('https://dummyjson.com/posts?limit=18')

const posts = computed<RawPost[]>(() => data.value?.posts || [])
// Limit to first 4 as before; adjust if you want more rows
const visiblePosts = computed(() => posts.value.slice(0, 4))
const normalize = (p: RawPost) => ({ id: p.id, title: p.title, content: p.body, reactions: p.reactions, tags: p.tags })
const normalizedPosts = computed<PostCardData[]>(() => visiblePosts.value.map(p => {
  const n = normalize(p)
  return {
    id: n.id,
    title: n.title,
    content: (n.content ?? '') as string,
    // Remove tags and reactions from index page
  }
}))
</script>

<style scoped>
.latest-posts-heading {
  color: #1e293b; /* slate-800, a dark color for strong contrast */
}
</style>

<style scoped>
/* Fallback styles if Tailwind isn't active */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: 1fr; }
@media (min-width: 640px) { /* sm */
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.gap-6 { gap: 1.5rem; }
.max-w-4xl { max-width: 56rem; }
.w-full { width: 100%; }
.flex { display: flex; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.mb-8 { margin-bottom: 2rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.latest-posts-heading {
  font-family: 'Oswald', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif !important;
  font-weight: 700;
}
</style>

