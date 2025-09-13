<template>
  <div class="bg-white rounded-md border border-slate-100 p-3">
    <h3 class="text-base font-semibold text-slate-800 mb-1">
      <NuxtLink :to="`/posts/${post.id}`" class="hover:underline">{{ post.title }}</NuxtLink>
    </h3>
    <div class="text-xs text-slate-600">
      <div v-if="post.tags?.length" class="mb-2">
        <strong class="mr-2 text-slate-700">Tags:</strong>
        <span class="inline-flex gap-2 flex-wrap">
          <span v-for="t in post.tags.slice(0,5)" :key="t" class="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{{ t }}</span>
        </span>
      </div>
      <div>
        <strong class="mr-2 text-slate-700">Reactions:</strong>
        <span>
          <template v-if="typeof post.reactions === 'number'">👍 {{ getLikes(post) }}</template>
          <template v-else-if="post.reactions && typeof post.reactions === 'object'">👍 {{ getLikes(post) }} <span class="ml-4">👎 {{ getDislikes(post) }}</span></template>
          <template v-else>👍 0</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post { id: number; title: string; body?: string; tags?: string[]; reactions?: number | { likes?: number; dislikes?: number } }
const props = defineProps<{ post: Post }>()

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
