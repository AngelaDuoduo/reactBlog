import React, { Component } from 'react'
import style from '../style/main.scss'
import Util from '../util'
import classNames from 'classnames'

class BlogList extends Component {

  componentDidMount () {
      this.props.getBlogList();
  }

  render () {
    const {blogs, currentCategory, getBlogList, onAddClick, onBlogSelect, onBlogDelete} = this.props;
    
    return (
        <div className={style['m-blogList']}>
          {
             blogs.map(function(item, index) {
                var createTime = Util.ms2DateString(item.createTime);
                var blogClass = classNames({
                   [style['blog-item']]: true,
                   [style['active']]: item.isActive === 'true' || item.isActive === true
                });

                return (
                  <div key={index} className={blogClass} onClick={() => onBlogSelect(item)}>
                      <p className={style['blog-item-name']}>{item.name}</p>
                      <p className={style['blog-item-date']}>{createTime}</p>
                      <div className={style['blog-delete']} onClick={(event) => {event.stopPropagation();onBlogDelete(item)}}>删除</div>
                  </div>
                )
             })
          }
          <button type="button" className={style['btn-create-blog']} onClick={onAddClick}>新建博客</button>
      </div>
    )
  }
}

export default BlogList;
