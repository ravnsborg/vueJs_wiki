<script setup>
import { ref, provide } from 'vue'
import SiteHeader from './SiteHeader.vue'
import ArticleFeed from './ArticleFeed.vue'
import CategoryCard from './CategoryCard.vue'
import FavoriteCard from './FavoriteCard.vue'

const selectedCategoryId = ref(null)
const selectedArticleId = ref(null)
const keywords = ref('')
const showArticleForm = ref(0)

const updatedArticle = ref(null)
provide('updatedArticle', updatedArticle)

// Provide the update function so ArticleFeed can set it
function toggleArticleInFavoritesList(article) {
  updatedArticle.value = article
}
provide('updateFavoritesList', toggleArticleInFavoritesList)

function getSearchResultsByKeyword(keyword) {
  keywords.value = keyword
}
provide('keywordSearch', getSearchResultsByKeyword)

function openNewArticle() {
  showArticleForm.value++
}
provide('openNewArticle', openNewArticle)

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
        <CategoryCard @category-id="getSelectedCategoryId" />
        <FavoriteCard @articleId="getSelectedArticleId" />
      </aside>

      <main class="flex-1 overflow-y-auto p-6">
        <ArticleFeed
          :categoryId="selectedCategoryId"
          :articleId="selectedArticleId"
          :keywords="keywords"
          :showArticleForm="showArticleForm"
        />
      </main>
    </div>
  </div>
</template>
