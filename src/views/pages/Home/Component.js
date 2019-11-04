import React, { Component } from 'react';
import { Row, Col, message, Popover } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';

// Styles
import styles from './styles';
import './style.css';

const shopYoutubeUrl = 'https://www.facebook.com/';
const shopTwitterUrl = 'https://www.facebook.com/';
const shopInstagramUrl = 'https://www.instagram.com/';
const shopGmail = 'example@gmail.com';
const shopAddress = '24/212 Tran Quang Khai, TP. Nha Trang';
const shopPhone = '0349445935';

const pinIcon = require('./../../commons/images/icons/pin.png');
const phoneIcon = require('./../../commons/images/icons/phone.png');
const gmailIcon = require('./../../commons/images/icons/gmail.png');
const userIcon = require('./../../commons/images/icons/user.png');
const cartIcon = require('./../../commons/images/icons/cart.png');
const editIcon = require('./../../commons/images/icons/edit.png');

const bakeryData = [
    {
        id: '1',
        bakery_image: require('./../../commons/images/bakery.png'),
        bakery_name: 'Bánh mì Sandwich',
        bakery_code: 'SW165',
        bakery_price: '56500',
        is_out_stock: false,
    },
    {
        id: '2',
        bakery_image: require('./../../commons/images/bakery.jpg'),
        bakery_name: 'Bánh mì Abc',
        bakery_code: 'SW166',
        bakery_price: '65000',
        is_out_stock: true,
    },
    {
        id: '3',
        bakery_image: require('./../../commons/images/bakery2.jpg'),
        bakery_name: 'Bánh mì Xyz',
        bakery_code: 'SW167',
        bakery_price: '36500',
        is_out_stock: true,
    }, {
        id: '4',
        bakery_image: require('./../../commons/images/bakery3.jpg'),
        bakery_name: 'Bánh mì Def',
        bakery_code: 'SW168',
        bakery_price: '50000',
        is_out_stock: false,
    }
];

const categoryBakeryData = [
    {
        name: 'Bánh mì',
        data: bakeryData,
        path: '/banh-mi'
    },
    {
        name: 'Bánh Pizza',
        data: bakeryData,
        path: '/banh-pizza'
    },
    {
        name: 'Bánh quy và bánh su kem',
        data: bakeryData,
        path: '/banh-quy'
    },
    {
        name: 'Bánh kem',
        data: bakeryData,
        path: '/banh-kem'
    }
];

const hMenu = [
    {
        image: require('./../../commons/images/icons/facebook.png'),
        to: 'https://www.facebook.com/'
    },
    {
        image: require('./../../commons/images/icons/youtube.png'),
        to: shopYoutubeUrl
    },
    {
        image: require('./../../commons/images/icons/instagram.png'),
        to: shopInstagramUrl
    },
    {
        image: require('./../../commons/images/icons/twitter.png'),
        to: shopTwitterUrl
    }
];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

    developerGoto = (location) => {
        if (location !== '/home') {
            var win = window.open(location, '_blank');
            win.focus();
        }
    };

    handleClickHMenuIcon = (location) => {
        const { history } = this.props;
        history.push(location);
    };

    handleClickBuyBakery = (item) => {
        if (item.is_out_stock) return message.error(`Bánh này hiện tại đã hết, vui lòng liên hệ ${shopPhone}`);
        const { cart } = this.state;
        let bakery = [...cart];
        bakery.push(item);
        this.setState({ cart: bakery });
        message.success(`Đã thêm "${item.bakery_name}" vào giỏ hàng`);
    };

    handleClickEdit = (e, item) => {
        e.stopPropagation();
        message.success(item.bakery_name);
    };

    userPopover = () => (
        <div style={{ width: 250 }}>User</div>
    );

    cartPopover = () => (
        <div style={{ width: 250 }}>Cart</div>
    );

    render() {
        const { width, user, cart } = this.state;
        return (
            <div style={styles.container}>
                <Header handleClickLogo={() => this.handleClickHMenuIcon('/home')} />
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
                        <Popover
                            content={this.cartPopover()}
                            trigger="click"
                            placement="bottomRight"
                        >
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
                        </Popover>
                        <Popover
                            content={this.userPopover()}
                            trigger="click"
                            placement="bottomRight"
                        >
                            <img
                                alt=""
                                src={userIcon}
                                style={styles.cartIcon}
                                onClick={null}
                            />
                        </Popover>
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ marginBottom: 20 }}>
                        {categoryBakeryData.map((category, ind) => (
                            <div key={ind.toString()} style={styles.eachCategory}>
                                <div style={styles.categoryTitleWrapper}>
                                    <div style={styles.categoryTitleText}>{category.name}</div>
                                </div>
                                <div>
                                    <Row gutter={[10, 10]}>
                                        {category.data.map((item, index) => index < 8 && (
                                            <Col
                                                key={item.id}
                                                xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}
                                                onClick={() => this.handleClickBuyBakery(item)}
                                                style={styles.eachBakery}
                                                className="EachBakery"
                                            >
                                                <div style={styles.bakeryImageWrapper}>
                                                    <img src={item.bakery_image} alt={item.bakery_name} style={styles.bakeryImage} />
                                                    {item.is_out_stock === true && (
                                                        <div style={styles.bakeryShadowWrapper}>
                                                            <div style={styles.outOfBakeryWrapper}>
                                                                <div style={styles.outOfBakeryText}>Tạm hết</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {2 - 1 === 1 && (
                                                        <div style={{
                                                            ...styles.bakeryShadowWrapper,
                                                            backgroundColor: 'transparent'
                                                        }}>
                                                            <div style={styles.newBakeryWrapper}>
                                                                <div style={{
                                                                    ...styles.outOfBakeryText,
                                                                    fontWeight: 100,
                                                                    fontStyle: 'italic'
                                                                }}>Bánh mới</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {user.role === 'Admin' && (
                                                        <img
                                                            src={editIcon}
                                                            alt=""
                                                            style={styles.editIcon}
                                                            onClick={e => this.handleClickEdit(e, item)}
                                                        />
                                                    )}
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: 10 }}>
                                                    <div style={styles.bakeryName}>{item.bakery_name}</div>
                                                    <div style={styles.bakeryCode}># {item.bakery_code}</div>
                                                    <div style={styles.bakeryPrice}>VND {numberWithCommas(item.bakery_price)}</div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <div style={styles.showMoreWrapper}>
                                        <div
                                            onClick={() => this.handleClickHMenuIcon(category.path)}
                                            style={{
                                                ...styles.bakeryName,
                                                ...styles.showMoreText
                                            }}>Xem thêm...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
            </div >
        );
    }
};

export default ComponentPage;