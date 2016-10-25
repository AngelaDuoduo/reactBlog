import { combineReducers } from 'redux'
import categories from './categories'
import blogs from './blogs'

const workBlog = combineReducers({
    categories,
    blogs
})

export default workBlog
