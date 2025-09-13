import { usePostsStore } from '~/stores/posts'

/**
 * Composable for managing posts functionality
 */
export const usePosts = () => {
  const store = usePostsStore()

  /**
   * Initialize posts data
   */
  const initializePosts = async (limit: number = 18) => {
    if (store.posts.length === 0) {
      await store.fetchPosts(limit)
    }
  }

  /**
   * Get a specific post by ID
   */
  const getPost = async (id: string | number) => {
    return await store.fetchPost(id)
  }

  /**
   * Get reaction counts for a post
   */
  const getReactionCounts = (post: any) => {
    const likes = typeof post.reactions === 'number' 
      ? post.reactions 
      : post.reactions?.likes ?? 0
      
    const dislikes = typeof post.reactions === 'object' 
      ? post.reactions?.dislikes ?? 0 
      : 0

    return { likes, dislikes }
  }

  return {
    // Store access
    posts: store.posts,
    visiblePosts: store.visiblePosts,
    selectedPost: store.selectedPost,
    loading: store.loading,
    error: store.error,
    
    // Actions
    initializePosts,
    getPost,
    getReactionCounts,
    clearError: store.clearError,
    clearSelectedPost: store.clearSelectedPost,
  }
}