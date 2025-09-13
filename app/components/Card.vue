<template>
  <div :class="cardClasses" role="group">
    <div v-if="$slots.header" class="px-4 pt-4 pb-2">
      <slot name="header" />
    </div>

    <div :class="contentClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-4 pt-2 pb-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  padded: { type: Boolean, default: true },
  border: { type: Boolean, default: true },
  shadow: { type: Boolean, default: true },
  radius: { type: String, default: 'rounded-lg' },
})

const cardClasses = computed(() => {
  const base = ['bg-white', props.radius]
  if (props.border) base.push('border', 'border-slate-100')
  if (props.shadow) base.push('shadow-sm', 'hover:shadow')
  return [...base, 'overflow-hidden'].join(' ')
})

const contentClasses = computed(() => {
  return props.padded ? 'px-4 py-3' : ''
})
</script>

<style scoped>
/* Minimal accessible focus styling when used interactively */
.card-focus:focus {
  outline: 2px solid rgba(59,130,246,0.6);
  outline-offset: 2px;
}
</style>
