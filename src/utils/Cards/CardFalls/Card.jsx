import React from 'react';
/**
 * 子组件内容
 * @param title 标题
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */
const Card = ({title,children,restProps})=>{
  return(
    <div>
      <div className="card-list" {...restProps}>
        <span>{title} {children}</span>
      </div>
    </div>
  )
}
export default Card;