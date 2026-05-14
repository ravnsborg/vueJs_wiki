<template>
  <div
    class="bg-gray-200 shadow-md border border-gray-300 rounded-lg p-2 flex flex-col overflow-hidden"
  >
    <div class="flex flex-none mb-2 border-b">
      <h2 class="text-md text-gray-900">Categories</h2>
      <Plus
        @click="showAddCategoryForm = !showAddCategoryForm"
        class="w-5 h-5 text-gray-500 fa-solid fa-plus ml-auto"
      />
    </div>

    <div v-if="showAddCategoryForm" class="m-1" @click.stop>
      <input
        type="text"
        v-model="newTitle"
        placeholder="Add new Entity"
        class="border border-gray-300 bg-white block w-full"
        @keyup.enter="addNewCategory"
        @keydown.stop
      />
    </div>

    <div v-for="category in categories" :key="category.id">
      <span
        class="text-sm hover:text-lg transition-all cursor-pointer"
        @click="$emit('category-id', category.id)"
        >{{ category.title }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { getCategories, newCategory } from '@/api'

const showAddCategoryForm = ref(false)
const categories = ref([])
const newTitle = ref('')

defineEmits(['category-id'])

onMounted(async () => {
  const { data } = await getCategories()
  categories.value = data ?? []
})

async function addNewCategory() {
  const { data } = await newCategory({ title: newTitle.value })
  categories.value.push(data.category)
  showAddCategoryForm.value = false
}
</script>
