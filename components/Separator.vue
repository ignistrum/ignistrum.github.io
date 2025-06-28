<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
  height: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <hr
    class="radial-gradient m-0 border-0 w-100"
    :style="{ height: props.height + 'px' }"
  />
</template>

<style scoped lang="scss"></style>
