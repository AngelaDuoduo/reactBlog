//么有任何dispatch的时候程序就是从reducer的init取数据嘛？
const initState = {
    list: [{
        id: 1,
        categoryId: 1,
        name: '第一篇博客',
        createTime: 1472106634420,
        content: '这里是第一篇博客的内容',
        isActive: true,
        isEditing: false
    }],
    isFetching: false,
    updateTime: new Date().getTime()
};

const changeAttr = (list, id, attr, value) => {
    return list.map((item) => {
        if (item.id == id) {
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

const getActiveBlog = (list) => {
    return list.filter((blog) => {
        return blog.isActive === true || blog.isActive === 'true';
    })[0];
}

const blogs = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_BLOG_BEGIN':
        return Object.assign({}, state, {isFetching: true});
    case 'ADD_BLOG_FINISH':
        return Object.assign({}, state, {
            list: [
                ...state.list,
                action.blog
            ],
            isFetching: false,
            updateTime: new Date().getTime()
        });
    //state的引用需要改，state中每个元素如果需要修改也需要创建新引用
    case 'EDIT_BLOG_BEGIN':
        var newList = changeAttr(state.list, action.blog.id, 'isEditing', true);
        return Object.assign({}, state, {list: newList});

    case 'EDIT_BLOG_NAME': 
        var blog = getActiveBlog(state.list), blogId = -1;
        if (blog) {
            blogId = blog.id;
        }
        var newList = changeAttr(state.list, blogId, 'name', action.name);
        return Object.assign({}, state, {list: newList});

    case 'EDIT_BLOG_CONTENT':
        var blog = getActiveBlog(state.list), blogId = -1;
        if (blog) {
            blogId = blog.id;
        }
        var newList = changeAttr(state.list, blogId, 'content', action.content);
        return Object.assign({}, state, {list: newList});

    case 'SAVE_BLOG_BEGIN': 
        return Object.assign({}, state, {isFetching: true});

    case 'SAVE_BLOG_FINISH':
        var newList = changeAttr(state.list, action.blog.id, action.blog);
        return Object.assign({}, state, {list: newList, isFetching: false, updateTime: new Date().getTime()});

    case 'DELETE_BLOG_BEGIN':
        return Object.assign({}, state, {isFetching: true});

    case 'DELETE_BLOG_FINISH':
        var newList = changeAttr(state.list, action.blog.id, undefined).filter(blog => {
            return blog;
        });
        return Object.assign({}, state, {list: newList, isFetching: false, updateTime: new Date().getTime()});

    case 'DELETE_BLOGS':
        var newBlogs = [];
        state.list.forEach((blog) => {
            if (blog.categoryId != action.categoryId) {
                newBlogs.push(Object.assign({}, blog));
            }
        });
        return Object.assing({}, state, {list: newBlogs});

    case 'ACTIVE_BLOG':
        var targetId = -1;
        if (action.blog.id) {
            targetId = action.blog.id;
        } else {
            var blogList = state.list.filter((blog) => {
                return blog.categoryId == action.blog.categoryId;
            });
            if (blogList.length > 0) targetId = blogList[0].id;
        }

        var newList = state.list.map((blog) => {
            if (blog.id === targetId) {
                return Object.assign({}, blog, {isActive: true});
            } else {
                return Object.assign({}, blog, {isActive: false});
            }            
        });
        return Object.assign({}, state, {list: newList});

    default:
        return state
  }
}

export default blogs
