import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Input, Empty, Col, message, Popover, Button, Icon, Modal, Card, Select } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import CakeActions from "../../../../redux/cake/actions";
import CategoryActions from "../../../../redux/category/actions";
import CartActions from "../../../../redux/cart/actions";
import AccountActions from "../../../../redux/account/actions";
// import LoadingIcon from './../../commons/components/LoadingIcon';

import {
    shopYoutubeUrl,
    shopInstagramUrl,
    shopFacebookUrl,
    shopGmail,
    shopAddress,
    shopPhone
} from './../../../../utils/shopInfo';

// Styles
import styles from './styles';
import './styles.css';

const moment = require('moment');
const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

const facebookIcon = require('./../../images/icons/facebook.png');
const rightArrowIcon = require('./../../images/icons/right-arrow.png');
const pinIcon = require('./../../images/icons/pin.png');
const phoneIcon = require('./../../images/icons/phone.png');
const gmailIcon = require('./../../images/icons/gmail.png');
const userIcon = require('./../../images/icons/user.png');
const cartIcon = require('./../../images/icons/cart.png');
const settingsIcon = require('./../../images/icons/settings.png');
const listIcon = require('./../../images/icons/list.png');

const hMenu = [
    {
        image: require('./../../images/icons/facebook.png'),
        to: shopFacebookUrl
    },
    {
        image: require('./../../images/icons/youtube.png'),
        to: shopYoutubeUrl
    },
    {
        image: require('./../../images/icons/instagram.png'),
        to: shopInstagramUrl
    }
];

