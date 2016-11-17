const initState = {
   list: [],
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
    
    case 'GET_CATEGORY_LIST_BEGIN':
        return Object.assign({}, state, {isFetching: true});

    case 'GET_CATEGORY_LIST_FINISH':
        return {
            list: action.categories,
            isFetching: false,
            updateTime: new Date().getTime()
        }

    case 'ADD_CATEGORY_BEGIN':
        return Object.assign({}, state, {isFetching: true});

    case 'ADD_CATEGORY_FINISH':
        return Object.assign({}, state, {isFetching: false});

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
        return Object.assign({}, state, {isFetching: true});

    case 'DELETE_CATEGORY_FINISH':
        return Object.assign({}, state, {isFetching: false});
        
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
