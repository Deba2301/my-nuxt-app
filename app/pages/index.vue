<template>
  <!-- Simple layout with proper centering -->
  <div class="page-container">
    
    <!-- Latest Posts heading centered above cards -->
    <div class="w-full text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight latest-posts-heading">Latest Posts</h1>
    </div>
    
    <!-- Posts section centered -->
    <div class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Loading -->
      <div v-if="pending" class="posts-grid-local">
        <div v-for="n in 4" :key="n" class="bg-gray-200 animate-pulse rounded-lg h-48"></div>
      </div>

      <div v-else-if="error" class="text-red-600 text-center">Failed to load posts.</div>

      <!-- Posts grid -->
      <div v-else class="posts-grid-local">
        <PostCard v-for="p in normalizedPosts" :key="p.id" :post="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCard from '~/components/PostCard.vue'
import { computed } from 'vue'

interface PostCardData {
  id: number
  title: string
  content: string
}

interface RawPost { id: number; title: string; body: string }
interface PostsResponse { posts: RawPost[] }

const { data, pending, error } = await useFetch<PostsResponse>('/api/posts')

const normalizedPosts = computed<PostCardData[]>(() => {
  return (data.value?.posts || []).slice(0, 4).map(post => ({
    id: post.id,
    title: post.title,
    content: post.body,
  }))
})
</script>

<style scoped>
/* Simple page layout */
.page-container {
  padding-top: 6rem; /* Account for fixed nav */
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
}

/* Posts grid styling */
.posts-grid-local {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* Latest Posts heading */
.latest-posts-heading {
  color: #1e293b; /* slate-800, a dark color for strong contrast */
  font-family: 'Oswald', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif !important;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .posts-grid-local {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .page-container {
    padding-top: 5rem;
  }
}
</style>

