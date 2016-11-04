import { connect } from 'react-redux'
import { editBlogBeginning, editBlogFinished, editBlogContent, editBlogName} from '../actions'
import Blog from '../components/Blog'


const mapStateToProps = (state) => {
  var activeBlogList = state.blogs.list.filter((blog) => {
      return blog.isActive;
  });

  if (activeBlogList.length > 0) {
      return {blog: activeBlogList[0]};
  }

  return {
      blog: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditClick: (blog) => {
        dispatch(editBlogBeginning(blog));
    },

    onSaveClick: (blog) => {
        dispatch(editBlogFinished(blog));
    },

    handleTextChange: (event) => {
        dispatch(editBlogContent(event.target.value));
    },

    handleNameChange: (event) => {
        dispatch(editBlogName(event.target.value));
    }
  }
}

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default BlogContainer

