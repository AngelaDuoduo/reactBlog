import { connect } from 'react-redux'
import { getCategories, addCategory, activeCategory, deleteCategory, 
    activeBlog, deleteBlogs, editCategoryBegin, 
    editCategoryName, saveCategory} from '../actions'
import CategoryList from '../components/CategoryList'

const isCategoryActive = (category) => {
    return category.isActive === 'true'|| category.isActive === true;
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: () => {
       dispatch(getCategories());
    },

    onAddClick: () => {
      var category = {
          id: 0,
          parentId: -1,
          name: '新的分类',
          blogNum: 1,
          isDefault: false,
          createTime: new Date().getTime(),
          isActive: false,
          isEditing: false
      };
      //添加分类、重新获取分类列表，激活当前分类
      dispatch(addCategory(category));    
    },

    onCategorySelect: (category) => {
       if (!isCategoryActive(category)) {
          dispatch(activeCategory(category));
          dispatch(activeBlog({categoryId: category.id}));
       }       
    },

    onCategoryDelete: (category) => {
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

