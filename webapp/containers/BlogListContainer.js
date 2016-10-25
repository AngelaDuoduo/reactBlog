import { connect } from 'react-redux'
import { addBlog, activeBlog, deleteBlog} from '../actions'
import BlogList from '../components/BlogList'

var blogId = 2;

const mapStateToProps = (state) => {
  var currentCategory = state.categories.filter((category) => {
      return category.isActive;
  })[0];
  var currentCategoryId = currentCategory.id;
  return {
    blogs: state.blogs.filter((blog) => {
      return blog.categoryId == currentCategoryId;
    }),
    currentCategoryId: currentCategoryId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddClick: (currentCategory) => {
      var blog = {
          id: blogId++,
          categoryId: currentCategory,
          name: '新建博客',
          createTime: 1472106634420,
          content: '这是新建的博客的内容',
          isActive: true,
          isEditing: false
      };
      dispatch(addBlog(blog));
      dispatch(activeBlog(blog));
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

