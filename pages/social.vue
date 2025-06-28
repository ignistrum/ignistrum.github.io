<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const socials = [
  {
    name: 'YouTube',
    url: 'https://go.enderman.ch/youtube',
    icon: 'youtube',
  },
  {
    name: 'Andrew',
    url: 'https://go.enderman.ch/andrew',
    icon: 'youtube',
  },
  {
    name: 'Twitch',
    url: 'https://go.enderman.ch/twitch',
    icon: 'twitch',
  },
  {
    name: 'TikTok',
    url: 'https://go.enderman.ch/tiktok',
    icon: 'tiktok',
  },
  {
    name: 'Twitter',
    url: 'https://go.enderman.ch/twitter',
    icon: 'twitter',
  },
  {
    name: 'Telegram',
    url: 'https://go.enderman.ch/telegram',
    icon: 'telegram',
  },
  {
    name: 'Discord',
    url: 'https://go.enderman.ch/discord',
    icon: 'discord',
  },
  {
    name: 'GitHub',
    url: 'https://go.enderman.ch/github',
    icon: 'github',
  },
  {
    name: 'Steam',
    url: 'https://go.enderman.ch/steam',
    icon: 'steam',
  },
]

const meta = {
  title: 'Enderman Online',
  description:
    'Discover me on your favorite social media and find ways to contact me here.',
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
  title: 'Socials',
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
  <div>
    <h3 class="alex">Social media</h3>
    <ul class="list-style-type-none p-0">
      <li v-for="(page, index) in socials" :key="index">
        <FontAwesomeIcon :icon="`fa-brands fa-${page.icon}`" />
        <a class="link-hi" target="_blank" rel="noopener" :href="page.url">{{
          page.name
        }}</a>
      </li>
    </ul>
    <h3 class="alex">Contact me</h3>
    <p>
      Fanmail:
      <EMail address="contact@enderman.ch" subject="Hey Enderman!" /><br />
      Manager: <EMail address="manager@enderman.ch" /><br />
      Abuse: <EMail address="abuse@enderman.ch" />
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
