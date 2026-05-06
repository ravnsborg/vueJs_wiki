<script setup>
import { ref, provide } from 'vue'
import SiteHeader from './componets/SiteHeader.vue'
import ArticleFeed from './componets/ArticleFeed.vue'
import CategoryCard from './componets/CategoryCard.vue'
import FavoriteCard from './componets/FavoriteCard.vue'

const selectedCategoryId = ref(null)
const selectedArticleId = ref(null)
const keywords = ref('')

import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()

authStore.setUser()

provide('keywordSearch', getSearchResultsByKeyword)
function getSearchResultsByKeyword(keyword) {
  keywords.value = keyword
}

function getSelectedCategoryId(id) {
  selectedCategoryId.value = id
}

function getSelectedArticleId(id) {
  selectedArticleId.value = id
}
</script>

<template>
  <div class="bg-gray-200 h-screen">
    <SiteHeader />

    <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
      <aside class="w-65 p-4 pt-6 flex flex-col gap-4 dark-secondary">
        <Suspense><CategoryCard @categoryId="getSelectedCategoryId" /></Suspense>
        <Suspense><FavoriteCard @articleId="getSelectedArticleId" /></Suspense>
      </aside>

      <main class="flex-1 overflow-y-auto p-6">
        <ArticleFeed
          :categoryId="selectedCategoryId"
          :articleId="selectedArticleId"
          :keywords="keywords"
        />
      </main>
    </div>
  </div>
</template>
