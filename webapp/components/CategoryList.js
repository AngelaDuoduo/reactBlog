import React, { Component } from 'react'
import style from '../style/main.scss'
import classNames from 'classnames'

class CategoryList extends Component {
   componentDidMount () {
      this.props.getCategoryList();
   }

   render () {
      const {dispatch, categories, getCategoryList, onAddClick, onCategorySelect, onCategoryEdit, onCategorySave, onCategoryDelete, handleNameChange} = this.props;
      return (
         <div className={style["m-categoryList"]}>
          {
             categories.map(function(item, index) {
                var categoryClass = classNames({
                   [style['category-item']]: true,
                   [style['active']]: item.isActive === true || item.isActive === 'true'
                });

                var itemDOM = null, editBtn = null;
                if (item.isEditing === 'true' || item.isEditing === true) {
                    itemDOM = (<input className={style['category-input']} defaultValue={item.name} onClick={(event) => {event.stopPropagation();}} onChange={(event) => handleNameChange(item, event)} />)
                    editBtn = (<div className={style['category-edit']} onClick={(event) => {event.stopPropagation(); onCategorySave(item);}}>保存</div>)
                } else {
                    itemDOM = (<div className={style['category-name']}>{item.name}</div>)
                    editBtn = (<div className={style['category-edit']} onClick={(event) => {event.stopPropagation(); onCategoryEdit(item);}}>编辑</div>)
                }

                var showMenu = !item.isDefault || item.isDefault === 'false';

                return (
                  <div key={index} className={categoryClass} onClick={() => onCategorySelect(item)}>
                    {itemDOM}
                    {showMenu
                      && 
                      (<div>
                          {editBtn}
                          <div className={style['category-delete']} onClick={(event) => {event.stopPropagation(); onCategoryDelete(item);}}>删除</div>
                       </div>)
                    }
                  </div>
                )
             })
          }
          <button type="button" className={style['btn-create-category']} onClick={onAddClick}>添加分类</button>
        </div>
      )
   }
}

export default CategoryList
