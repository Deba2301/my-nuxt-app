<template>
  <NuxtLink :to="`/posts/${post.id}`" class="block group">
    <article class="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
      <h2 class="text-lg font-medium mb-1 text-slate-800 group-hover:text-blue-600 line-clamp-2">{{ post.title }}</h2>
  <p class="text-xs text-slate-600 line-clamp-3 flex-1">{{ excerpt }}</p>
  <p class="text-xs text-slate-400 mt-2 italic">{{ note ?? 'His mother had always taught him' }}</p>
      <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span v-if="post.tags?.length" class="inline-flex gap-2">
          <span v-for="t in post.tags.slice(0,3)" :key="t" class="inline-block bg-slate-100 text-blue-700 px-2 py-0.5 rounded text-xs">#{{ t }}</span>
        </span>
        <span v-if="post.reactions !== undefined" class="ml-auto flex items-center gap-2 text-xs">
          <span v-if="typeof post.reactions === 'number'">
            👍 {{ post.reactions }}
          </span>
          <span v-else>
            👍 {{ post.reactions.likes ?? 0 }}
            <span class="ml-2">👎 {{ post.reactions.dislikes ?? 0 }}</span>
          </span>
        </span>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
interface PostCardData {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  reactions?: number | { likes?: number; dislikes?: number };
}
import { computed } from 'vue'
const props = defineProps<{ post: PostCardData, note?: string }>()
const { note } = props as { note?: string }
const excerpt = computed(() => props.post.content.length > 140 ? props.post.content.slice(0, 140) + '…' : props.post.content)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* standard property for newer browsers / linter compatibility */
  line-clamp: 3;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* standard property for newer browsers / linter compatibility */
  line-clamp: 2;
}
</style>

