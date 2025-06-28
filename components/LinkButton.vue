<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  external: Boolean,
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Link',
  },
})
</script>

<template>
  <NuxtLink
    class="link d-flex flex-row align-items-center gap-2 user-select-none no-decoration"
    active-class="icon-active px-sm-3"
    :to="!props.external ? props.path : undefined"
    :href="props.external ? props.path : undefined"
  >
    <img
      class="icon-image"
      draggable="false"
      :src="props.icon"
      :alt="props.alt"
    />
    <span class="display-xs-none">
      <strong>
        {{ props.name }}
      </strong>
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.icon {
  &-active {
    transform: translate(2px, 2px) rotate3d(1, 1, 1, 5deg) scale(1.25);
  }

  &-image {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
