import React, { PropTypes } from 'react'
import style from '../style/main.scss'
import classNames from 'classnames'

const CategoryList = ({ categories, onAddClick, onCategorySelect, onCategoryEdit, onCategorySave, onCategoryDelete, handleNameChange}) => (
  <div className={style["m-categoryList"]}>
      {
         categories.map(function(item, index) {
            var categoryClass = classNames({
               [style['category-item']]: true,
               [style['active']]: item.isActive
            });

            var itemDOM = null, editBtn = null;
            if (item.isEditing) {
                itemDOM = (<input className={style['category-input']} defaultValue={item.name} onClick={(event) => {event.stopPropagation();}} onChange={(event) => handleNameChange(item, event)} />)
                editBtn = (<div className={style['category-edit']} onClick={(event) => {event.stopPropagation(); onCategorySave(item);}}>保存</div>)
            } else {
                itemDOM = (<div className={style['category-name']}>{item.name}</div>)
                editBtn = (<div className={style['category-edit']} onClick={(event) => {event.stopPropagation(); onCategoryEdit(item);}}>编辑</div>)
            }

            return (
              <div key={index} className={categoryClass} onClick={() => onCategorySelect(item)}>
                {itemDOM}
                {!item.isDefault 
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

export default CategoryList
