<template>
  <div>
    <slot name="header" />

    <ul class="list-disc pl-6 space-y-4">
      <!-- If posts prop provided, render them; otherwise render default slot with v-for via provided scope -->
      <template v-if="posts && posts.length">
        <li v-for="p in posts" :key="p.id" class="list-item pl-0">
          <slot name="item" :post="p">
            <!-- fallback rendering if no item slot provided -->
            <component :is="FallbackItem" :post="p" />
          </slot>
          <span v-if="p.reactions !== undefined" class="ml-2 flex items-center gap-2 text-base">
            <span v-if="typeof p.reactions === 'number'">
              👍 {{ p.reactions }}
            </span>
            <span v-else>
              👍 {{ p.reactions.likes ?? 0 }}
              <span class="ml-2">👎 {{ p.reactions.dislikes ?? 0 }}</span>
            </span>
          </span>
        </li>
      </template>
      <template v-else>
        <slot />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import FallbackItem from '~/components/PostCard.vue'

// PostType expects `content` string so it matches PostCard prop requirements
interface PostType { id: number; title: string; content: string; tags?: string[]; reactions?: any }
const props = defineProps<{ posts?: PostType[] }>()
</script>
