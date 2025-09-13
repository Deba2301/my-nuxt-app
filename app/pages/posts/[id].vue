<template>
  <div class="px-4 py-10 max-w-3xl mx-auto">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center text-sm text-blue-900 hover:underline mb-6 font-medium"
      >
        ← Back
      </NuxtLink>

      <!-- Loading state -->
      <div v-if="pending" class="space-y-4 animate-pulse">
        <div class="h-10 bg-slate-200 rounded w-4/5"></div>
        <div class="h-4 bg-slate-200 rounded w-full"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6"></div>
        <div class="h-4 bg-slate-200 rounded w-4/6"></div>
        <div class="h-64 bg-slate-200 rounded"></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="text-red-600 font-semibold bg-red-50 p-4 rounded-lg border border-red-200"
      >
        Failed to load post.
      </div>

      <!-- Post with animation -->
      <article
        v-if="p"
        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition animate-fade-in"
      >
          <header>
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-800 mb-4">
              {{ p.title }}
            </h1>

            <!-- Tags -->
            <div class="mb-6" v-if="p.tags?.length">
              <strong class="block mb-2 text-slate-600">Tags:</strong>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in p.tags"
                  :key="t"
                  class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium"
                >
                  #{{ t }}
                </span>
              </div>
            </div>
          </header>

          <!-- Body -->
          <div class="prose max-w-none text-slate-700 leading-relaxed text-lg">
            <p class="whitespace-pre-line">{{ p.body }}</p>
          </div>

          <!-- Footer -->
          <footer class="mt-8 text-sm text-slate-600 flex items-center gap-6 border-t pt-4">
            <span v-if="typeof p.reactions === 'number'" class="inline-flex items-center gap-1">
              👍 {{ getLikes(p) }}
            </span>
            <span
              v-else-if="p.reactions && typeof p.reactions === 'object'"
              class="inline-flex items-center gap-6"
            >
              <span class="inline-flex items-center gap-1">👍 {{ getLikes(p) }}</span>
              <span class="inline-flex items-center gap-1">👎 {{ getDislikes(p) }}</span>
            </span>
          </footer>
        </article>
      
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

interface Post { id: number; title: string; body: string; tags?: string[]; reactions?: number | { likes?: number, dislikes?: number } }

const route = useRoute()
const { data: post, pending, error } = await useFetch<Post>(
  `https://dummyjson.com/posts/${route.params.id}`,
  { key: `post-${route.params.id}` }
)

const p = computed(() => post.value)

function getLikes(post: any) {
  if (typeof post.reactions === 'number') return post.reactions
  if (post.reactions && typeof post.reactions === 'object') return post.reactions.likes ?? 0
  return 0
}

function getDislikes(post: any) {
  if (post.reactions && typeof post.reactions === 'object') return post.reactions.dislikes ?? 0
  return 0
}
</script>

<style scoped>
.prose p {
  margin-bottom: 1em;
}
</style>
