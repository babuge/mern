import React from 'react';
import style from './card.css';
 
/**
 * CardList组件内容
 * @param title 组件标题
 * @param extra 描述
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */
const CardList = ({title, extra, children, restProps})=>{
  return(
    <div {...restProps}>
      <div className="bbg card">
        <nav>{title} <span className="card-details">{extra}</span></nav>
        {React.Children.map(
          children,
          child => (child ? React.cloneElement(child, {  }) : child)
        )}
      </div>
    </div>
  )
}
export default CardList;