<template>
  <div id="ender-app">
    <div id="ender-layout" class="flex flex-col justify-center items-center h-full">
      <nav class="flex flex-wrap justify-around gap-4">
        <a href="/" class="flex items-center text-inherit">
          <img class="transition-all" draggable="false" width="100" height="100" src="/_nuxt/logo.Bk6mFExK.avif" alt="Endermanch" />
          <div>
            <h2>Enderman</h2>
            <hr class="accent-text accent-gradient border-0 h-px" />
            <p>official website</p>
          </div>
        </a>
        <ul class="flex flex-wrap items-center justify-center gap-4 m-2">
          <li><a href="/about" class="flex items-center gap-2 text-inherit no-underline"><img src="/_nuxt/info.CJeutLe8.avif" alt="Information" width="32" height="32" /> <span><strong>About</strong></span></a></li>
          <li><a href="/projects" class="flex items-center gap-2 text-inherit no-underline"><img src="/_nuxt/defrag.CTXC3j1t.avif" alt="Blocks" width="32" height="32" /> <span><strong>Projects</strong></span></a></li>
          <li><a href="/social" class="flex items-center gap-2 text-inherit no-underline"><img src="/_nuxt/user.D8-we1Gl.avif" alt="Users" width="32" height="32" /> <span><strong>Socials</strong></span></a></li>
          <li><a href="/blog" class="flex items-center gap-2 text-inherit no-underline"><img src="/_nuxt/book.DSvghs7o.avif" alt="Book" width="32" height="32" /> <span><strong>Blog</strong></span></a></li>
        </ul>
      </nav>

      <main class="flex flex-col gap-4 py-2 px-6 overflow-auto">
        <section class="page flex-grow overflow-y-auto h-full">
          <h3>Welcome 👋</h3>
          <p>
            I'm <strong>Enderman</strong> – a software engineer, a malware enthusiast and most importantly, a weird tall creature.
            I have over 300K subscribers on <a href="https://go.enderman.ch/youtube">YouTube</a> and over 25K followers on <a href="https://go.enderman.ch/twitter">Twitter</a>. Sometimes I wish there were 48 hours in a day.
          </p>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="md:flex-grow-[2]">
              <h6>What I do</h6>
              <ul>
                <li>I develop cross-platform software. My language of choice is usually <strong>C/C++</strong> for desktop applications and any common backend stack with framework-loaded TypeScript for web. Check my code on <a href="https://go.enderman.ch/github">GitHub</a>.</li>
                <li>I have unnecessary yet fascinating knowledge about Microsoft Windows, and I love sharing it in an unorthodox comedic fashion. <sub><em>*Microsoft still hasn’t hired me as a software tester.</em></sub></li>
                <li>I research and analyze modern malware, educate users, and preserve history. Repository <a href="https://go.enderman.ch/repository">here</a>.</li>
                <li>I make videos for you to enjoy!</li>
              </ul>
            </div>
            <div class="md:flex-grow-[1]">
              <h6>What I enjoy</h6>
              <ul>
                <li>Teaching</li>
                <li>Mathematics</li>
                <li>Technology</li>
                <li>Video Production</li>
                <li>Philosophy</li>
                <li>Geopolitics</li>
                <li><a href="https://go.enderman.ch/chess">Chess</a></li>
                <li>Solitude</li>
              </ul>
            </div>
          </div>

          <p><strong>Want to learn more?</strong> Find out more about me using the navigation bar!<br><em>See you there!~</em></p>
        </section>

        <footer class="text-center w-full">
          <small>© 2018-2025, <a href="https://enderman.ch">Enderman</a>. All rights reserved. <sub>β0.3.8 (2025-06-09)</sub></small>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
// This component has no reactive state — purely static
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
