<template>
  <div class="min-h-screen w-full px-4 py-10">
    <div class="post-detail-card">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-block mb-6 px-5 py-2 border-2 border-orange-500 bg-orange-600 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-orange-700 hover:border-orange-600 hover:-translate-y-0.5 hover:shadow-lg"
      >
        ← Back
      </NuxtLink>

      <!-- Loading state -->
      <div v-if="pending" class="space-y-4 animate-pulse">
        <div class="h-10 bg-orange-200 rounded w-4/5"></div>
        <div class="h-4 bg-orange-200 rounded w-full"></div>
        <div class="h-4 bg-orange-200 rounded w-5/6"></div>
        <div class="h-4 bg-orange-200 rounded w-4/6"></div>
        <div class="h-64 bg-orange-200 rounded"></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="text-red-800 font-semibold bg-red-100 p-4 rounded-lg border border-red-300"
      >
        Failed to load post.
      </div>

      <!-- Post with animation -->
      <transition name="fade-slide">
        <article
          v-if="p"
          class="bg-transparent rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <header>
            <h1 class="text-4xl font-extrabold tracking-tight text-amber-900 mb-4">
              {{ p.title }}
            </h1>

            <!-- Tags -->
            <div class="mb-6" v-if="p.tags?.length">
              <strong class="block mb-2 text-amber-700">Tags:</strong>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in p.tags"
                  :key="t"
                  class="px-3 py-1 text-sm rounded-full bg-orange-200 text-orange-800 font-medium border border-orange-300"
                >
                  #{{ t }}
                </span>
              </div>
            </div>
          </header>

          <!-- Body -->
          <div class="prose max-w-none text-amber-800 leading-relaxed text-lg">
            <p class="whitespace-pre-line">{{ p.body }}</p>
          </div>

          <!-- Footer -->
          <footer class="mt-8 text-sm text-amber-600 flex items-center gap-6 border-t border-orange-200 pt-4">
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
      </transition>
    </div>
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

/* Fade + Slide Animation */
.fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Light warm themed card for post detail content */
.post-detail-card {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 88px; /* Space for navbar */
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 30%, #fdba74 100%);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(251, 146, 60, 0.15);
  padding: 2.5rem 2rem;
  color: #92400e;
  border: 2px solid rgba(251, 146, 60, 0.3);
}
</style>
