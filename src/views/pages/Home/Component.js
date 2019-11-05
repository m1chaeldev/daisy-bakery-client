import React, { Component } from 'react';
import { Input, Empty, Col, message, Popover, Dropdown, Button, Icon, Menu } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';
import LoadingIcon from './../../commons/components/LoadingIcon';
import ListCakes from './../../commons/components/ListCakes';

// Styles
import styles from './styles';
import './style.css';

const { Search } = Input;

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

const bakeryData = [
    {
        id: '1',
        cake_image: require('./../../commons/images/bakery.png'),
        cake_name: 'Bánh mì Sandwich',
        cake_category: 'Bánh mì 1',
        cake_code: 'SW165',
        cake_price: '56500',
        cake_startedDate: new Date(2019, 9, 29),
        is_out_stock: false
    },
    {
        id: '2',
        cake_image: require('./../../commons/images/bakery.jpg'),
        cake_name: 'Bánh mì Abc',
        cake_category: 'Bánh mì 1 Bánh mì 2',
        cake_code: 'SW166',
        cake_price: '65000',
        cake_startedDate: new Date(2019, 9, 28),
        is_out_stock: true
    },
    {
        id: '3',
        cake_image: require('./../../commons/images/bakery2.jpg'),
        cake_name: 'Bánh mì Xyz',
        cake_category: 'Bánh mì 2',
        cake_code: 'SW167',
        cake_price: '36500',
        cake_startedDate: new Date(2019, 9, 24),
        is_out_stock: true
    }, {
        id: '4',
        cake_image: require('./../../commons/images/bakery3.jpg'),
        cake_name: 'Bánh mì Def',
        cake_category: 'Bánh mì 2',
        cake_code: 'SW168',
        cake_price: '50000',
        cake_startedDate: new Date(2019, 10, 3),
        is_out_stock: false
    }
];

