//么有任何dispatch的时候程序就是从reducer的init取数据嘛？
const initState = [{
    id: 1,
    categoryId: 1,
    name: '第一篇博客',
    createTime: 1472106634420,
    content: '这里是第一篇博客的内容',
    isActive: true,
    isEditing: false
}];

const blogs = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
        return [...state, action.blog];
    //state的引用需要改，state中每个元素如果需要修改也需要创建新引用
    case 'EDIT_BLOG_BEGIN':
        return state.map(function(blog, index) {
            if (blog.id === action.blog.id) {
                return Object.assign({}, blog, {
                    isEditing: true
                });
            }
            return blog;
        });

    case 'EDIT_BLOG_NAME': 
        return state.map(function(blog) {
            if (blog.isActive) {
                return Object.assign({}, blog, {
                    name: action.name
                });
            }
            return blog;
        });

    case 'EDIT_BLOG_CONTENT':
        return state.map(function(blog) {
            if (blog.isActive) {
                return Object.assign({}, blog, {
                    content: action.content
                });
            }
            return blog;
        });

    case 'EDIT_BLOG_FINISH': 
        return state.map(function(blog, index) {
            if (blog.id === action.blog.id) {
                var newBlog = Object.assign({}, blog, {
                    isEditing: false
                });
                return newBlog; 
            }
            return blog;
        });

    case 'DELETE_BLOG':
        var pos = -1;
        state.forEach((blog, index) => {
            if (blog.id === action.blog.id) {
                pos = index;
            }
        });

        var shorterList = state.map((blog, index) => {
            return Object.assign({}, blog);
        });

        if (pos != -1) {
            shorterList.splice(pos, 1);
        }
        return shorterList;

    case 'DELETE_BLOGS':
        var newBlogs = [];
        state.forEach((blog) => {
            if (blog.categoryId != action.categoryId) {
                newBlogs.push(Object.assign({}, blog));
            }
        });
        return newBlogs;

    case 'ACTIVE_BLOG':
        var targetId = -1;
        if (action.blog.id) {
            targetId = action.blog.id;
        } else {
            var blogList = state.filter((blog) => {
                return blog.categoryId == action.blog.categoryId;
            });
            if (blogList.length > 0) targetId = blogList[0].id;
        }

        return state.map((blog) => {
            if (blog.id === targetId) {
                return Object.assign({}, blog, {isActive: true});
            } else {
                return Object.assign({}, blog, {isActive: false});
            }            
        });

    default:
        return state
  }
}

export default blogs
