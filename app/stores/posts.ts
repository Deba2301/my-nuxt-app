import { defineStore } from 'pinia'

export interface Post {
  id: number
  title: string
  body: string
  tags?: string[]
  reactions?: number | {
    likes?: number
    dislikes?: number
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedPost = ref<Post | null>(null)

  // Getters
  const visiblePosts = computed(() => posts.value.slice(0, 4))
  const totalPosts = computed(() => posts.value.length)

  // Actions
  const fetchPosts = async (limit: number = 18) => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<PostsResponse>(`https://dummyjson.com/posts?limit=${limit}`)
      posts.value = data.posts || []
    } catch (err) {
      error.value = 'Failed to fetch posts'
      console.error('Error fetching posts:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchPost = async (id: string | number) => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Post>(`https://dummyjson.com/posts/${id}`)
      selectedPost.value = data
      return data
    } catch (err) {
      error.value = 'Failed to fetch post'
      console.error('Error fetching post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearSelectedPost = () => {
    selectedPost.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    selectedPost: readonly(selectedPost),
    
    // Getters
    visiblePosts,
    totalPosts,
    
    // Actions
    fetchPosts,
    fetchPost,
    clearSelectedPost,
    clearError,
  }
})