import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const title: string = '</ignistrum>'
  const description: string = 'A full stack developer, a malware enthusiast and a YouTuber.'
  const keywords: string =
    'ignistrum, </ignistrum>, developer, youtuber, malware, malware enthusiast, angled brackets'

  const pages = ref([
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Projects',
      path: '/projects',
    },
    {
      name: 'Socials',
      path: '/social',
    },
  ])

  function autoFetchPages() {
    while (pages.value.length) pages.value.pop()

    useRouter()
      .getRoutes()
      .forEach((route) => {
        if (route.path !== '/')
          pages.value.push({
            name: route.path.slice(1)[0].toUpperCase() + route.path.slice(2),
            path: route.path,
          })
      })
  }

  return {
    title,
    description,
    keywords,
    pages,
  }
})
