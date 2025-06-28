<script setup lang="ts">
const meta = {
  title: 'Enderman',
  description:
    'A software engineer, a malware enthusiast and, most importantly, a weird tall creature.',
  image: 'https://enderman.ch/images/logo.png',
  url: 'https://enderman.ch/',
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
  title: 'Enderman',
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
    <h3 class="alex">Welcome 👋</h3>
    <p>
      I'm <strong>Enderman</strong> &ndash; a software engineer, a malware
      enthusiast and most importantly, a weird tall creature. I have over 300K
      subscribers on
      <a class="link-hi" href="https://go.enderman.ch/youtube">YouTube</a> and
      over 20K followers on
      <a class="link-hi" href="https://go.enderman.ch/twitter">Twitter</a>.
      Sometimes I wish there were 48 hours in a day.
    </p>
    <div class="row g-3">
      <div class="col-12 col-md-8">
        <h5 class="alex">What I do</h5>
        <ul class="list-style-type-do">
          <li>
            I develop cross-platform software. My language of choice is usually
            <strong>C/C++</strong> for desktop applications and any common
            backend stack with framework-loaded TypeScript for web. You can take
            a look at my code on
            <a class="link-hi" href="https://go.enderman.ch/github">GitHub</a>.
          </li>
          <li>
            I have the most unnecessary, yet fascinating knowledge about
            Microsoft Windows, and I absolutely love sharing it with my viewers
            in an unorthodox comedic fashion.
            <sub>
              <em>*Microsoft still has not hired me as a software tester.</em>
            </sub>
          </li>
          <li>
            I research and analyze modern malware, educate computer users about
            it and preserve history. The repository can be found
            <a class="link-hi" href="https://go.enderman.ch/repository">here</a
            >.
          </li>
          <li>I make videos for you to enjoy!</li>
        </ul>
      </div>
      <div class="col-12 col-md-4">
        <h5 class="alex">What I enjoy</h5>
        <ul class="list-style-type-enjoy">
          <li>Teaching</li>
          <li>Mathematics</li>
          <li>Philosophy</li>
          <li>Geopolitics</li>
          <li>
            <a class="link-hi" href="https://go.enderman.ch/chess">Chess</a>
          </li>
          <li>Solitude</li>
        </ul>
      </div>
    </div>
    <p>
      <strong>Want to learn more?</strong> Find out more about me using the
      navigation bar!<br />
      <em>See you there!~</em>
    </p>
  </section>
</template>

<style scoped lang="scss"></style>
