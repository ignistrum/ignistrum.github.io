<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Logo',
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  title: {
    type: String,
    default: 'Title',
  },
  description: {
    type: String,
    default: 'Description',
  },
})
</script>

<template>
  <NuxtLink class="no-decoration user-select-none" to="/">
    <div
      class="logo d-flex flex-row align-items-center justify-content-sm-center"
    >
      <img
        class="logo-image"
        draggable="false"
        :width="props.width"
        :height="props.height"
        :src="props.src"
        :alt="props.alt"
      />
      <div>
        <h1 class="alex mb-0">{{ props.title }}</h1>
        <Separator />
        <p class="mb-0">{{ props.description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.logo {
  > img.logo-image {
    transition: ease 0.3s;
  }

  &:hover {
    > img.logo-image {
      transform: scale(105%);
    }
  }
}
</style>
