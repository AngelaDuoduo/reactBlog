const initState = [{
      id: 1,
      parentId: -1,
      name: '默认分类',
      blogNum: 0,
      isDefault: true,
      createTime: 1472006259800,
      isActive: true,
      isEditing: false
   }];
   
const categories = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        action.category
      ];
    case 'EDIT_CATEGORY_BEGIN':
      return state.map((category) => {
          if (category.id === action.category.id) {
              return Object.assign({}, category, {isEditing: true});
          } else {
              return category
          }
      });
    case 'EDIT_CATEGORY_NAME':
      return state.map((category) => {
          if (category.id === action.category.id) {
              return Object.assign({}, category, {name: action.categoryName});
          } else {
              return category;
          }
      });
    case 'EDIT_CATEGORY_FINISH':
      return state.map((category) => {
          if (category.id === action.category.id) {
              return Object.assign({}, category, {isEditing: false, name: action.category.name});
          } else {
              return category;
          }
      });
    case 'DELETE_CATEGORY':
      var newCategoryList = state.map((category, index) => {
          if (category.id !== action.category.id) {
             return Object.assign({}, category);
          }          
      });
      newCategoryList = newCategoryList.filter((category) => {
          return category;
      });
      return newCategoryList;
    case 'ACTIVE_CATEGORY':
         action.category = action.category || state[0];
         return state.map((category, index) => {
            if (category.id === action.category.id) {
                return Object.assign({}, category, {isActive: true});
            } else {
                return Object.assign({}, category, {isActive: false});
            }
         });  
    case 'GET_SUBCATEGORIES':
      return state;
    default:
      return state
  }
}

export default categories
