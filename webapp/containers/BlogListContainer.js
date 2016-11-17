import { connect } from 'react-redux'
import { getBlogs, addBlog, activeBlog, deleteBlog} from '../actions'
import BlogList from '../components/BlogList'

const isBlogActive = (blog) => {
    return blog.isActive === 'true' || blog.isActive === true;
} 

const mapStateToProps = (state) => {
  var currentCategory = state.categories.list.filter((category) => {
      return category.isActive === 'true' || category.isActive === true;
  })[0];
  
  //currentCategory未确定时
  var currentCategoryId = currentCategory && currentCategory.id,
      blogs = state.blogs.list;
  if (typeof currentCategoryId !== 'undefined') {
      blogs = state.blogs.list.filter((blog) => {
          return blog.categoryId == currentCategoryId;
      });
  }
  
  return {
      blogs: blogs,
      currentCategoryId: currentCategoryId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBlogList: () => {
        dispatch(getBlogs());
    },

    onAddClick: (currentCategory) => {
      var blog = {
          id: 0,
          categoryId: currentCategory,
          name: '新建博客',
          createTime: 1472106634420,
          content: '这是新建的博客的内容',
          isActive: false,
          isEditing: false
      };
      dispatch(addBlog(blog));
    },

    onBlogSelect: (blog) => {
       if (!blog.isActive) {
          dispatch(activeBlog(blog));
       }       
    },

    onBlogDelete: (blog) => {
        dispatch(deleteBlog(blog));
        if (blog.isActive) {
            dispatch(activeBlog({categoryId: blog.categoryId}));
        }
    }
  }
}

const mergeProps = function(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        blogs: stateProps.blogs,
        currentCategory: stateProps.currentCategory,
        getBlogList: dispatchProps.getBlogList,
        onBlogSelect: dispatchProps.onBlogSelect,
        onBlogDelete: dispatchProps.onBlogDelete,
        onAddClick: function() {
            dispatchProps.onAddClick(stateProps.currentCategoryId)
        }
    });
}

const BlogListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BlogList)

export default BlogListContainer