const userPopoverOptions = [
    {
        title: 'Thông tin tài khoản',
        path: 'ModalUserInformation'
    },
    {
        title: 'Lịch sử',
        path: 'ModalHistory'
    },
    {
        title: 'Đăng xuất',
        path: 'logout'
    }
];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalUserInformation: {
                loading: false,
                visible: false
            },
            ModalHistory: {
                loading: false,
                visible: false
            },
            ModalSettings: {
                loading: false,
                visible: false
            },
            ModalPayment: {
                loading: false,
                visible: false
            },
            ModalConfirmOrder: {
                loading: false,
                visible: false
            },
            addToCategory: 2,
            formData: {
                category: '',
                category_name: '',
                category_child: undefined,
                category_child_name: ''
            },
            userFormData: {
                _id: '',
                id: '',
                name: '',
                phone: '',
                address: ''
            },
            paymentFormData: {
                _id: '',
                owner: '',
                name: '',
                phone: '',
                address: '',
                note: '',
                cart: ''
            },
            confirmOrderType: 0,
            blockReason: '',
            cartUpdate: 0,
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

    updateCartAmount = (item, value) => {
        const { cart, updateUserCart } = this.props;
        const { cartUpdate } = this.state;
        const index = cart.findIndex(obj => obj.name === item.name);
        if (index !== -1) {
            let newData = cart;
            if (value === -1 && newData[index].amount === 0) newData[index].amount += 0;
            else newData[index].amount += value;
            updateUserCart(newData);
            this.setState({ cartUpdate: cartUpdate + 1 })
        }
    };

    deleteCartItem = (item) => {
        const { cart, updateUserCart } = this.props;
        const { cartUpdate } = this.state;
        const index = cart.findIndex(obj => obj.name === item.name);
        let newData = cart;
        if (index !== -1) {
            message.warning(`Bạn đã xóa ${item.name} khỏi giỏ hàng`);
            newData.splice(index, 1);
        }
        updateUserCart(newData);
        this.setState({ cartUpdate: cartUpdate + 1 });
    };

    handleClickOptionUserPopover = (path) => {
        const { logoutRequest } = this.props;
        if (path === 'logout') logoutRequest();
        else this.showModal(path);
    };

    showModal = (state) => {
        const { ModalHistory,
            ModalUserInformation,
            ModalPayment,
            ModalSettings,
            formData,
            userFormData,
            paymentFormData,
            ModalConfirmOrder
        } = this.state;
        const { user } = this.props;
        if (state === 'ModalUserInformation') {
            let newData = ModalUserInformation;
            newData.visible = true;
            let userNewData = userFormData;
            userNewData._id = user._id;
            userNewData.id = user.id;
            userNewData.name = user.name;
            userNewData.phone = user.phone;
            userNewData.address = user.address;
            this.setState({
                userFormData: userNewData,
                [state]: newData,
            });
        }
        if (state === 'ModalHistory') {
            let newData = ModalHistory;
            newData.visible = true;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalConfirmOrder') {
            let newData = ModalConfirmOrder;
            newData.visible = true;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalPayment') {
            // if (user.id.length < 1) return alert('Vui lòng đăng nhập để thanh toán');
            if (user.is_block) return alert(`Bạn đã bị chặn vì lý do: ${user.block_reason}. Vui lòng liên hệ nhân viên để biết thêm thông tin`);
            let newData = ModalPayment;
            newData.visible = true;
            let paymentNewData = paymentFormData;
            paymentNewData._id = user._id;
            paymentNewData.owner = user.id.length > 0 ? user.id : 'Khách vãng lai';
            paymentNewData.name = user.name;
            paymentNewData.phone = user.phone;
            paymentNewData.address = user.address;
            this.setState({
                paymentFormData: paymentNewData,
                [state]: newData,
            });
        }
        if (state === 'ModalSettings') {
            let newData = ModalSettings;
            newData.visible = true;
            let stateData = formData;
            stateData.category = undefined;
            stateData.category_name = '';
            const categoryChild = stateData.category !== '' ? this.getChildCategoriesById(stateData.category) : '';
            stateData.category_child = categoryChild.length > 0 ? categoryChild[0]._id : undefined;
            stateData.category_child_name = categoryChild.length > 0 ? categoryChild[0].name : '';
            this.setState({
                [state]: newData,
                formData: stateData
            });
        }
    };

    getChildCategoriesById = (id) => {
        const { categoryData } = this.props;
        const child = categoryData && categoryData.child ? categoryData.child.filter(obj => obj.category === id) : [];
        return child;
    };

    hideModal = (state) => {
        const { ModalHistory,
            ModalUserInformation,
            ModalPayment,
            ModalSettings,
            formData,
            ModalConfirmOrder
        } = this.state;
        if (state === 'ModalUserInformation') {
            let newData = ModalUserInformation;
            newData.visible = false;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalHistory') {
            let newData = ModalHistory;
            newData.visible = false;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalConfirmOrder') {
            let newData = ModalConfirmOrder;
            newData.visible = false;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalPayment') {
            let newData = ModalPayment;
            newData.visible = false;
            this.setState({
                [state]: newData,
            });
        }
        if (state === 'ModalSettings') {
            const newState = formData;
            newState.category = undefined;
            newState.category_child = undefined;
            newState.category_name = '';
            newState.category_child_name = '';
            let newData = ModalSettings;
            newData.visible = false;
            this.setState({
                formData: newState,
                [state]: newData,
            });
        }
    };

    responseFacebook = (res) => {
        if (res && res.userID && res.userID.length > 1 && res.name && res.name.length > 1) {
            const { getUserRequest } = this.props;
            getUserRequest({
                id: res.userID,
                name: res.name,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
    };

    userPopover = () => {
        const { user } = this.props;
        return (
            <div style={{ width: 250 }}>
                {user.name === '' ? (
                    <FacebookLogin
                        appId="547549069433611"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        isMobile={false}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                style={styles.facebookLoginBtn}
                            >
                                <img
                                    src={facebookIcon}
                                    alt=""
                                    style={styles.facebookLoginIcon}
                                />
                                <div style={styles.facebookLoginText}>Đăng nhập facebook</div>
                            </button>
                        )}
                    />
                ) : (
                        <div style={{ width: '100%' }}>
                            {userPopoverOptions.map((item, index) => (
                                <button
                                    key={index.toString()}
                                    style={styles.facebookLoginBtn}
                                    onClick={() => this.handleClickOptionUserPopover(item.path)}
                                >
                                    <img
                                        src={rightArrowIcon}
                                        alt=""
                                        style={styles.userPopoverIcon}
                                    />
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    )}
            </div>
        );
    };

    cartPopover = () => {
        const { cart } = this.props;
        return (
            <div style={{ width: 250 }}>
                <div style={{ width: '100%', maxHeight: 230, overflowY: 'auto', overflowX: 'hidden' }}>
                    {cart && cart.length <= 0 ?
                        <Empty description="Không có bánh trong giỏ hàng" /> :
                        <div style={{ width: '100%' }}>
                            {cart.map((item, index) => (
                                <div
                                    key={index.toString()}
                                    style={{
                                        ...styles.eachCartItemWrapper,
                                        borderTop: index === 0 ? 'solid 1px #d9d9d9' : 'none'
                                    }}
                                >
                                    <div style={{ width: 100, height: 56, position: 'relative' }}>
                                        <img src={item.image} alt="" style={{ width: '100%', height: '100%' }} />
                                        <div style={styles.deleteWrapper} onClick={() => this.deleteCartItem(item)}>
                                            <Icon
                                                type="delete"
                                                style={{ color: '#e85a4f' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, marginLeft: 5 }}>
                                        <div style={styles.cartTitleText}>{item.name}</div>
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
                                            }}>{numberWithCommas(Number(item.price) * Number(item.amount))}đ</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={styles.paymentBtnWrapper}>
                                <button style={styles.paymentBtn} onClick={() => this.showModal('ModalPayment')}>
                                    <div style={styles.paymentBtnText}>Thanh toán</div>
                                </button>
                                <div style={{
                                    ...styles.cartAmountText,
                                    fontSize: '0.8rem',
                                    position: 'absolute',
                                    right: 0,
                                    color: 'green',
                                    fontWeight: 'bold'
                                }}>{numberWithCommas(this.getTotalCost())}đ</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };

    getTotalCost = () => {
        const { cart } = this.props;
        let result = 0;
        for (let index = 0; index < cart.length; index += 1) {
            const element = cart[index];
            result += Number(element.amount) * Number(element.price);
        };
        return result;
    };

    searchCakes = (value) => {
        const { history } = this.props;
        if (value.length < 1) history.push('/home');
        else history.push(`/search/${value}`);
    };

    onChangeFormData = (value, key) => {
        const { formData } = this.state;
        let newData = formData;
        newData[key] = value;
        this.setState({ formData: newData });
    };

    onChangeFormDataForUser = (value, key) => {
        const { userFormData } = this.state;
        let newData = userFormData;
        newData[key] = value;
        this.setState({ userFormData: newData });
    };

    onChangeFormDataForPayment = (value, key) => {
        const { paymentFormData } = this.state;
        let newData = paymentFormData;
        newData[key] = value;
        this.setState({ paymentFormData: newData });
    };

    onChangeFormDataForEdit = (value, category, key) => {
        const { formData } = this.state;
        let newData = formData;
        newData[key] = value;
        const child = category.props.category;
        if (key === 'category') {
            newData.category_name = child.name;
            newData.category_child = undefined;
        }
        if (key === 'category_child') {
            newData.category_child_name = child.name;
        }
        this.setState({ formData: newData });
    };

    handleCreateCategory = (data, id) => {
        const {
            createCategoryRequest,
            createCategoryChildRequest
        } = this.props;
        if (id === 1) {
            if (data.category_name.length <= 3)
                return alert('Tên danh mục phải có ít nhất 3 kí tự');
            createCategoryRequest({
                name: data.category_name,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
        else {
            if (data.category_child_name.length <= 3)
                return alert('Tên danh mục con phải có ít nhất 3 kí tự');
            createCategoryChildRequest({
                category: data.category,
                name: data.category_child_name,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
        this.hideModal('ModalSettings');
    };

    handleUpdateCategory = (data, id) => {
        const {
            updateCategoryRequest,
            updateCategoryChildRequest,
            // deleteCategoryRequest,
            // deleteCategoryChildRequest
        } = this.props;
        if (id === 1) {
            if (data.category_name.length <= 3)
                return alert('Tên danh mục phải có ít nhất 3 kí tự');
            updateCategoryRequest({
                id: data.category,
                name: data.category_name,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
        else {
            if (data.category_child_name.length <= 3)
                return alert('Tên danh mục con phải có ít nhất 3 kí tự');
            updateCategoryChildRequest({
                id: data.category_child,
                category: data.category,
                name: data.category_child_name,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
        this.hideModal('ModalSettings');
    };

    handleDeleteCategory = (data, id) => {
        const {
            deleteCategoryRequest,
            deleteCategoryChildRequest
        } = this.props;
        if (id === 1) {
            if (window.confirm("Dữ liệu sẽ biến mất vĩnh viễn nếu bạn xóa")) {
                deleteCategoryRequest({
                    id: data.category,
                    serverKey: 'tuoilzphaduoctao123'
                });
            }
        }
        else {
            if (window.confirm("Dữ liệu sẽ biến mất vĩnh viễn nếu bạn xóa")) {
                deleteCategoryChildRequest({
                    id: data.category_child,
                    serverKey: 'tuoilzphaduoctao123'
                });
            }
        }
        this.hideModal('ModalSettings');
    };

    handleEditUserInformation = () => {
        const { userFormData } = this.state;
        const { updateUserRequest } = this.props;
        if (userFormData.name.length < 1) return alert('Họ và tên không được bỏ trống');
        updateUserRequest({ ...userFormData, serverKey: 'tuoilzphaduoctao123' });
        this.hideModal('ModalUserInformation');
    };

    handlePayment = () => {
        const { paymentFormData } = this.state;
        const { createOrderRequest, cart, updateUserCart } = this.props;
        if (paymentFormData.name.length < 1 && paymentFormData.phone.length < 1 && paymentFormData.address.length < 1)
            return alert('Vui lòng nhập đầy đủ họ và tên người đặt, số điện thoại và địa chỉ');
        const newData = paymentFormData;
        newData.cart = JSON.stringify(cart);
        newData.total_price = `${this.getTotalCost()}`;
        createOrderRequest({ ...newData, serverKey: 'tuoilzphaduoctao123' });
        updateUserCart([]);
        this.hideModal('ModalPayment');
    };

    getHistoryOrderOfUser = () => {
        const { user, cartData } = this.props;
        const data = cartData ? cartData.filter(obj => obj.owner === user.id) : [];
        return data;
    };

    getConfirmOrderData = (id) => {
        const { cartData } = this.props;
        const data = cartData ? cartData.filter(obj => obj.status === id) : [];
        return data;
    };

    updateOrderStatus = (item, value) => {
        const { updateOrderStatusRequest } = this.props;
        updateOrderStatusRequest({
            id: item._id,
            status: value,
            serverKey: 'tuoilzphaduoctao123'
        });
    };

    blockUser = item => {
        const { blockUserRequest } = this.props;
        const { blockReason } = this.state;
        if (blockReason.length < 3) return alert('Lý do phải có ít nhất 3 kí tự');
        if (window.confirm(`Chặn khách hàng ${item.name}?`)) {
            blockUserRequest({
                id: item.owner,
                is_block: true,
                block_reason: blockReason.length > 0 ? blockReason : '',
                serverKey: 'tuoilzphaduoctao123'
            });
        }
    };

    getConfirmOrderBadge = () => {
        const { cartData } = this.props;
        const data = cartData && cartData.length > 0 ? cartData.filter(obj => obj.status === 0) : [];
        return data.length;
    };

    render() {
        const {
            width,
            ModalHistory,
            ModalUserInformation,
            ModalPayment,
            ModalSettings,
            addToCategory,
            formData,
            userFormData,
            paymentFormData,
            ModalConfirmOrder,
            confirmOrderType,
            blockReason
        } = this.state;
        const {
            categoryData,
            user,
            cart
        } = this.props;
        const historyData = this.getHistoryOrderOfUser();
        const confirmOrderData = this.getConfirmOrderData(confirmOrderType);
        const confirmOrderBadge = this.getConfirmOrderBadge();
        return (
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
                    {user.level === 'Admin' && (
                        <div
                            style={{ marginRight: 10, position: 'relative', cursor: 'pointer' }}
                            onClick={null}
                        >
                            <img
                                alt=""
                                src={listIcon}
                                style={{ ...styles.cartIcon, marginRight: 0 }}
                                onClick={() => this.showModal('ModalConfirmOrder')}
                            />
                            {confirmOrderBadge > 0 && (
                                <div style={{ ...styles.badgeWrapper, right: -3 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'white' }}>
                                        {confirmOrderBadge > 9 ? '9+' : confirmOrderBadge}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {user.level === 'Admin' && (
                        <img
                            alt=""
                            src={settingsIcon}
                            style={{ ...styles.cartIcon, marginRight: 10 }}
                            onClick={() => this.showModal('ModalSettings')}
                        />
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
                            {cart && cart.length > 0 && (
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
                        title={user.name === '' ? 'Vui lòng đăng nhập' : `Chào ${user.name}`}
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
                <Modal
                    visible={ModalSettings.visible}
                    title="Thiết lập"
                    zIndex={10000}
                    onOk={null}
                    onCancel={() => this.hideModal('ModalSettings')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalSettings')}>
                            Đóng
                        </Button>
                    ]}
                >
                    <div>
                        {addToCategory === 2 && (
                            <div>
                                <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục</div>
                                <Select
                                    value={formData.category}
                                    placeholder="Chọn một danh mục"
                                    style={{ width: '100%', marginBottom: 5 }}
                                    dropdownStyle={{ zIndex: 99999999999 }}
                                    onChange={(value, category) => this.onChangeFormDataForEdit(value, category, 'category')}
                                >
                                    {categoryData && categoryData.data ? categoryData.data.map(category => (
                                        <Option
                                            key={category._id}
                                            value={category._id}
                                            category={category}
                                        >{category.name}</Option>
                                    )) : null}
                                </Select>
                                <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Tên danh mục</div>
                                <Input
                                    style={{ marginBottom: 10 }}
                                    value={formData.category_name}
                                    onChange={e => this.onChangeFormData(e.target.value, 'category_name')}
                                />
                                <div style={{ marginBottom: 20 }}>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: 20 }}
                                        onClick={() => this.handleCreateCategory(formData, 1)}
                                    >Thêm</Button>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: 20 }}
                                        onClick={() => this.handleUpdateCategory(formData, 1)}
                                        disabled={formData.category !== undefined ? false : true}
                                    >Sửa</Button>
                                    <Button
                                        type="danger"
                                        onClick={() => this.handleDeleteCategory(formData, 1)}
                                        disabled={formData.category !== undefined ? false : true}
                                    >Xóa</Button>
                                </div>
                                <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục con</div>
                                <Select
                                    value={formData.category_child}
                                    style={{ width: '100%', marginBottom: 5 }}
                                    disabled={formData.category !== undefined ? false : true}
                                    placeholder={formData.category !== undefined ? 'Chọn một danh mục con' : 'Chọn một danh mục'}
                                    dropdownStyle={{ zIndex: 99999999999 }}
                                    onChange={(value, category) => this.onChangeFormDataForEdit(value, category, 'category_child')}
                                >
                                    {formData.category !== null ? this.getChildCategoriesById(formData.category).map(category => (
                                        <Option
                                            key={category._id}
                                            value={category._id}
                                            category={category}
                                        >{category.name}</Option>
                                    )) : null}
                                </Select>
                                <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Tên danh mục con</div>
                                <Input
                                    style={{ marginBottom: 10 }}
                                    value={formData.category_child_name}
                                    placeholder={formData.category !== undefined ? 'Chọn hoặc gõ tên một danh mục con' : 'Chọn một danh mục'}
                                    onChange={e => this.onChangeFormData(e.target.value, 'category_child_name')}
                                    disabled={formData.category !== undefined ? false : true}
                                />
                                <div style={{ marginBottom: 20 }}>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: 20 }}
                                        onClick={() => this.handleCreateCategory(formData, 2)}
                                    >Thêm</Button>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: 20 }}
                                        onClick={() => this.handleUpdateCategory(formData, 2)}
                                        disabled={formData.category_child !== undefined ? false : true}
                                    >Sửa</Button>
                                    <Button
                                        type="danger"
                                        onClick={() => this.handleDeleteCategory(formData, 2)}
                                        disabled={formData.category_child !== undefined ? false : true}
                                    >Xóa</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
                <Modal
                    visible={ModalUserInformation.visible}
                    title="Thông tin tài khoản"
                    zIndex={10000}
                    onOk={this.handleEditUserInformation}
                    onCancel={() => this.hideModal('ModalUserInformation')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalUserInformation')}>
                            Đóng
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalUserInformation.loading} onClick={this.handleEditUserInformation}>
                            Cập nhật
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Họ và tên</div>
                    <Input
                        style={{ marginBottom: 10, color: 'black' }}
                        placeholder="Nhập họ và tên"
                        onChange={e => this.onChangeFormDataForUser(e.target.value, 'name')}
                        value={userFormData.name}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Số điện thoại</div>
                    <Input
                        style={{ marginBottom: 10, color: 'black' }}
                        placeholder="Nhập số điện thoại"
                        onChange={e => this.onChangeFormDataForUser(e.target.value, 'phone')}
                        value={userFormData.phone}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Địa chỉ</div>
                    <TextArea
                        style={{ color: 'black' }}
                        placeholder="Nhập địa chỉ"
                        onChange={e => this.onChangeFormDataForUser(e.target.value, 'address')}
                        value={userFormData.address}
                    />
                </Modal>
                <Modal
                    visible={ModalHistory.visible}
                    title="Lịch sử"
                    zIndex={10000}
                    onOk={null}
                    onCancel={() => this.hideModal('ModalHistory')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalHistory')}>
                            Đóng
                        </Button>
                    ]}
                >
                    <div style={{ width: '100%', paddingRight: 20, maxHeight: 350, overflowX: 'hidden', overflowY: 'scroll' }}>
                        {historyData && historyData.length > 0 ? historyData.sort().reverse().map((item, index) =>
                            <Card
                                key={index.toString()}
                                size="small"
                                title={moment(item.order_date).format('DD/MM/YYYY HH:mm')}
                                style={{
                                    width: '100%',
                                    marginTop: index === 0 ? 0 : 10
                                }}
                            >
                                <div>
                                    {JSON.parse(item.cart).map(order => (
                                        <div key={order._id} style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: 5 }}>-</div>
                                            <div style={{ marginRight: 5, fontWeight: 'bold', color: '#e85a4f' }}>{order.name}</div>
                                            <div style={{ color: '#333' }}>x{order.amount}</div>
                                            <div style={{ marginLeft: 5, color: '#333' }}>({numberWithCommas(Number(order.price) * Number(order.amount))}đ)</div>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                                        <div style={{ marginRight: 5 }}>Tổng tiền:</div>
                                        <div>{numberWithCommas(item.total_price)}đ</div>
                                    </div>
                                </div>
                            </Card>
                        ) : <Empty description="Không tìm thấy" />}
                    </div>
                </Modal>
                <Modal
                    visible={ModalPayment.visible}
                    title="Thanh toán đơn hàng"
                    zIndex={10000}
                    onOk={null}
                    onCancel={() => this.hideModal('ModalPayment')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalPayment')}>
                            Đóng
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalPayment.loading} onClick={this.handlePayment}>
                            Đồng ý
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Người đặt</div>
                    <Input
                        style={{ marginBottom: 10, color: 'black' }}
                        placeholder="Nhập số điện thoại"
                        onChange={e => this.onChangeFormDataForPayment(e.target.value, 'name')}
                        value={paymentFormData.name}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Số điện thoại</div>
                    <Input
                        style={{ marginBottom: 10, color: 'black' }}
                        placeholder="Nhập số điện thoại"
                        onChange={e => this.onChangeFormDataForPayment(e.target.value, 'phone')}
                        value={paymentFormData.phone}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Địa chỉ</div>
                    <TextArea
                        style={{ color: 'black' }}
                        placeholder="Nhập địa chỉ"
                        onChange={e => this.onChangeFormDataForPayment(e.target.value, 'address')}
                        value={paymentFormData.address}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Ghi chú</div>
                    <TextArea
                        style={{ color: 'black' }}
                        placeholder="Nhập ghi chú nếu có"
                        onChange={e => this.onChangeFormDataForPayment(e.target.value, 'note')}
                        value={paymentFormData.note}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>Hình thức thanh toán:</div>
                        <div style={{ fontWeight: 'bold', marginLeft: 5 }}>Tiền mặt</div>
                    </div>
                </Modal>
                <Modal
                    visible={ModalConfirmOrder.visible}
                    title="Xác nhận các đơn hàng"
                    zIndex={10000}
                    onOk={null}
                    onCancel={() => this.hideModal('ModalConfirmOrder')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalConfirmOrder')}>
                            Đóng
                        </Button>
                    ]}
                >
                    <div style={{ width: '100%', paddingRight: 20, maxHeight: 350, overflowX: 'hidden', overflowY: 'scroll' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Select
                                style={{ width: 150 }}
                                value={confirmOrderType}
                                onChange={value => this.setState({ confirmOrderType: value })}
                                dropdownStyle={{ zIndex: 9999999 }}
                            >
                                <Option value={0}>Chưa xem</Option>
                                <Option value={1}>Đã xác nhận</Option>
                                <Option value={2}>Hủy bỏ</Option>
                            </Select>
                        </div>
                        {confirmOrderData && confirmOrderData.length > 0 ? confirmOrderData.map((item, index) =>
                            <Card
                                key={index.toString()}
                                size="small"
                                title={moment(item.order_date).format('DD/MM/YYYY HH:mm')}
                                style={{
                                    width: '100%',
                                    marginTop: index === 0 ? 0 : 10
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 'bold', color: 'black' }}>Thông tin khách hàng:</div>
                                    <div style={{ color: '#000' }}>- Tên khách hàng:
                                        <span style={{ marginLeft: 5, color: '#333' }}>{item.name}</span>
                                    </div>
                                    <div style={{ color: '#000' }}>- Số điện thoại:
                                        <span style={{ marginLeft: 5, color: '#333' }}>{item.phone}</span>
                                    </div>
                                    <div style={{ color: '#000' }}>- Địa chỉ:
                                        <span style={{ marginLeft: 5, color: '#333' }}>{item.address}</span>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'black' }}>Thông tin đơn hàng:</div>
                                    {JSON.parse(item.cart).map(order => (
                                        <div key={order._id} style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: 5 }}>-</div>
                                            <div style={{ marginRight: 5, fontWeight: 'bold', color: '#e85a4f' }}>{order.name}</div>
                                            <div style={{ color: '#333' }}>x{order.amount}</div>
                                            <div style={{ marginLeft: 5, color: '#333' }}>({numberWithCommas(Number(order.price) * Number(order.amount))}đ)</div>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                                        <div style={{ marginRight: 5 }}>Tổng tiền:</div>
                                        <div>{numberWithCommas(item.total_price)}đ</div>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'black' }}>Cập nhật trạng thái:</div>
                                    <Select
                                        style={{ width: 150, marginTop: 10, marginBottom: 10 }}
                                        value={item.status}
                                        onChange={value => this.updateOrderStatus(item, value)}
                                        dropdownStyle={{ zIndex: 9999999 }}
                                    >
                                        <Option value={0}>Chưa xem</Option>
                                        <Option value={1}>Đã xác nhận</Option>
                                        <Option value={2}>Hủy bỏ</Option>
                                    </Select>
                                    <div>
                                        <Input
                                            style={{ marginBottom: 10, color: 'black' }}
                                            placeholder="Nhập lý do chặn"
                                            onChange={e => this.setState({ blockReason: e.target.value })}
                                            value={blockReason}
                                        />
                                        <Button onClick={() => this.blockUser(item)} type="danger">Chặn khách hàng</Button>
                                    </div>
                                </div>
                            </Card>
                        ) : <Empty description="Không tìm thấy" />}
                    </div>
                </Modal>
            </div>
        );
    }
};

const mapActionToProps = {
    getAllCakesRequest: CakeActions.getAllCakesRequest,
    getAllCategoriesRequest: CategoryActions.getAllCategoriesRequest,
    getAllCartsRequest: CartActions.getAllCartsRequest,
    createCategoryRequest: CategoryActions.createCategoryRequest,
    createCategoryChildRequest: CategoryActions.createCategoryChildRequest,
    updateCategoryRequest: CategoryActions.updateCategoryRequest,
    updateCategoryChildRequest: CategoryActions.updateCategoryChildRequest,
    deleteCategoryRequest: CategoryActions.deleteCategoryRequest,
    deleteCategoryChildRequest: CategoryActions.deleteCategoryChildRequest,
    updateUserCart: CartActions.updateUserCart,
    createCakeRequest: CakeActions.createCakeRequest,
    updateCakeRequest: CakeActions.updateCakeRequest,
    deleteCakeRequest: CakeActions.deleteCakeRequest,
    getUserRequest: AccountActions.getUserRequest,
    createUserRequest: AccountActions.createUserRequest,
    updateUserRequest: AccountActions.updateUserRequest,
    logoutRequest: AccountActions.logoutRequest,
    createOrderRequest: CartActions.createOrderRequest,
    updateOrderStatusRequest: CartActions.updateOrderStatusRequest,
    blockUserRequest: AccountActions.blockUserRequest
};

const mapStateToProps = state => {
    return {
        cakeData: state.cake.cake.data,
        isFetchingCake: state.cake.cake.isFetching,
        categoryData: state.category.category,
        isFetchingCategory: state.category.category.isFetching,
        cartData: state.cart.cart.data,
        isFetchingCart: state.cart.cart.isFetching,
        cart: state.cart.userCart,
        user: state.account.user.data,
    };
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withRouter(ComponentPage));