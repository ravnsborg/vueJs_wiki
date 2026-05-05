<template>
  <div>
    <input
      ref="searchInput"
      type="text"
      class="pl-2 pr-2 shadow-md border border-gray-500 rounded-md min-w-80"
      placeholder="Search..."
      @keyup.enter="keywordSearch($event.target.value)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'

const keywordSearch = inject('keywordSearch')
const searchInput = ref(null)

onMounted(() => {
  searchInput.value.focus()
})
</script>
