<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="float user-select-none mb-2 animate__animated animate__delay-1s animate__fadeInUpBig animate__slow text-align-center line-height-1-5"
  >
    <span class="transpaque font-small text-shadow">
      © 2018-{{ currentYear }}, <a href="https://enderman.ch">Enderman</a>. All
      rights reserved. • v1.1
    </span>
  </footer>
</template>

<style scoped lang="scss">
.float {
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;

  width: fit-content;
  height: fit-content;

  margin: auto;
}

.transpaque {
  color: white;

  opacity: 0.25;
  transition: ease 0.3s;
}

.transpaque:hover {
  opacity: 1;
}

.line-height-1-5 {
  line-height: 14px * 1.5;
}

.text-shadow {
  text-shadow: black 0 2px 5px;
}
</style>
