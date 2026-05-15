<template>
  <div
    class="bg-gray-200 shadow-md border border-gray-300 rounded-lg p-2 flex flex-col overflow-hidden"
  >
    <div class="flex flex-none mb-2 border-b">
      <h2 class="text-md text-gray-900">Favorites</h2>
    </div>

    <div v-for="favorite in favorites" :key="favorite.id">
      <span
        class="text-sm hover:text-lg transition-all cursor-pointer"
        @click="$emit('articleId', favorite.id)"
        >{{ favorite.title }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { getFavorites } from '@/api'
defineEmits(['articleId'])

const favorites = ref([])

const updatedArticle = inject('updatedArticle', null)

if (updatedArticle) {
  watch(updatedArticle, (article) => {
    if (!article) return

    if (!Array.isArray(favorites.value)) {
      favorites.value = []
    }

    const index = favorites.value.findIndex((f) => f.id === article.id)

    if (article.is_favorite) {
      // Add to favorites if not already there
      if (index === -1) {
        favorites.value.push(article)
      } else {
        // Update existing entry in case other fields changed
        favorites.value.splice(index, 1, article)
      }
    } else {
      // Remove from favorites
      if (index !== -1) favorites.value.splice(index, 1)
    }
  })
}
onMounted(async () => {
  const { data } = await getFavorites()
  favorites.value = data ?? []
})
</script>
