<template>
  <article class="ted-card">
    <!-- Title & Content -->
    <div>
      <h2 class="ted-title line-clamp-2">
        {{ post.title }}
      </h2>
      <p class="ted-excerpt line-clamp-3">
        {{ excerpt }}
      </p>
    </div>

    <!-- Read Button -->
    <div class="ted-read-btn">
      <NuxtLink
        :to="`/posts/${post.id}`"
        class="ted-read-link"
      >
        Read more
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
.ted-card {
  background: #111;
  color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 1.5rem 1.5rem 1rem 1.25rem;
  border-left: 6px solid #e62b1e; /* TED red */
  margin-bottom: 1.5rem;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ted-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
  line-height: 1.2;
}
.ted-excerpt {
  font-size: 0.98rem;
  color: #e5e5e5;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}
.ted-read-btn {
  text-align: left;
}
.ted-read-link {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border: 2px solid #fff;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
.ted-read-link:hover {
  background: #fff;
  color: #e62b1e;
  border-color: #e62b1e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255,255,255,0.3);
}
/* Keep only line-clamp fallback if Tailwind line-clamp plugin is not enabled */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
