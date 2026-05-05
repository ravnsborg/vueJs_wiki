<template>
  <div class="max-w-5xl mx-auto">
    <div v-if="success" class="mb-4 p-3 text-green-700 bg-green-100 rounded">
      {{ success }}
    </div>

    <form @submit.prevent="save" class="space-y-5">
      <div>
        <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="category_id"
          id="category_id"
          class="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Article title</label>
        <input
          v-model="title"
          id="title"
          type="text"
          class="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title[0] }}</span>
      </div>

      <div>
        <label for="body" class="block text-sm font-medium text-gray-700">Article body</label>
        <textarea
          v-model="body"
          id="body"
          rows="10"
          class="mt-1 p-3 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <span v-if="errors.body" class="text-red-500 text-sm">{{ errors.body[0] }}</span>
      </div>

      <div class="flex justify-between">
        <div class="ml-auto">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-8 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-900 mr-5"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Article
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '@/api'

const categories = ref([])
onMounted(async () => {
  categories.value = await getCategories()
})
const props = defineProps(['article'])

const category_id = ref(props.article?.category_id ?? '')
const title = ref(props.article?.title ?? '')
const body = ref(props.article?.body ?? '')
const success = ref(null)
const errors = ref({})

console.log('.............')
console.log(props.article)
async function save() {
  errors.value = {}
  try {
    // replace with your API call
    await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category_id: category_id.value,
        title: title.value,
        body: body.value,
      }),
    })
    success.value = 'Article saved successfully.'
  } catch (err) {
    errors.value = err.response?.data?.errors ?? {}
  }
}
</script>
