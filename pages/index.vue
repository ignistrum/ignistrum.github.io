<script setup lang="ts">
const meta = {
  title: '</ignistrum>',
  description:
    'A full stack developer, and a malware enthusiast - Malware is ART!.',
  image: 'https://enderman.ch/images/logo.png',
  url: 'https://ignistrum.github.io/',
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
  title: '</ignistrum>',
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
      I'm <strong>&lt;/ignistrum&gt;</strong> &ndash; a full stack developer, a malware
      enthusiast and a YouTuber. You can find my channel
      
      <a class="link-hi" href="https://youtube.com/@ignistrum">here</a> 
      Sometimes I wish there were 72 hours in a day.
    </p>
    <div class="row g-3">
      <div class="col-12 col-md-8">
        <h5 class="alex">What I do</h5>
        <ul class="list-style-type-do">
          <li>
            I develop cross-platform software. My language of choice is usually
            <strong>Python, Node.js or C#</strong> for desktop applications and any common
            backend stack with framework-loaded TypeScript or Go for web. You can take
            a look at my code on my
            <a class="link-hi" href="https://github.com/ignistrum">GitHub</a>.
          </li>
          <li>
            I have the most unnecessary knowledge about Microsoft and Windows. I love developing malware (main choice is <strong>C#</strong>), I love testing software and coding, playing chess and fixing issues with any platform.
            <sub>
              <em>*Nobody has hired me as a software tester, yet</em>
            </sub>
          </li>
          <li>
            I research about modern, and ancient malware
            and preserve the history of malware. The repository can be found
            <a class="link-hi" href="https://github.com/ignistrum/MalwareIsArt.git">here</a
            >.
          </li>
          <li>I make videos for you to enjoy!, that nobody watches</li>
        </ul>
      </div>
      <div class="col-12 col-md-4">
        <h5 class="alex">What I enjoy</h5>
        <ul class="list-style-type-enjoy">
          <li>Linguistics</li>
          <li>Coding</li>
          <li></li>
          <li>
            <a class="link-hi" href="https://chess.com/member/IgnistrumChess">Chess</a>
          </li>
          </ul>
      </div>
    </div>
    <p>
      <strong>Want to learn more?</strong> Find out more about me using the
      navigation bar!<br />
      <em>See you there!~ 💝</em>
    </p>
  </section>
</template>

<style scoped lang="scss"></style>
