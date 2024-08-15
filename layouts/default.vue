<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter class="fixed bottom-0 w-full" />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
