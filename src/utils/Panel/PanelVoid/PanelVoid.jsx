import React from 'react';
import style from './panelvoid.css';

/**
 * PanelVoid组件内容
 * @param title 组件标题
 * @param titleShow 是否显示title
 * @param extra 描述
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */
const PanelVoid = ({ titleShow, title, extra, children, restProps }) => {
    return (
        <div {...restProps}>
            <div className={`bbg panel-void ${titleShow?'hasNav':''}`}>
                <nav style={{ display:titleShow ? 'block' : 'none'}}><span className="panel-title">{title}</span><span className="panel-tool">{extra}</span></nav>
                {React.Children.map(
                    children,
                    child => (child ? React.cloneElement(child, {className:'panel-cont'}) : child)
                )}
            </div>
        </div>
    )
}
export default PanelVoid;