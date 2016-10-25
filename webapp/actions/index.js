export const addCategory = (category) => {
  return {
    type: 'ADD_CATEGORY',
    category
  }
}

export const editCategoryBegin = (category) => {
  return {
    type: 'EDIT_CATEGORY_BEGIN',
    category
  }
}

export const editCategoryName = (category, categoryName) => {
    return {
        type: 'EDIT_CATEGORY_NAME',
        category,
        categoryName
    }
}

export const editCategoryFinish = (category) => {
  return {
    type: 'EDIT_CATEGORY_FINISH',
    category
  }
}

export const activeCategory = (category) => {
    return {
        type: 'ACTIVE_CATEGORY',
        category
    }
}

export const getSubCategories = (categoryId) => {
  return {
     type: 'GET_SUBCATEGORIES',
     categoryId
  }
}

export const deleteCategory = (category) => {
  return {
    type: 'DELETE_CATEGORY',
    category
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const editBlogBeginning = (blog) => {
    return {
      type: 'EDIT_BLOG_BEGIN',
      blog
    }
}

export const editBlogName = (name) => {
    return {
        type: 'EDIT_BLOG_NAME',
        name
    }
}

export const editBlogContent = (content) => {
   return {
      type: 'EDIT_BLOG_CONTENT',
      content
   }
}

export const editBlogFinished = (blog) => {
    return {
        type: 'EDIT_BLOG_FINISH',
        blog
    }
}

export const deleteBlog = (blog) => {
   return {
      type: 'DELETE_BLOG',
      blog
   }
}

export const deleteBlogs = (categoryId) => {
    return {
        type: 'DELETE_BLOGS',
        categoryId
    }
}

export const activeBlog = (blog) => {
  return {
    type: 'ACTIVE_BLOG',
    blog
  }
}