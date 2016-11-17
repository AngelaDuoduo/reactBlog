import Util from '../util.js'

const isCategoryActive = (category) => {
    return category.isActive === true || category.isActive === 'true';
}

const isBlogActive = (blog) => {
    return blog.isActive === true || blog.isActive === 'true';
}

export const activeCategory = (category) => {
    return {
        type: 'ACTIVE_CATEGORY',
        category
    }
}

export const getCategories = (category) => {
  return dispatch => {
     dispatch({type: 'GET_CATEGORY_LIST_BEGIN'});
     return Util.ajax('/xhr/getCategoryList')
              .then(res => {
                  dispatch({type: 'GET_CATEGORY_LIST_FINISH', categories: res.data});
                  if (category) {
                     dispatch(activeCategory(category));
                     dispatch(activeBlog({categoryId: res.data.id}));
                  }                  
              });
  }
}

export const getBlogs = (blog) => {
    return dispatch => {
        dispatch({type: 'GET_BLOG_LIST_BEGIN'});
        return Util.ajax('/xhr/getBlogList')
                .then(res => {
                    dispatch({type: 'GET_BLOG_LIST_FINISH', blogs: res.data});
                    if (blog) {
                       dispatch(activeBlog(blog));
                    } 
                });
    }
}

export const addCategory = (category) => {
  return dispatch => {
      dispatch({type: 'ADD_CATEGORY_BEGIN'});
      return Util.ajax('/xhr/upsertCategory', category)
              .then(res => {
                  dispatch({type: 'ADD_CATEGORY_FINISH', category: res.data});
                  dispatch(getCategories(res.data));
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

export const deleteCategory = (category) => {
  return dispatch => {
      dispatch({type: 'DELETE_CATEGORY_BEGIN'});
      return Util.ajax('/xhr/deleteCategory', category)
            .then(res => {
                dispatch({type: 'DELETE_CATEGORY_FINISH', category: res.data});
                if (isCategoryActive(category)) {
                    dispatch(getCategories({id: 1}));     
                } else {
                    dispatch(getCategories(category));
                }                                  
            });
  }
}

export const addBlog = (blog) => {
    return dispatch => {
        dispatch({type: 'ADD_BLOG_BEGIN'});
        return Util.ajax('/xhr/upsertBlog', blog)
              .then(res => {
                  dispatch({type: 'ADD_BLOG_FINISH', blog: res.data});
                  dispatch(getBlogs(res.data));
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
    return dispatch => {
        dispatch({type: 'DELETE_BLOGS_BEGIN'});
        return Util.ajax('/xhr/deletBlogsByCategoryId', categoryId)
                .then(res => {
                    dispatch({type: 'DELETE_BLOGS_FINISH'});
                    dispatch(getBlogs());
                });
    }
}

export const activeBlog = (blog) => {
  return {
    type: 'ACTIVE_BLOG',
    blog
  }
}