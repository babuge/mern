import React from 'react';
import { Link } from 'react-router';
import CardFalls from '../../utils/Cards/CardFalls/index.jsx';
import PanelVoid from '../../utils/Panel/PanelVoid/index.jsx';
import './Wellcome.css';

const { Card } = CardFalls;
const imageStr = `javascript_image,angular_image,react_image,vue_image,`+
                    `node_image,ionic_image,webpack_image,bootstrap_image,`+
                    `linux_image,webgl_image,threejs_image,html_image,`+
                    `less_image,css_image,scss_image`;
export default class Wellcome extends React.Component {
    constructor() {
        super();
        this.state = {
            totalList: [],
            backgroundImage:''
        };
        this.getCardsData = this.getCardsData.bind(this);
        this.threeJsInit = this.threeJsInit.bind(this);
        this.stateGo = this.stateGo.bind(this);
    }
    
    getCardsData() {
        fetch('/api/articleList').then(response => { // 路径相对index.html
            if(response.ok){
                response.json().then(result => {
                    this.setState({
                        totalList: result.records,
                        backgroundImage:'url(../img/bg_main_20190502.jpg)'
                    });
                    this.threeJsInit(result.records);
                })
            } else {
                response.json().then(error => {
                    alert('faild to find article:'.concat(error.message));
                });
            }
            
        }).catch(err => {})
    }
    componentDidMount() {
        this.getCardsData();
    }
    threeJsInit(data) {
        let dom = document.getElementById("wellcome-canvas-id");
        // 场景
        let scene = new THREE.Scene();
        // 相机
        let camera = new THREE.PerspectiveCamera(20, dom.clientWidth / dom.clientHeight, 0.1, 100);
        // 渲染器
        let renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xFFFFFF));
        renderer.setSize(dom.clientWidth, dom.clientHeight);
        // // 坐标轴
        // let axes = new THREE.AxisHelper(20);
        // scene.add(axes);
        // 光源
        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 110, 110);
        spotLight.castShadow = true; // 指定 产生投射阴影效果（spotLight 能投射阴影）
        scene.add(spotLight);
        // 平面
        let planeGeometry = new THREE.PlaneGeometry(0, 0);
        let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
        const imagepath = ( (name,url) => {
            let path = location.origin + '/' + url;
            let imageList = imageStr.split(',');
            let imgurl = ''
            imageList.map( (value,index) => {
                if(name === value.split('_')[0]){
                    imgurl = path + value + '.jpg';
                    return;
                }
            })
            return imgurl;
        })
        const creatCube = ((item, index) => {
            // 块 正方体
            let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
            let url = imagepath(item.name,'img/');
            let texture = THREE.ImageUtils.loadTexture(url);
            let mat = new THREE.MeshPhongMaterial();
            mat.map = texture;
            let cube = new THREE.Mesh(cubeGeometry, mat);
            cube.position.x = (-7 + index) * 5;
            cube.position.y = 6;
            cube.position.z = 0;
            return cube;
        })

        const creatSphere = ((item, index) => {
            // 球 球体
            let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
            let url = imagepath(item.name,'img/');
            let texture = THREE.ImageUtils.loadTexture(url);
            let mat = new THREE.MeshPhongMaterial();
            mat.map = texture;
            let sphere = new THREE.Mesh(sphereGeometry, mat);
            sphere.position.x = (-7 + index) * 5.6;
            sphere.position.y = -6;
            sphere.position.z = 0;
            return sphere;
        });
        let sphereList = [];
        data.map((item, index) => {
            if (index > 15) {
                return;
            }
            if (index % 2 === 0) {
                let sphere = creatSphere(item, index);
                sphereList.push(sphere);
            } else {
                let cube = creatCube(item, index);
                sphereList.push(cube);
            }
            scene.add(sphereList[index]);
        })
        // 摄像机位置
        camera.position.x = 0;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        // 渲染结果 添加到 html中
        document.getElementById("wellcome-canvas-id").appendChild(renderer.domElement);
        // 循环渲染
        let i = 100, j = 100, k = 100;
        const renderScene = (() => {
            i++ , j++ , k++;
            // animation 1.旋转立方体2.旋转球体
            sphereList.map((item, index) => {
                let numx = parseInt((Math.random() + 1) * 5 - 1.5) || 1;
                let numy = parseInt(-(Math.random() + 1) * 5 + 1.5) || -1;
                let numz = parseInt((Math.random() + 1) * 3 - 1) || 1;
                item.rotation.x += 0.00001 * i * numx;
                item.rotation.y += 0.00001 * j * numy;
                item.rotation.z += 0.00001 * k * numz;
                i > 270 ? i = parseInt((Math.random() + 3) * 90) : '';
                j > 270 ? j = parseInt((Math.random() + 3) * 90) : '';
                k > 270 ? k = parseInt((Math.random() + 3) * 90) : '';
            })
            // animation render requestAnimationFrame
            requestAnimationFrame(renderScene); // 浏览器平滑高效绘制
            renderer.render(scene, camera);
        })
        renderScene();
    }
    stateGo(id){
        let ids = id || 0;
        location.href = location.origin + '/issues';
    }
    render() {
        const restProp = { className: 'wellcomeCard' };
        const restPanel = { className: 'wellcomePanel' };
        let info = <div className="clear-fixed">{
            this.state.totalList.map((obj, index) => {
                return <CardFalls title={<span title={`${obj.name}`}>{obj.name}</span>} extra={<span onClick={() => { this.stateGo(obj.id)}} title={`${obj.titleContent ? '文章数' + obj.titleCount : ''}`}>{obj.titleCount || 0}</span>} key={index} restProps={restProp}>
                    <Card title={`${obj.subTitle}`}><p title="合作者">合作者：{
                        obj.cooperator.map((str, index, list) => {
                            if (index !== list.length - 1) {
                                return str + ","
                            } else {
                                return str
                            }
                        })}</p></Card>
                    <Card title={`${obj.titleContent}`}></Card>
                </CardFalls>
            })
        }</div>;
        return (
            <div className="wellcome-cont" style={{'backgroundImage':this.state.backgroundImage}}>
                <p>
                    <Link to="/issues" className="wellcome-link">Wellcome to babuge.com</Link>
                </p>
                <div className="mt8">
                    <PanelVoid title={<span>title</span>} extra={<span>tool</span>} restProps={restPanel}>
                        <div className="wellcome-threejs" id="wellcome-canvas-id"></div>
                    </PanelVoid>
                </div>
                <div className="mt20">
                    <div className="card-header-bar mb8">文章列表</div>
                    {info}
                </div>
            </div>
        );
    }
}
