import React from 'react';
import Icon from "../../utils/Icons/Icon.jsx";
export default class Footer extends React.Component{
    constructor() {
        super();
    }
    render() {
        const url = './img/beOnRecord.png';
        return (
            <div>
                <div className="framework-footer">
                  <Icon url={url} className="framework-footer-icon" />
                  <span className="framework-footer-title"><a href="http://www.miitbeian.gov.cn/" target="_blank">&nbsp;蜀ICP备17021552号-1</a></span>
                </div>
            </div>
        );
    }
}