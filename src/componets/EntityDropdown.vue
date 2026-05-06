<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm text-white inset-ring-1 inset-ring-white/5 hover:bg-blue-400"
    >
      Entities
      <ChevronDownIcon class="-mr-1 size-5" aria-hidden="true" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-blue-400 outline-1 -outline-offset-1 outline-black/10"
      >
        <div class="py-1">
          <MenuItem v-for="entity in entities" :key="entity.id" v-slot="{ active }">
            <a
              href="#"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 outline-hidden dark:bg-white/5 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300',
                'flex items-center justify-between px-4 py-2 text-sm',
              ]"
            >
              <span>{{ entity.title }}</span>
              <CheckIcon v-if="entityId === entity.id" class="h-6 text-red-600" />
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEntities } from '@/api'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

const entityId = ref(JSON.parse(localStorage.getItem('userTestKmr')).preferred_entity_id)

const entities = ref([])

onMounted(async () => {
  const { data } = await getEntities()
  entities.value = data
})
</script>
