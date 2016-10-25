import { connect } from 'react-redux'
import { activeCategory, editCategory, deleteCategory } from '../actions'
import CategoryNav from '../components/CategoryNav'

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.category.name,
    subCategories: dispatch(getSubCategories(ownProps.category.id))
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onActiveClick: () => {
        dispatch(activeCategory(ownProps.category));
    },
    onEditClick: () => {
        dispatch(editCategory(ownProps.category));
    },
    onDeleteClick: () => {
        dispatch(deleteCategory(ownProps.category));
    }
  }
}

const CategoryNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryNav)

export default CategoryNavContainer

