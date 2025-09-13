<template>
  <!-- Page content container -->
  <div class="px-6 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">

      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Latest Posts</h1>
      </div>

    <!-- Loading -->
    <div v-if="pending" class="space-y-4">
      <PostSkeleton v-for="n in 6" :key="n" />
    </div>

    <div v-else-if="error" class="text-red-600 text-center">Failed to load posts.</div>

    <div v-else>
      <div v-if="!posts.length" class="text-slate-500 text-center">No posts available.</div>

      <!-- Bulleted list for first 4 posts using BlogPosts wrapper -->
      <div v-else class="w-full flex justify-center">
        <div class="w-full max-w-4xl">
          <BlogPosts :posts="normalizedPosts">
            <template #item="{ post }">
              <!-- PostCard expects `content` field; normalizedPosts supplies it -->
              <PostCard :post="post" />
            </template>
          </BlogPosts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

// BlogPost not used here; PostCard will be used inside BlogPosts

interface RawPost { id: number; title: string; body: string; reactions?: number | any; tags?: string[] }
interface PostsResponse { posts: RawPost[] }
// local shape matching PostCard expected props
interface PostCardData { id: number; title: string; content: string; tags?: string[]; reactions?: number | any }
const { data, pending, error } = await useFetch<PostsResponse>('https://dummyjson.com/posts?limit=18')

const posts = computed<RawPost[]>(() => data.value?.posts || [])
const visiblePosts = computed(() => posts.value.slice(0, 4))
const normalize = (p: RawPost) => ({ id: p.id, title: p.title, content: p.body, reactions: p.reactions, tags: p.tags })
const normalizedPosts = computed<PostCardData[]>(() => visiblePosts.value.map(p => {
  const n = normalize(p)
  return {
    id: n.id,
    title: n.title,
    content: (n.content ?? '') as string,
    tags: n.tags,
    reactions: n.reactions,
  }
}))

function getLikes(p: any) {
  if (typeof p.reactions === 'number') return p.reactions
  if (p.reactions && typeof p.reactions === 'object') return p.reactions.likes ?? 0
  return 0
}

function getDislikes(p: any) {
  if (p.reactions && typeof p.reactions === 'object') return p.reactions.dislikes ?? 0
  return 0
}
</script>

