<template>
  <div
    class="bg-gray-200 shadow-md border border-gray-300 rounded-lg p-2 flex flex-col overflow-hidden"
  >
    <div class="flex flex-none mb-2 border-b">
      <h2 class="text-md text-gray-900">Favorites</h2>
      <i class="fa-solid fa-plus ml-auto">
        <Plus class="w-5 h-5 text-gray-500" />
      </i>
    </div>

    <div v-for="favorite in favorites" :key="favorite.id">
      <span class="text-sm hover:text-lg transition-all" @click="$emit('articleId', favorite.id)">{{
        favorite.title
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { getFavorites } from '@/api'
defineEmits(['articleId'])

const favorites = ref(await getFavorites())
</script>
