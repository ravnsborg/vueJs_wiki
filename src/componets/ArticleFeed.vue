<template>
  <div v-if="keywords" class="ml-1 mb-2">Results for: {{ props.keywords }}</div>

  <div class="max-w-6xl mx-auto space-y-4">
    <ArticleEdit
      v-if="showNewForm"
      :article="null"
      :showEmptyForm="true"
      @edit="cancelNewArticle"
      class="bg-white rounded-xl shadow-md p-4 border border-gray-300 mb-4"
    />
    <div v-else>
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white rounded-xl shadow-md p-4 border border-gray-300 mb-4"
      >
        <ArticleCard
          v-if="editingId !== article.id"
          :article="article"
          @edit="openEdit(article)"
          @delete="deleteArticleRec(article)"
          @toggle-favorite="updateFavorite"
        />
        <ArticleEdit v-else :article="article" :showEmptyForm="false" @edit="closeEdit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import ArticleCard from './ArticleCard.vue'
import ArticleEdit from './ArticleEdit.vue'
import {
  getArticlesByCategoryId,
  getArticlesByArticleId,
  getArticlesByKeyword,
  deleteArticle,
  patchArticle,
} from '@/api'

const props = defineProps({
  categoryId: Number,
  articleId: Number,
  keywords: String,
  showArticleForm: Number,
})

const articles = ref([])
const editingId = ref(null)
const showNewForm = ref(false)

function cancelNewArticle() {
  showNewForm.value = false
}

watch(
  () => props.showArticleForm,
  () => {
    showNewForm.value = true
    editingId.value = null
  },
)

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

const updateFavoritesList = inject('updateFavoritesList')

async function updateFavorite(article) {
  article.is_favorite = !article.is_favorite

  const data = { is_favorite: article.is_favorite }
  await patchArticle(article.id, data)

  //pass a new article object with same properties to allow toggling to properly function
  updateFavoritesList({ ...article })
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

async function deleteArticleRec(article) {
  if (confirm('Delete Article?') === true) {
    await deleteArticle(article.id)
    articles.value = articles.value.filter((item) => item.id !== article.id)
  }
}
</script>
