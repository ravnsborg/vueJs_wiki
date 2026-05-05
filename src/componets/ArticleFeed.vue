<template>
  <div v-if="keywords" class="ml-1 mb-2">Results for: {{ props.keywords }}</div>

  <div class="max-w-6xl mx-auto space-y-4">
    <div
      class="bg-white rounded-xl shadow-md p-4 border border-gray-300"
      v-for="article in articles"
      :key="article.id"
    >
      <ArticleCard
        v-if="editingId !== article.id"
        :article="article"
        @edit="edit(article)"
        @toggle-favorite="updateFavorite"
      />
      <ArticleEdit v-else :article="article" @edit="edit(article)" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ArticleCard from './ArticleCard.vue'
import ArticleEdit from './ArticleEdit.vue'
import { getArticlesByCategoryId, getArticlesByArticleId, getArticlesByKeyword } from '@/api'

const props = defineProps({ categoryId: Number, articleId: Number, keywords: String })

const articles = ref([])
const editingId = ref(null)

watch(
  () => props.categoryId,
  async (newId) => {
    if (newId === null) return
    try {
      articles.value = await getArticlesByCategoryId(newId)
    } catch (err) {
      console.error('Failed to load categories articles:', err)
    }
  },
)

watch(
  () => props.articleId,
  async (newId) => {
    if (newId === null) return
    try {
      articles.value = await getArticlesByArticleId(newId)
    } catch (err) {
      console.error('Failed to load a favorite article:', err)
    }
  },
)

watch(
  () => props.keywords,
  async (searchTerm) => {
    if (!searchTerm) return
    try {
      articles.value = await getArticlesByKeyword(searchTerm)
    } catch (err) {
      console.error('Failed to load articles by keywords:', err)
    }
  },
)
function updateFavorite(article) {
  article.is_favorite = !article.is_favorite
}

function edit(article) {
  editingId.value = editingId.value === article.id ? null : article.id
}
</script>
