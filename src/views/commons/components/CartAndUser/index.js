import React, { Component } from 'react';
import { Input, Empty, Col, message, Popover, Button, Icon, Modal, Card, Select } from 'antd';
// import LoadingIcon from './../../commons/components/LoadingIcon';

// Styles
import styles from './styles';
import './styles.css';

const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

const shopYoutubeUrl = 'https://www.facebook.com/';
const shopTwitterUrl = 'https://www.facebook.com/';
const shopInstagramUrl = 'https://www.instagram.com/';
const shopGmail = 'example@gmail.com';
const shopAddress = '24/212 Tran Quang Khai, TP. Nha Trang';
const shopPhone = '0349445935';

const facebookIcon = require('./../../images/icons/facebook.png');
const rightArrowIcon = require('./../../images/icons/right-arrow.png');
const pinIcon = require('./../../images/icons/pin.png');
const phoneIcon = require('./../../images/icons/phone.png');
const gmailIcon = require('./../../images/icons/gmail.png');
const userIcon = require('./../../images/icons/user.png');
const cartIcon = require('./../../images/icons/cart.png');
const settingsIcon = require('./../../images/icons/settings.png');

const hMenu = [
    {
        image: require('./../../images/icons/facebook.png'),
        to: 'https://www.facebook.com/'
    },
    {
        image: require('./../../images/icons/youtube.png'),
        to: shopYoutubeUrl
    },
    {
        image: require('./../../images/icons/instagram.png'),
        to: shopInstagramUrl
    },
    {
        image: require('./../../images/icons/twitter.png'),
        to: shopTwitterUrl
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
            addToCategory: 2,
            formData: {
                category: '',
                category_name: '',
                category_child: undefined,
                category_child_name: ''
            },
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
        // const { history } = this.props;
        if (path === 'logout') alert('Logout')
        else this.showModal(path);
    };

    showModal = (state) => {
        const { ModalHistory, ModalUserInformation, ModalPayment, ModalSettings, formData } = this.state;
        const { categoryData } = this.props;
        if (state === 'ModalUserInformation') {
            let newData = ModalUserInformation;
            newData.visible = true;
            this.setState({
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
        if (state === 'ModalPayment') {
            let newData = ModalPayment;
            newData.visible = true;
            this.setState({
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

    handleOk = (state) => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    hideModal = (state) => {
        const { ModalHistory, ModalUserInformation, ModalPayment, ModalSettings, formData } = this.state;
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

    userPopover = () => {
        const { user } = this.props;
        return (
            <div style={{ width: 250 }}>
                {user.name === '' ? (
                    <button style={styles.facebookLoginBtn}>
                        <img
                            src={facebookIcon}
                            alt=""
                            style={styles.facebookLoginIcon}
                        />
                        <div style={styles.facebookLoginText}>Đăng nhập facebook</div>
                    </button>
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

    render() {
        const {
            width,
            ModalHistory,
            ModalUserInformation,
            ModalPayment,
            ModalSettings,
            addToCategory,
            formData
        } = this.state;
        const {
            categoryData,
            user,
            cart
        } = this.props;
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
                    onOk={() => this.handleOk('ModalSettings')}
                    onCancel={() => this.hideModal('ModalSettings')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalSettings')}>
                            Đóng
                        </Button>,
                        // <Button key="submit" type="primary" loading={ModalSettings.loading} onClick={() => this.handleOk('ModalSettings')}>
                        //     Đồng ý
                        // </Button>
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
                    onOk={() => this.handleOk('ModalUserInformation')}
                    onCancel={() => this.hideModal('ModalUserInformation')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalUserInformation')}>
                            Đóng
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalUserInformation.loading} onClick={() => this.handleOk('ModalUserInformation')}>
                            Đồng ý
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Họ và tên</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'fullName')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Số điện thoại</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'phoneNumber')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Địa chỉ</div>
                    <TextArea onChange={e => this.onChange(e, 'address')} />
                </Modal>
                <Modal
                    visible={ModalHistory.visible}
                    title="Lịch sử"
                    zIndex={10000}
                    onOk={() => this.handleOk('ModalHistory')}
                    onCancel={() => this.hideModal('ModalHistory')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalHistory')}>
                            Đóng
                        </Button>
                    ]}
                >
                    <div style={{ width: '100%', maxHeight: 240, overflowX: 'hidden', overflowY: 'scroll' }}>
                        {[1, 2, 3].map((item, index) =>
                            <Card
                                key={index.toString()}
                                size="small"
                                title="30/11/2019"
                                style={{
                                    width: '100%',
                                    marginTop: index === 0 ? 0 : 10
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginRight: 5 }}>-</div>
                                        <div style={{ marginRight: 5, fontWeight: 'bold' }}>Bánh mì ABC</div>
                                        <div>x5</div>
                                        <div style={{ marginLeft: 5 }}>(50.000đ)</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                                        <div style={{ marginRight: 5 }}>Tổng tiền:</div>
                                        <div>50.000đ</div>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </Modal>
                <Modal
                    visible={ModalPayment.visible}
                    title="Thanh toán đơn hàng"
                    zIndex={10000}
                    onOk={() => this.handleOk('ModalPayment')}
                    onCancel={() => this.hideModal('ModalPayment')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalPayment')}>
                            Đóng
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalPayment.loading} onClick={() => this.handleOk('ModalPayment')}>
                            Đồng ý
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Người đặt</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'orderBy')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Số điện thoại</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'orderPhoneNumber')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Địa chỉ</div>
                    <TextArea style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'orderAddress')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Ghi chú</div>
                    <TextArea style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'orderDescription')} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>Hình thức thanh toán:</div>
                        <div style={{ fontWeight: 'bold', marginLeft: 5 }}>Tiền mặt</div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default ComponentPage;