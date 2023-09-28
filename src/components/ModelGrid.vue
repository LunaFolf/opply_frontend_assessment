<script setup lang="ts">
defineProps<{
  data: any[],
  schema: string[]
}>()
</script>

<template>
  <div class="grid">
    <div class="item header">
      <div @click.stop="$emit('touch', { type: 'sort', fieldName })" v-for="fieldName in schema" :key="fieldName" :class="`item__sort__${fieldName}`">
        {{ fieldName }}
      </div>
    </div>

    <div @click="$emit('touch', { type: 'item', item })" class="item" v-for="item in data" :key="item">
      <div @click.stop="$emit('touch', { type: 'field', item, fieldName })" v-for="fieldName in schema" :key="fieldName" :class="`item__${fieldName}`">
        {{ item[fieldName] || 'ass' }}
      </div>
    </div>
  </div>
</template>

<style>
.grid {
  display: grid;
  width: 100%;
  max-width: 100%;
  gap: .5rem;
}

.item {
  display: grid;
  gap: .5rem;
  justify-content: space-around;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(v-bind('schema.length'), minmax(10rem, 1fr));
  background-color: var(--color-background-soft);
  padding: 1rem .25rem;
  border-radius: .25rem;
}

.item.header {
  padding: .25rem  .25rem;
  font-weight: bolder;
  background-color: var(--color-background-mute);
}
</style>