<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import { Dialog } from 'primevue'

const modal = useModalStore()
</script>

<template>
  <Dialog v-model:visible="modal.state.open" modal :style="{ width: '25rem' }" :closable="false">
    <Component
      :is="modal.state.component"
      v-bind="modal.state.componentProps"
      @close="modal.close"
    />
  </Dialog>
</template>

<style scoped></style>
