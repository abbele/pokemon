<template>
  <div class="container ml-auto mr-auto">
    <slot></slot>
  </div>
</template>

<style scoped>
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
