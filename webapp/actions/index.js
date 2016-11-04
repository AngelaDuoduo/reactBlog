import Util from '../util.js'

export const addCategory = (category) => {
  return dispatch => {
      dispatch({type: 'ADD_CATEGORY_BEGIN'});
      return Util.ajax('/xhr/upsertCategory', category)
              .then(res => {
                  dispatch({type: 'ADD_CATEGORY_FINISH', category: res.data})
              });
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
        type: 'EDIT_CATEGORY_ING',
        category,
        categoryName
    }
}

export const saveCategory = (category) => {
  return dispatch => {
      dispatch({type: 'SAVE_CATEGORY_BEGIN', category: category});
      return Util.ajax('/xhr/upsertCategory', category)
            .then(res => {
                res.data.isEditing = false;
                dispatch({type: 'SAVE_CATEGORY_FINISH', category: res.data});
            });
  }
}

export const activeCategory = (category) => {
    return {
        type: 'ACTIVE_CATEGORY',
        category
    }
}


export const deleteCategory = (category) => {
  return dispatch => {
      dispatch({type: 'DELETE_CATEGORY_BEGIN'});
      return Util.ajax('/xhr/deleteCategory', category)
            .then(res => {
                dispatch({type: 'DELETE_CATEGORY_FINISH', category: res.data});
            });
  }
}

export const addBlog = (blog) => {
    return dispatch => {
        dispatch({type: 'ADD_BLOG_BEGIN'});
        return Util.ajax('/xhr/upsertBlog', blog)
              .then(res => {
                  dispatch({type: 'ADD_BLOG_FINISH', blog: res.data});
              });
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
    return dispatch => {
       dispatch({type: 'SAVE_BLOG_BEGIN'});
       return Util.ajax('/xhr/upsertBlog', blog)
              .then(res => {
                  res.data.isEditing = false;
                  dispatch({type: 'SAVE_BLOG_FINISH', blog: res.data});
              });
    }
}

export const deleteBlog = (blog) => {
   return dispatch => {
      dispatch({type: 'DELETE_BLOG_BEGIN'});
      return Util.ajax('/xhr/deleteBlog', blog)
              .then(res => {
                  dispatch({type: 'DELETE_BLOG_FINISH', blog: res.data});
              })
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