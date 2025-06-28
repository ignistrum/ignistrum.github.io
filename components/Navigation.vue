<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePageStore } from '~/stores/pages'

import logo from '~/assets/images/logo.gif'
import aboutIcon from '~/assets/images/icons/info.png'
import projectIcon from '~/assets/images/icons/defrag.png'
import socialIcon from '~/assets/images/icons/user.png'

const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

const icons = [aboutIcon, projectIcon, socialIcon]
</script>

<template>
  <nav
    class="d-flex flex-row flex-wrap flex-sm-column flex-lg-row justify-content-around justify-content-sm-start justify-content-lg-between gap-2 gap-lg-3"
  >
    <Logo
      :src="logo"
      alt="Endermanch"
      title="Enderman"
      description="official website"
    />
    <ul
      class="navbar-nav flex-row align-items-center align-items-sm-start align-items-lg-center justify-content-center gap-3 m-2 m-sm-0 mx-lg-2 my-sm-2 my-lg-0"
    >
      <li v-for="(page, index) in pages" :key="index" class="nav-item">
        <LinkButton
          :path="page.path"
          :name="page.name"
          :icon="icons[index]"
          alt="Info"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss"></style>
