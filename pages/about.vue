<script setup lang="ts">
const age =
  new Date(Number(new Date()) - Number(new Date('2003-09-18'))).getFullYear() -
  1970

const meta = {
  title: 'About Me',
  description: `Nice to meet you!~ I'm Andrew, a ${age}-year-old developer from Kaluga, Russia.`,
  image: 'https://enderman.ch/images/logo.png',
  url: 'https://enderman.ch/about',
}

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogTitle: meta.title,
  ogDescription: meta.description,
  ogImage: meta.image,
  ogUrl: meta.url,
  ogType: 'website',
  twitterTitle: meta.title,
  twitterDescription: meta.description,
  twitterImage: meta.image,
  twitterCard: 'summary',
})

useHead({
  title: 'About',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <section>
    <p>This page shall be added in a future release.</p>
  </section>
</template>

<style scoped lang="scss"></style>
