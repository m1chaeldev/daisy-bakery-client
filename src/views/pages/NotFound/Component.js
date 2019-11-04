import React, { Component } from 'react';
import { Col } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';

// Styles
import styles from './styles';

const shopGmail = 'example@gmail.com';
const shopAddress = '24/212 Tran Quang Khai, TP. Nha Trang';
const shopPhone = '0349445935';

const notFoundImg = require('./../../commons/images/404-error.png');
const pinIcon = require('./../../commons/images/icons/pin.png');
const phoneIcon = require('./../../commons/images/icons/phone.png');
const gmailIcon = require('./../../commons/images/icons/gmail.png');
const userIcon = require('./../../commons/images/icons/user.png');
const cartIcon = require('./../../commons/images/icons/cart.png');

const hMenu = [
    {
        image: require('./../../commons/images/icons/facebook.png'),
        to: 'https://www.facebook.com/'
    },
    {
        image: require('./../../commons/images/icons/youtube.png'),
        to: '/home'
    },
    {
        image: require('./../../commons/images/icons/instagram.png'),
        to: '/home'
    },
    {
        image: require('./../../commons/images/icons/twitter.png'),
        to: '/home'
    }
];

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            user: {
                role: 'Admin'
            },
            width: 0,
            height: 0
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleClickLogo = () => {
        const { history } = this.props;
        history.push('/home');
    }

    developerGoto = (location) => {
        if (location !== '/home') {
            var win = window.open(location, '_blank');
            win.focus();
        }
    };

    handleClickHMenuIcon = (location) => {
        const { history } = this.props;
        history.push(location);
    }

    render() {
        const { width, user, cart } = this.state;
        return (
            <div style={styles.container}>
                <Header handleClickLogo={this.handleClickLogo} />
                <Slider />
                <div style={styles.content}>
                    <Col xs={22} sm={22} md={18} lg={16} xl={16}
                        style={{ ...styles.hMenuWrapper, display: width <= 576 ? 'none' : 'flex' }}
                    >
                        <div style={{ width: 235, height: '100%', position: 'relative' }}>
                            <div style={styles.contentHeaderMenuWrapper}>
                                <div style={styles.contentHeaderMenuWrapperSkew}></div>
                            </div>
                            <div style={styles.contentHeaderMenuIcon}>
                                {
                                    hMenu.map((item, index) => (
                                        <img
                                            key={index.toString()}
                                            alt=""
                                            src={item.image}
                                            style={{ ...styles.hMenuIcon, cursor: 'pointer', marginRight: index < hMenu.length - 1 ? 10 : 0 }}
                                            className="hoverBtn"
                                            onClick={() => this.developerGoto(item.to)}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div style={styles.contentHeaderTextWrapper}>
                            {width > 1600 && (
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                                    <img
                                        alt=""
                                        src={gmailIcon}
                                        style={{
                                            ...styles.hMenuIcon,
                                            width: 20, height: 20, marginRight: 5,
                                            filter: 'invert(0%) sepia(83%) saturate(7431%) hue-rotate(353deg) brightness(83%) contrast(117%)'
                                        }}
                                        className="hoverBtn"
                                    />
                                    <div style={styles.hMenuSmallText}>{shopGmail}</div>
                                </div>
                            )}
                            {width > 1200 && (
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                                    <img
                                        alt=""
                                        src={pinIcon}
                                        style={{
                                            ...styles.hMenuIcon,
                                            width: 20,
                                            height: 20,
                                            marginRight: 5,
                                            filter: 'invert(0%) sepia(83%) saturate(7431%) hue-rotate(353deg) brightness(83%) contrast(117%)'
                                        }}
                                        className="hoverBtn"
                                    />
                                    <div style={styles.hMenuSmallText}>{shopAddress}</div>
                                </div>
                            )}
                            <img
                                alt=""
                                src={phoneIcon}
                                style={{
                                    ...styles.hMenuIcon,
                                    width: 20,
                                    height: 20,
                                    marginRight: 5,
                                    filter: 'invert(0%) sepia(83%) saturate(7431%) hue-rotate(353deg) brightness(83%) contrast(117%)'
                                }}
                                className="hoverBtn"
                            />
                            <div style={{
                                color: '#000',
                                fontSize: '0.9rem',
                                fontFamily: 'Open Sans, sans-serif'
                            }}>{shopPhone}</div>
                        </div>
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={16} xl={16}
                        style={{
                            ...styles.cartWrapper,
                            marginTop: width <= 576 ? 0 : 10
                        }}
                    >
                        {width <= 576 && (
                            <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 0 }}>
                                <div style={{
                                    ...styles.hMenuSmallText,
                                    marginRight: 5,
                                }}>Liên hệ:</div>
                                <img
                                    alt=""
                                    src={phoneIcon}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 5,
                                        filter: 'invert(0%) sepia(83%) saturate(7431%) hue-rotate(353deg) brightness(83%) contrast(117%)'
                                    }}
                                    className="hoverBtn"
                                />
                                <div style={styles.hMenuSmallText}>{shopPhone}</div>
                            </div>
                        )}
                        <div
                            style={{ marginRight: 10, position: 'relative', cursor: 'pointer' }}
                            onClick={null}
                        >
                            <img
                                alt=""
                                src={cartIcon}
                                style={{ ...styles.cartIcon }}
                            />
                            {cart.length > 0 && (
                                <div style={styles.badgeWrapper}>
                                    <div style={{ fontSize: '0.7rem', color: 'white' }}>
                                        {cart.length + 1 > 9 ? '9+' : cart.length}
                                    </div>
                                </div>
                            )}
                        </div>
                        <img
                            alt=""
                            src={userIcon}
                            style={styles.cartIcon}
                            onClick={null}
                        />
                    </Col>
                    <div style={styles.notFoundWrapper}>
                        <img src={notFoundImg} alt="" style={styles.notFoundImg} />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50
                    }}>
                        <div
                            style={{
                                ...styles.bakeryName,
                                fontWeight: 100
                            }}>Trang này không tồn tại.
                        </div>
                        <div
                            onClick={() => this.handleClickHMenuIcon('/home')}
                            style={{
                                ...styles.bakeryName,
                                fontWeight: 100,
                                cursor: 'pointer',
                                marginLeft: 5,
                                color: '#0053a0',
                                fontFamily: 'Open Sans, sans-serif'
                            }}>Về trang chủ
                        </div>
                    </div>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
            </div>
        );
    }
};

export default ComponentPage;