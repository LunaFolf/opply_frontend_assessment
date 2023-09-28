<script setup lang="ts">
defineProps<{
  data: any[],
  schema: string[]
}>()
</script>

<template>
  <div class="grid">
    <div @click="$emit('click-item', { item })" class="item" v-for="item in data" :key="item">
      <div @click.stop="$emit('click-field', { item, fieldName })" v-for="fieldName in schema" :key="fieldName" :class="`item__${fieldName}`">
        {{ item[fieldName] }}
      </div>
    </div>
  </div>
</template>

<style>
.grid {
  display: grid;
  width: 100%;
  gap: .5rem;
}

.item {
  display: grid;
  gap: .5rem;
  justify-content: space-around;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, max-content);
  background-color: var(--color-background-mute);
  padding: 1rem .25rem;
  border-radius: .25rem;
}
</style>