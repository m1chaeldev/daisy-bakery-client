import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';

// Styles
import styles from './styles';
import './style.css';

const shopFacebook = 'Daisy Bakery';
const shopFacebookUrl = 'https://www.facebook.com/';
const shopInstagram = 'Daisy Bakery';
const shopInstagramUrl = 'https://www.instagram.com/';
const shopGmail = 'example@gmail.com';
const shopAddress = '24/212 Tran Quang Khai, TP. Nha Trang';
const shopPhone = '0349445935';

const footerImg = require('./../../commons/images/footer.jpg');
const pinIcon = require('./../../commons/images/icons/pin.png');
const phoneIcon = require('./../../commons/images/icons/phone.png');
const gmailIcon = require('./../../commons/images/icons/gmail.png');
const gmailColorIcon = require('./../../commons/images/icons/gmail-color.png');
const userIcon = require('./../../commons/images/icons/user.png');
const cartIcon = require('./../../commons/images/icons/cart.png');
const editIcon = require('./../../commons/images/icons/edit.png');
const facebookIcon = require('./../../commons/images/icons/facebook.png');
const instagramIcon = require('./../../commons/images/icons/instagram.png');
const instagramcolorIcon = require('./../../commons/images/icons/instagram-color.png');
const logoIcon = require('./../../commons/images/logo.png');

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
    },

]

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
        // const { history } = this.props;
        // history.push(location);
        var win = window.open(location, '_blank');
        win.focus();
    }

    handleClickBuyBakery = (item) => {
        if (item.is_out_stock) return message.error(`Bánh này hiện tại đã hết, vui lòng liên hệ ${shopPhone}`);
        const { cart } = this.state;
        let bakery = [...cart];
        bakery.push(item);
        this.setState({ cart: bakery });
        message.success(`Đã thêm "${item.bakery_name}" vào giỏ hàng`);
    };

    handleClickEdit = (item) => {
        message.success(item.bakery_name);
    }

    render() {
        const { width, height, user, cart } = this.state;
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
                                            onClick={() => this.handleClickHMenuIcon(item.to)}
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
                                    <div style={{
                                        color: '#000',
                                        fontSize: '0.9rem'
                                    }}>{shopGmail}</div>
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
                                    <div style={{
                                        color: '#000',
                                        fontSize: '0.9rem'
                                    }}>{shopAddress}</div>
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
                                fontSize: '0.9rem'
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
                                    color: '#000',
                                    fontSize: '0.9rem',
                                    marginRight: 5
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
                                <div style={{
                                    color: '#000',
                                    fontSize: '0.9rem'
                                }}>{shopPhone}</div>
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
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ marginBottom: 20 }}>
                        <div style={styles.eachCategory}>
                            <div style={styles.categoryTitleWrapper}>
                                <div style={styles.categoryTitleText}>Bánh mì</div>
                            </div>
                            <div>
                                <Row gutter={[10, 10]}>
                                    {bakeryData.map(item => (
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
                                                {user.role === 'Admin' && (
                                                    <img
                                                        src={editIcon}
                                                        alt=""
                                                        style={styles.editIcon}
                                                        onClick={() => this.handleClickEdit(item)}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                                <div style={styles.bakeryName}>{item.bakery_name}</div>
                                                <div style={styles.bakeryCode}># {item.bakery_code}</div>
                                                <div style={styles.bakeryPrice}>VND {item.bakery_price}</div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>

                        <div style={styles.eachCategory}>
                            <div style={styles.categoryTitleWrapper}>
                                <div style={styles.categoryTitleText}>Bánh Pizza</div>
                            </div>
                            <div>
                                <Row gutter={[10, 10]}>
                                    {bakeryData.map(item => (
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
                                                {user.role === 'Admin' && (
                                                    <img
                                                        src={editIcon}
                                                        alt=""
                                                        style={styles.editIcon}
                                                        onClick={() => this.handleClickEdit(item)}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                                <div style={styles.bakeryName}>{item.bakery_name}</div>
                                                <div style={styles.bakeryCode}># {item.bakery_code}</div>
                                                <div style={styles.bakeryPrice}>VND {item.bakery_price}</div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>

                        <div style={styles.eachCategory}>
                            <div style={styles.categoryTitleWrapper}>
                                <div style={styles.categoryTitleText}>Bánh Abcd</div>
                            </div>
                            <div>
                                <Row gutter={[10, 10]}>
                                    {bakeryData.map(item => (
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
                                                {user.role === 'Admin' && (
                                                    <img
                                                        src={editIcon}
                                                        alt=""
                                                        style={styles.editIcon}
                                                        onClick={() => this.handleClickEdit(item)}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                                <div style={styles.bakeryName}>{item.bakery_name}</div>
                                                <div style={styles.bakeryCode}># {item.bakery_code}</div>
                                                <div style={styles.bakeryPrice}>VND {item.bakery_price}</div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </div>
                <div style={styles.footerWrapper}>
                    <img src={footerImg} alt="" style={{ width: '100%' }} />
                    <div style={styles.footerCover}>
                        <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ width: '100%', height: '100%' }}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}
                                style={styles.footerContentWrapper}
                            >
                                <img src={logoIcon} alt="" style={styles.logoImg} />
                                <div style={{ flex: 1, marginLeft: 20, textAlign: 'center', maxWidth: 350 }}>
                                    <div style={styles.footerText}>
                                        {width <= 576 ? `Daisy Bakery xin cảm ơn quý khách và hẹn gặp lại!` :
                                            `Trách nhiệm của Daisy Bakery không chỉ là mang lại những chiếc bánh ngon tuyệt phẩm,
                                            mà còn đem đến cho quý khách hàng sự phục vụ chuyên nghiệp.
                                            Daisy Bakery xin cảm ơn quý khách và hẹn gặp lại!`
                                        }
                                    </div>
                                </div>
                            </Col>
                            {width >= 1024 && (
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}
                                    style={styles.footerContentWrapper}
                                >
                                    <div>
                                        <div
                                            onClick={() => this.developerGoto(shopFacebookUrl)}
                                            style={styles.daisyInfo}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={facebookIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopFacebook}</div>
                                        </div>
                                        <div
                                            onClick={() => this.developerGoto(shopInstagramUrl)}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={instagramcolorIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopInstagram}</div>
                                        </div>
                                        <div
                                            onClick={() => this.developerGoto('/home')}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={gmailColorIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopGmail}</div>
                                        </div>
                                        <div
                                            onClick={() => this.developerGoto('/home')}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img
                                                    src={phoneIcon}
                                                    alt=""
                                                    style={{
                                                        ...styles.footerIcon,
                                                        filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(355deg) brightness(105%) contrast(103%)'
                                                    }}
                                                />
                                            </div>
                                            <div style={styles.footerText}>{shopPhone}</div>
                                        </div>
                                    </div>
                                </Col>
                            )}
                        </Col>
                    </div>
                </div>
                <div style={styles.developerWrapper}>
                    <div style={styles.noCopyrightText}>&copy; Website develop by</div>
                    <div style={styles.developer}>Michael Nguyen</div>
                    <div style={styles.developerIconWrapper}>
                        <img
                            onClick={() => this.developerGoto('https://www.facebook.com/Thai.Nguyen.3003')}
                            className="developerIcon"
                            src={gmailIcon}
                            alt=""
                            style={styles.developerIcon}
                        />
                        <img
                            onClick={() => this.developerGoto('https://www.facebook.com/Thai.Nguyen.3003')}
                            className="developerIcon"
                            src={facebookIcon}
                            alt=""
                            style={{ ...styles.developerIcon, marginLeft: 5 }}
                        />
                        <img
                            onClick={() => this.developerGoto('https://www.instagram.com/thaisnguyenex')}
                            className="developerIcon"
                            src={instagramIcon}
                            alt=""
                            style={{ ...styles.developerIcon, marginLeft: 5 }}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default ComponentPage;