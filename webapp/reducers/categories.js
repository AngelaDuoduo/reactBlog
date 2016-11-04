const initState = {
   list: [{
      id: 1,
      parentId: -1,
      name: '默认分类',
      blogNum: 0,
      isDefault: true,
      createTime: 1472006259800,
      isActive: true,
      isEditing: false
   }],
   isFetching: false,
   updateTime: new Date().getTime()
}

const changeAttr = (list, id, attr, value) => {
    return list.map((item) => {
        if (item.id === id) {
            if (typeof value === 'undefined') {
                return attr;
            } else {
                var newItem = Object.assign({}, item);
                newItem[attr] = value;
                return newItem;
            }            
        } else {
            return item;
        }
    });
}
   
const categories = (state = initState, action) => {
  switch (action.type) {
    
    case 'ADD_CATGORY_BEGIN':
        return Object.assign({}, state, {isFetching: true});

    case 'ADD_CATEGORY_FINISH':
        return Object.assign({}, state, {
            list: [
              ...state.list,
              action.category
            ],
            isFetching: false,
            updateTime: new Date().getTime()
        });

    case 'EDIT_CATEGORY_BEGIN':
        var newList = changeAttr(state.list, action.category.id, 'isEditing', true);
        return Object.assign({}, state, {
            list: newList
        });

    case 'EDIT_CATEGORY_ING':
        var newList = changeAttr(state.list, action.category.id, 'name', action.categoryName);
        return Object.assign({}, state, {
            list: newList
        });

    case 'SAVE_CATEGORY_BEGIN': 
        var newList = changeAttr(state.list, action.category.id, 'isEditing', false);
        return Object.assign({}, state, {
            isFetching: true,
            list: newList
        });

    case 'SAVE_CATEGORY_FINISH':
        var newList = changeAttr(state.list, action.category.id, action.category);
        return Object.assign({}, state, {
            isFetching: false,
            list: newList
        });
    
    case 'DELETE_CATEGORY_BEGIN':
        return Object.assign({}, state, {
            isFetching: true
        });

    case 'DELETE_CATEGORY_FINISH':
        var newList = changeAttr(state.list, action.category.id, undefined).filter((category) => {
            return category;
        });

        return Object.assign({}, state, {
            list: newList,
            isFetching: false,
            updateTime: new Date().getTime()
        });

    case 'ACTIVE_CATEGORY':
         action.category = action.category || state.list[0];
         var newList = state.list.map((category, index) => {
            if (category.id === action.category.id) {
                return Object.assign({}, category, {isActive: true});
            } else {
                return Object.assign({}, category, {isActive: false});
            }
         });  

         return Object.assign({}, state, {
            list: newList
         });

    default:
      return state
  }
}

export default categories
