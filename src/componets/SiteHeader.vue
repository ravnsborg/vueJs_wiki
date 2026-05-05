<script setup>
import ArticleSearch from './ArticleSearch.vue'
import LinkDropdown from './LinkDropdown.vue'
import EntityDropdown from './EntityDropdown.vue'
</script>

<template>
  <header class="bg-blue-100 dark-primary w-full light-primary p-4 shadow-lg">
    <div class="flex items-center justify-between px-5">
      <!-- Logo/Title -->
      <h1 class="text-2xl font-bold">Wiki Title</h1>

      <!-- Search - Centered -->
      <div class="flex-1 flex justify-center mx-8">
        <ArticleSearch />
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-4">
        <button
          class="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-400"
        >
          <i class="fa-solid fa-plus"></i> Create New Article
        </button>

        <LinkDropdown />
        <EntityDropdown />
      </div>
    </div>
  </header>
</template>
