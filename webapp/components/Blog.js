import React, { PropTypes, Component } from 'react'
import Marked from 'marked'
import style from '../style/main.scss'
import classNames from 'classnames'
import Util from '../util'



class Blog extends Component  {

     render() {
        var blog = this.props.blog;
        if (!blog) return (<div className={style['m-blog']}></div>);

        var blogName = '', blogContent = '';      

        if (blog.isEditing) {
            blogName = (<input type="text" defaultValue={blog.name} onChange={this.props.handleNameChange}/>);
            blogContent = (<textarea type="text" value={blog.content} onChange={this.props.handleTextChange}></textarea>);
        } else {
            blogName = (<span>{blog.name}</span>);
            var markdownContent = Marked(blog.content);
            blogContent = (<div dangerouslySetInnerHTML={{__html: markdownContent}}></div>);
        }

        var count = 1;

        return (
          <div className={style['m-blog']}>
              <div className={style['m-blog-header']}>
                 <div className={style['blog-header-container']}>
                    <div className={style['blog-name']}>{blogName}</div>
                    <div className={style['blog-date']}>{Util.ms2DateString(blog.createTime)}</div>
                  </div>
              </div>
              <div className={style['m-blog-content']}>
                 {blogContent}
              </div>         
              <div className={style['m-blog-btn']}>
                <button type="button" className={style['blog-edit-btn']} onClick={() => this.props.onEditClick(blog)}>编辑</button>
                <button type="button" className={style['blog-save-btn']} onClick={() => this.props.onSaveClick(blog)}>保存</button>
              </div>
        </div>)
     }
    
    
}

export default Blog
