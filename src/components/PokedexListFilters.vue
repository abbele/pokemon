<script setup lang="ts">
import InputText from 'primevue/inputtext'

const { name } = defineProps(['name'])
const emit = defineEmits(['update:name'])
</script>

<template>
  <div>
    <InputText
      type="text"
      :value="name"
      @input="emit('update:name', 'name', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style></style>
