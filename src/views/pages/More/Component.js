import React, { Component } from 'react';
import { Col, message, Dropdown, Button, Icon, Menu, Modal, Input, Upload, Select } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';
// import LoadingIcon from './../../commons/components/LoadingIcon';
import ListCakes from './../../commons/components/ListCakes';
import CartAndUser from './../../commons/components/CartAndUser';

// Styles
import styles from './styles';
import './styles.css';

const { moment } = require('moment');
const { Option } = Select;
const shopPhone = '0349445935';

// const facebookIcon = require('./../../commons/images/icons/facebook.png');
// const rightArrowIcon = require('./../../commons/images/icons/right-arrow.png');
// const pinIcon = require('./../../commons/images/icons/pin.png');
// const phoneIcon = require('./../../commons/images/icons/phone.png');
// const gmailIcon = require('./../../commons/images/icons/gmail.png');
// const userIcon = require('./../../commons/images/icons/user.png');
// const cartIcon = require('./../../commons/images/icons/cart.png');

// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cakeCategoryEdit: '',
            cakeData: null,
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
        const { cart, updateUserCart } = this.props;
        const newCart = cart;
        const isExist = newCart.findIndex(obj => obj.name === item.name);
        if (isExist === -1) {
            let bakery = [...newCart];
            const newItem = { ...item, amount: 1 };
            bakery.push(newItem);
            updateUserCart(bakery);
            message.success(`Đã thêm "${item.name}" vào giỏ hàng`);
        } else {
            let newData = newCart;
            newData[isExist].amount += 1;
            updateUserCart(newData);
        }
    };

    handleClickEdit = (e, item) => {
        e.stopPropagation();
        message.success(item.name);
    };

    isNewCake = (startedDate) => {
        const date = new Date();
        let validDate = new Date(startedDate);
        validDate = new Date(validDate.getFullYear(), validDate.getMonth(), validDate.getDate() + 8);
        if (validDate >= date) return true;
        return false;
    };

    getCakeData = (category) => {
        const { cakeData } = this.props;
        let data = cakeData ? cakeData.filter(obj => obj.category === category._id) : [];
        return data;
    };

    getDropdownOptions = (category) => {
        const { categoryData } = this.props;
        const { child } = categoryData;
        const childList = child ? child.filter(obj => obj.category === category._id) : [];
        return (
            <Select
                style={{ width: 150 }}
                defaultValue=""
                onChange={this.handleCategorySelectChange}
            >
                <Option value="">Tất cả</Option>
                {childList.map(item => (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                ))}
            </Select>
        );
    };

    handleCategorySelectChange = (value) => {
        const { cakeData } = this.props;
        const { category } = this.props.match.params;
        let data = cakeData ? cakeData.filter(obj => obj.category_child.includes(value) && obj.category.includes(category)) : [];
        this.setState({ cakeData: data });
    };

    getFirstData = () => {
        const { categoryData } = this.props;
        const { category } = this.props.match.params;
        const categoryList = categoryData && categoryData.data ? categoryData.data.filter(obj => obj._id === category) : [];
        const data = categoryList && categoryList[0] ? this.getCakeData(categoryList[0]) : [];
        return data;
    };

    render() {
        const { width, cakeData } = this.state;
        const { user, categoryData } = this.props;
        const { category } = this.props.match.params;
        const categoryList = categoryData && categoryData.data ? categoryData.data.filter(obj => obj._id === category) : [];
        console.log(cakeData, '123123');
        return (
            <div style={styles.container}>
                <Header handleClickLogo={() => this.handleClickHMenuIcon('/home')} />
                <Slider />
                <div style={styles.content}>
                    <CartAndUser {...this.props} />
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ marginBottom: 20 }}>
                        <div style={styles.eachCategory}>
                            <div style={styles.categoryTitleWrapper}>
                                <div style={styles.categoryTitleText}>{categoryList && categoryList[0] ? categoryList[0].name : ''}</div>
                            </div>
                            <div style={styles.categoryOptionsWrapper}>
                                {this.getDropdownOptions(categoryList && categoryList[0] ? categoryList[0] : {})}
                            </div>
                            <div>
                                <ListCakes
                                    data={cakeData === null ? this.getFirstData() : cakeData}
                                    user={user}
                                    handleClickBuyBakery={this.handleClickBuyBakery}
                                    handleClickEdit={this.handleClickEdit}
                                    isNewCake={this.isNewCake}
                                />
                            </div>
                        </div>
                    </Col>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
            </div>
        );
    }
};

export default ComponentPage;