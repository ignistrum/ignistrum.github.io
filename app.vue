<script setup lang="ts">
useHead({
  titleTemplate: (chunk) => {
    return !chunk || chunk === 'Enderman' ? 'Enderman' : `${chunk} – Enderman`
  },
})
</script>

<template>
  <div
    id="ender-layout"
    class="d-flex flex-column align-items-center pt-sm-5 h-100"
  >
    <Transition name="page">
      <Card />
    </Transition>
  </div>

  <Portal
    layout="#ender-layout"
    directory="/images/portal"
    animate
    randomize
    fade
  />
  <Footer />
</template>

<style></style>
