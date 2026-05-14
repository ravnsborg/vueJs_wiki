<template>
  <div class="relative mb-1">
    <h3 class="text-xl text-gray-900">{{ article.title }}</h3>
    <span class="absolute right-0 top-0 text-sm flex"
      ><Star
        class="w-5 h-5 cursor-pointer transition hover:text-yellow-500"
        :class="article.is_favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
        @click="$emit('toggleFavorite', article)"
      />
      <SquarePen
        class="ml-6 w-5 h-5 cursor-pointer transition hover:text-green-500"
        @click="$emit('edit', article)"
      />
      <Trash
        class="ml-6 w-5 h-5 cursor-pointer transition hover:text-red-500 transition"
        @click="$emit('delete', article)"
      />
    </span>
    <div class="flex justify-between mb-4 mt-2 text-sm">
      <span>Category: {{ article.category.title }}</span>
      <span v-if="article.updated_at" class="text-blue-400">
        Updated: {{ formatDate(article.updated_at) }}
      </span>
    </div>
    <div class="p-3 bg-blue-100 text-sm rounded-md shadow-md whitespace-pre-line">
      {{ article.body }}
    </div>
  </div>
</template>

<script setup>
import { Star, SquarePen, Trash } from 'lucide-vue-next'
import { formatDate } from '@/utils/date'
defineProps(['article'])
defineEmits(['edit', 'delete', 'toggleFavorite'])
</script>
