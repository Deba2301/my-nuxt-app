import { defineEventHandler, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 's-maxage=900, stale-while-revalidate=60')
  const res = await $fetch('https://dummyjson.com/posts?limit=18')
  return res
})