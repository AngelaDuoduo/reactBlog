import { connect } from 'react-redux'
import { addCategory, activeCategory, deleteCategory, 
    activeBlog, deleteBlogs, editCategoryBegin, 
    editCategoryName, saveCategory} from '../actions'
import CategoryList from '../components/CategoryList'

var categoryId = 2; 

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list.filter((category) => {
        return category.parentId == -1;
    })
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: () => {
      var category = {
          id: categoryId++,
          parentId: -1,
          name: '第一个分类',
          blogNum: 1,
          isDefault: false,
          createTime: 1472006259800,
          isActive: false,
          isEditing: false
      };
      dispatch(addCategory(category));    
    },

    onCategorySelect: (category) => {
       if (!category.isActive || category.isActive === 'false') {
          dispatch(activeCategory(category));
          dispatch(activeBlog({categoryId: category.id}));
       }       
    },

    onCategoryDelete: (category) => {
        if (category.isActive) {
           dispatch(activeCategory({id: 1}));
           dispatch(activeBlog({categoryId: 1}));
        }
        dispatch(deleteBlogs(category.id));
        dispatch(deleteCategory(category));
    },
    onCategoryEdit: (category) => {
       dispatch(editCategoryBegin(category));
    },
    handleNameChange: (category, event) => {
       dispatch(editCategoryName(category, event.target.value));
    },
    onCategorySave: (category) => {
       dispatch(saveCategory(category));
    }
  }
}

const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default CategoryListContainer

