import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';

// Styles
import styles from './styles';
import './style.css';

const facebookIcon = require('./../../commons/images/icons/facebook.png');

const hMenu = [
    {
        bigTxt: 'Trang chủ',
        smallTxt: '',
        to: '/home'
    },
    {
        bigTxt: 'Điện thoại',
        smallTxt: '0349445935',
        to: '/home'
    },
    {
        bigTxt: 'Event & wedding',
        smallTxt: '',
        to: '/home'
    },
    {
        bigTxt: 'Order',
        smallTxt: '',
        to: '/home'
    },

]

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoaded: true
        }
    }

    handleClickLogo = () => {
        const { history } = this.props;
        history.push('/home');
    }

    handleClickHMenuIcon = (location) => {
        const { history } = this.props;
        history.push(location);
    }

    render() {
        return (
            <div style={styles.container}>
                <Header handleClickLogo={this.handleClickLogo} />
                <Slider />
                <div style={styles.content}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={16}
                        style={styles.hMenuWrapper}
                    >
                        {hMenu.map((item, index) => (
                            <div
                                key={index.toString()}
                                style={{ ...styles.hMenuBtn }}
                                className="hoverBtn"
                                onClick={() => this.handleClickHMenuIcon(item.to)}
                            >
                                <div>
                                    <div style={styles.hMenuBigText} className="hoverText">{item.bigTxt}</div>
                                    <div style={styles.hMenuSmallText} className="hoverText">{item.smallTxt}</div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </div>
                {/* <Row gutter={[16, 16]}>
                    <Col span={6}> <div style={{ backgroundColor: 'yellow', height: 50 }}></div></Col>
                    <Col span={6}> <div style={{ backgroundColor: 'yellow', height: 50 }}></div></Col>
                    <Col span={6}> <div style={{ backgroundColor: 'yellow', height: 50 }}></div></Col>
                    <Col span={6}> <div style={{ backgroundColor: 'yellow', height: 50 }}></div></Col>
                </Row> */}
            </div>
        );
    }

};

export default ComponentPage;