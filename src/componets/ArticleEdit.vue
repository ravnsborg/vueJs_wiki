<template>
  <div class="relative mb-1">
    <form @submit.prevent="save" class="space-y-5">
      <input
        v-model="form.title"
        class="w-full text-xl text-gray-900 border border-gray-300 rounded-md px-2 py-1 mb-2"
      />

      <div class="flex justify-between mb-4 mt-2 text-sm">
        <select
          v-model="form.category_id"
          class="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
      </div>

      <textarea
        v-model="form.body"
        rows="6"
        class="w-full p-3 text-sm rounded-md shadow-md border border-gray-300"
      />

      <div class="flex justify-between">
        <div class="ml-auto">
          <button
            type="button"
            @click="$emit('edit')"
            class="px-8 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-900 mr-5"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            @click="$emit('save', form)"
            class="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ isSubmitting ? 'Sending...' : 'Save Article' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCategories, updateArticle } from '@/api'

const isSubmitting = ref(false)

const categories = ref([])

onMounted(async () => {
  categories.value = await getCategories()

  const { data } = await getCategories(form)
  categories.value = data
})

const props = defineProps(['article'])
const emit = defineEmits(['edit'])

const form = reactive({
  id: props.article.id,
  title: props.article.title,
  body: props.article.body,
  category_id: props.article.category.id,
})

async function save() {
  isSubmitting.value = true
  console.log(JSON.stringify(form))

  const { status, data } = await updateArticle(form)
  if (status === 201) {
    console.log('success')
  }
  isSubmitting.value = false
  emit('edit', data.article)
}
</script>
