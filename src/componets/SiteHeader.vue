<script setup>
import { inject } from 'vue'
import ArticleSearch from './ArticleSearch.vue'
import LinkDropdown from './LinkDropdown.vue'
import EntityDropdown from './EntityDropdown.vue'
import { Plus } from 'lucide-vue-next'
import { getEntityStorage, userLogout } from '@/store/auth'

const entityName = getEntityStorage()?.title
const openNewArticle = inject('openNewArticle')
</script>

<template>
  <header class="bg-blue-100 dark-primary w-full light-primary p-4 shadow-lg">
    <div class="flex items-center justify-between px-5">
      <!-- Logo/Title -->
      <h1 class="text-2xl font-bold">{{ entityName }} Wiki</h1>

      <!-- Search - Centered -->
      <div class="flex-1 flex justify-center mx-8">
        <ArticleSearch />
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-4">
        <button
          @click="openNewArticle()"
          class="cursor-pointer inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-400"
        >
          <Plus class="w-4 h-5 text-white-500" />New Article
        </button>

        <LinkDropdown />
        <EntityDropdown />
        <button
          class="inline-flex justify-center px-3 py-2 text-md underline text-black cursor-pointer"
          @click="userLogout()"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
