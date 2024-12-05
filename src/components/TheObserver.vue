<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['intersection-change', 'enter-viewport', 'leave-viewport'])

const observedElement = ref(null)
const isIntersecting = ref(false)
const intersectionRatio = ref(0)

let wasIntersecting = false
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isIntersecting.value = entry.isIntersecting
      intersectionRatio.value = entry.intersectionRatio

      emit('intersection-change', {
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
      })

      if (entry.isIntersecting && !wasIntersecting) {
        emit('enter-viewport')
      } else if (!entry.isIntersecting && wasIntersecting) {
        emit('leave-viewport')
      }

      wasIntersecting = entry.isIntersecting
    })
  })

  if (observedElement.value) {
    observer.observe(observedElement.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="observedElement"></div>
</template>
