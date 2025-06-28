<script setup lang="ts">
const meta = {
  title: "Enderman's Projects",
  description:
    "A display of my largest projects. Some of them aren't published on YouTube.",
  image: 'https://enderman.ch/images/logo.png',
  url: 'https://enderman.ch/projects',
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
  title: 'Projects',
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
