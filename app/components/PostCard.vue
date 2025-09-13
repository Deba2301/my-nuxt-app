<template>
  <article
    class="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition"
  >
    <!-- Title & Content -->
    <div>
      <h2 class="text-lg font-medium mb-1 text-slate-800 line-clamp-2">
        {{ post.title }}
      </h2>
      <p class="text-xs text-slate-600 line-clamp-3">
        {{ excerpt }}
      </p>
    </div>

    <!-- Read Button -->
    <div class="mt-3 text-left">
      <NuxtLink
        :to="`/posts/${post.id}`"
        class="inline-block text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Read
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ReactionObj {
  likes?: number
  dislikes?: number
}
interface PostCardData {
  id: number
  title: string
  content: string
  tags?: string[]
  reactions?: number | ReactionObj
}


const props = defineProps<{ post: PostCardData }>()

const excerpt = computed(() =>
  props.post.content.length > 140
    ? props.post.content.slice(0, 140) + '…'
    : props.post.content
)


</script>

<style scoped>
/* Keep only line-clamp fallback if Tailwind line-clamp plugin is not enabled */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
