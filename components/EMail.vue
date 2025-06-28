<script setup lang="ts">
const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  },
  cc: {
    type: String,
    default: '',
  },
  bcc: {
    type: String,
    default: '',
  },
})

const href =
  `mailto:${props.address}` +
  (props.body ? `&body=${props.body}` : '') +
  (props.subject ? `${props.body ? '&' : '?'}subject=${props.subject}` : '') +
  (props.cc ? `${props.body || props.subject ? '&' : '?'}cc=${props.cc}` : '') +
  (props.bcc
    ? `${props.body || props.subject || props.cc ? '&' : '?'}bcc=${props.bcc}`
    : '')
</script>

<template>
  <a class="link-hi" target="_blank" rel="noopener" :href="href">
    <slot>
      {{ props.address }}
    </slot>
  </a>
</template>

<style scoped lang="scss"></style>
