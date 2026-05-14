<template>
  <div class="relative mb-1">
    <form @submit.prevent="save" class="space-y-5">
      <span>Title</span>
      <input
        v-model="form.title"
        class="w-full text-xl text-gray-900 border border-gray-300 rounded-md px-2 py-1 mb-2"
        required
      />

      <span>Category</span>
      <div class="flex justify-between mb-4 mt-2 text-sm">
        <select
          v-model="form.category_id"
          class="border border-gray-300 rounded-md px-2 py-1 text-sm"
          required
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
      </div>

      <span>Content</span>
      <textarea
        v-model="form.body"
        required
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
            class="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ isSubmitting ? 'Saving...' : 'Save Article' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCategories, newArticle, updateArticle } from '@/api'

const isSubmitting = ref(false)

const categories = ref([])
onMounted(async () => {
  const { data } = await getCategories()
  categories.value = data

  if (!form.category_id && data.length > 0) {
    //Display first option in dropdown
    form.category_id = data[0].id
  }
})

const props = defineProps(['article', 'showEmptyForm'])
const emit = defineEmits(['edit'])

const form = reactive({
  id: props?.article?.id ?? null,
  title: props?.article?.title ?? '',
  body: props?.article?.body ?? '',
  category_id: props?.article?.category?.id ?? null,
})

async function save() {
  isSubmitting.value = true
  try {
    if (props.showEmptyForm) {
      const { data } = await newArticle(form)
      emit('edit', data.article)
    } else {
      const { data } = await updateArticle(form)
      emit('edit', data.article)
    }
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
