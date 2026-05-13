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
        @edit="openEdit(article)"
        @toggle-favorite="updateFavorite"
      />
      <ArticleEdit v-else :article="article" @edit="closeEdit" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ArticleCard from './ArticleCard.vue'
import ArticleEdit from './ArticleEdit.vue'
import {
  getArticlesByCategoryId,
  getArticlesByArticleId,
  getArticlesByKeyword,
  updateArticle,
} from '@/api'

const props = defineProps({ categoryId: Number, articleId: Number, keywords: String })

const articles = ref([])
const editingId = ref(null)

watch(
  () => props.categoryId,
  async (newId) => {
    if (newId === null) return
    try {
      const { data } = await getArticlesByCategoryId(newId)
      articles.value = data
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
      const { data } = await getArticlesByArticleId(newId)
      articles.value = data
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
      const { data } = await getArticlesByKeyword(searchTerm)
      articles.value = data
    } catch (err) {
      console.error('Failed to load articles by keywords:', err)
    }
  },
)

async function updateFavorite(article) {
  article.is_favorite = !article.is_favorite
  article.category_id = article.category.id

  await updateArticle(article)
}

function openEdit(article) {
  editingId.value = editingId.value === article.id ? null : article.id
}

function closeEdit(updatedArticle = null) {
  if (updatedArticle?.id) {
    const index = articles.value.findIndex((a) => a.id === updatedArticle.id)
    if (index !== -1) articles.value.splice(index, 1, updatedArticle)
  }
  editingId.value = null
}
</script>