const categoryBakeryData = [
    {
        name: 'Bánh mì',
        category: 'banhMi',
        categoryData: [
            { name: 'Bánh mì 1' },
            { name: 'Bánh mì 2' }
        ],
        data: bakeryData,
        path: '/banh-mi'
    },
    {
        name: 'Bánh Pizza',
        category: 'banhPizza',
        categoryData: [
            { name: 'Bánh Pizza 1' },
            { name: 'Bánh Pizza 2' }
        ],
        data: bakeryData,
        path: '/banh-pizza'
    },
    {
        name: 'Bánh quy và bánh su kem',
        category: 'banhQuy',
        categoryData: [
            { name: 'Bánh quy 1' },
            { name: 'Bánh quy 2' }
        ],
        data: bakeryData,
        path: '/banh-quy'
    },
    {
        name: 'Bánh kem',
        category: 'banhKem',
        categoryData: [
            { name: 'Bánh kem 1' },
            { name: 'Bánh kem 2' }
        ],
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
            categorySelected: {
                banhMi: '',
                banhPizza: '',
                banhQuy: '',
                banhKem: ''
            },
            categoryData: {
                banhMi: [],
                banhPizza: [],
                banhQuy: [],
                banhKem: []
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
        const isExist = cart.findIndex(obj => obj.cake_name === item.cake_name);
        if (isExist === -1) {
            let bakery = [...cart];
            const newItem = { ...item, amount: 1 };
            bakery.push(newItem);
            this.setState({ cart: bakery });
            message.success(`Đã thêm "${item.cake_name}" vào giỏ hàng`);
        } else {
            let newData = cart;
            newData[isExist].amount += 1;
            this.setState({ cart: newData });
        }
    };

    handleClickEdit = (e, item) => {
        e.stopPropagation();
        message.success(item.cake_name);
    };

    userPopover = () => (
        <div style={{ width: 250 }}>User</div>
    );

    updateCartAmount = (item, value) => {
        const { cart } = this.state;
        const index = cart.findIndex(obj => obj.cake_name === item.cake_name);
        if (index !== -1) {
            let newData = cart;
            if (value === -1 && newData[index].amount === 0) newData[index].amount += 0;
            else newData[index].amount += value;
            this.setState({ cart: newData });
        }
    };

    deleteCartItem = (item) => {
        const { cart } = this.state;
        const index = cart.findIndex(obj => obj.cake_name === item.cake_name);
        if (index !== -1) {
            let newData = cart;
            newData.splice(index, 1);
            this.setState({ cart: newData });
            message.warning(`Bạn đã xóa ${item.cake_name} khỏi giỏ hàng`);
        }
    };

    cartPopover = () => {
        const { cart } = this.state;
        return (
            <div style={{ width: 250 }}>
                {cart.length <= 0 ?
                    <Empty description="Không có bánh trong giỏ hàng" /> :
                    <div>
                        {cart.map((item, index) => (
                            <div
                                key={index.toString()}
                                style={{
                                    ...styles.eachCartItemWrapper,
                                    borderTop: index === 0 ? 'solid 1px #d9d9d9' : 'none'
                                }}
                            >
                                <div style={{ width: 100, height: 56, position: 'relative' }}>
                                    <img src={item.cake_image} alt="" style={{ width: '100%', height: '100%' }} />
                                    <div style={styles.deleteWrapper} onClick={() => this.deleteCartItem(item)}>
                                        <Icon
                                            type="delete"
                                            style={{ color: '#e85a4f' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1, marginLeft: 5 }}>
                                    <div style={styles.cartTitleText}>{item.cake_name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                        <Button
                                            size="small"
                                            icon="minus"
                                            onClick={() => this.updateCartAmount(item, -1)}
                                        />
                                        <div style={styles.cartAmountText}>{item.amount}</div>
                                        <Button
                                            size="small"
                                            icon="plus"
                                            onClick={() => this.updateCartAmount(item, +1)}
                                        />
                                        <div style={{
                                            ...styles.cartAmountText,
                                            fontSize: '0.6rem',
                                            position: 'absolute',
                                            right: 0,
                                            color: 'green'
                                        }}>{numberWithCommas(Number(item.cake_price) * Number(item.amount))} VND</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    };

    getDropdownOptions = (category) => (
        <Menu>
            <Menu.Item onClick={() => this.onChangeCategoryOption(category.category, 'Tất cả')}>
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Tất cả
                </span>
            </Menu.Item>
            {category.categoryData.map((item, index) => (
                <Menu.Item
                    key={index.toString()}
                    onClick={() => this.onChangeCategoryOption(category.category, item.name)}
                >
                    <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.name}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    );

    onChangeCategoryOption = (key, value) => {
        const { categorySelected } = this.state;
        let newData = categorySelected;
        newData[key] = value;
        this.setState({ categorySelected: newData });
        this.onCategoryFilter(key, value);
    };

    onCategoryFilter = (key, value) => {
        const { categorySelected, categoryData } = this.state;
        if (categorySelected[key] !== '') {
            const categoryValue = value.toLowerCase();
            const index = categoryBakeryData.findIndex(obj => obj.category === key);
            const listCakes = categoryBakeryData[index].data;
            const query = listCakes.filter(obj => obj.cake_category.toLowerCase().includes(categoryValue));
            const newData = categoryData;
            newData[key] = query;
            this.setState({ categoryData: newData });
        }
    };

    isNewCake = (startedDate) => {
        const date = new Date();
        let validDate = new Date(startedDate);
        validDate = new Date(validDate.getFullYear(), validDate.getMonth(), validDate.getDate() + 8);
        if (validDate >= date) return true;
        return false;
    };

    searchCakes = (value) => {
        message.success(`Bạn đang tìm bánh: ${value}`);
    };

    render() {
        const { width, user, cart, categorySelected, categoryData } = this.state;
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
                            title="Giỏ hàng của bạn"
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
                    <Col xs={22} sm={22} md={18} lg={16} xl={16}
                        style={{
                            ...styles.cartWrapper,
                            marginTop: 20
                        }}
                    >
                        <Search
                            placeholder="Nhập tên bánh cần tìm"
                            onSearch={value => this.searchCakes(value)}
                            style={{ maxWidth: 300 }}
                        />
                    </Col>
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ marginBottom: 20 }}>
                        {categoryBakeryData.map((category, ind) => (
                            <div key={ind.toString()} style={styles.eachCategory}>
                                <div style={styles.categoryTitleWrapper}>
                                    <div style={styles.categoryTitleText}>{category.name}</div>
                                </div>
                                <div style={styles.categoryOptionsWrapper}>
                                    <Dropdown overlay={this.getDropdownOptions(category)}>
                                        <Button loading={false}>
                                            <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                {categorySelected[category.category] === '' ?
                                                    'Tất cả' : categorySelected[category.category]}
                                            </span>
                                            <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                    {user.role === 'Admin' && (
                                        <div style={styles.addCakeWrapper}>
                                            <Button
                                                icon="plus"
                                                loading={false}
                                                onClick={null}
                                            >
                                                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Thêm bánh</span>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <ListCakes
                                        data={categoryData[category.category].length > 0 ? categoryData[category.category] : category.data}
                                        user={user}
                                        handleClickBuyBakery={this.handleClickBuyBakery}
                                        handleClickEdit={this.handleClickEdit}
                                        isNewCake={this.isNewCake}
                                    />
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