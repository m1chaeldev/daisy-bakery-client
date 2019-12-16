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
            ModalAddCake: {
                loading: false,
                visible: false
            },
            formData: {
                name: '',
                image: '',
                is_out_stock: 'false',
                category: '',
                category_child: '',
                code: '',
                price: '',
                sale_off: '',
                serverKey: 'tuoilzphaduoctao123'
            },
            cakeImage: null,
            loading: null,
            cakeCategoryEdit: '',
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

    showModal = (state) => {
        const { ModalAddCake } = this.state;
        if (state === 'ModalAddCake') {
            let newData = ModalAddCake;
            newData.visible = true;
            this.setState({
                ModalAddCake: newData,
            });
        }
    };

    handleOk = (state) => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = (state) => {
        const { ModalAddCake } = this.state;
        if (state === 'ModalAddCake') {
            let newData = ModalAddCake;
            newData.visible = false;
            this.setState({
                ModalAddCake: newData,
            });
        }
    };

    handleUploadChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    cakeImage: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    onChangeFormData = (value, key) => {
        const { formData } = this.state;
        let newData = formData;
        newData[key] = value;
        this.setState({ formData: newData });
    };

    getChildCategories = (category) => {
        const { categoryData } = this.props;
        const child = categoryData && categoryData.child ? categoryData.child.filter(obj => obj.category === category._id) : [];
        return child;
    };

    addNewCake = (category) => {
        const { categoryData } = this.props;
        const { formData } = this.state;
        const newData = formData;
        newData.category = category._id;
        const child = categoryData && categoryData.child ? categoryData.child.filter(obj => obj.category === category._id) : [];
        newData.category_child = child.length > 0 ? child[0]._id : null;
        this.setState({ cakeCategoryEdit: category, formData: newData });
        this.showModal('ModalAddCake');
    };

    getCakeData = (category) => {
        const { cakeData } = this.props;
        let data = cakeData.filter(obj => obj.category === category._id);
        return data;
    };

    render() {
        const { width, ModalAddCake, cakeImage, cakeCategoryEdit, loading, formData } = this.state;
        const { categoryData, user } = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={styles.container}>
                <Header handleClickLogo={() => this.handleClickHMenuIcon('/home')} />
                <Slider />
                <div style={styles.content}>
                    <CartAndUser {...this.props} />
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} style={{ marginBottom: 20 }}>
                        {categoryData && categoryData.data && categoryData.data.length > 0 ? categoryData.data.map((category, ind) => (
                            <div key={category._id} style={styles.eachCategory}>
                                <div style={styles.categoryTitleWrapper}>
                                    <div style={styles.categoryTitleText}>{category.name}</div>
                                </div>
                                {user.level === 'Admin' && (
                                    <div style={styles.categoryOptionsWrapper}>
                                        <div style={{ width: 1, height: 20 }}></div>
                                        <div style={styles.addCakeWrapper}>
                                            <Button
                                                icon="plus"
                                                loading={false}
                                                onClick={() => this.addNewCake(category)}
                                            >
                                                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Thêm bánh</span>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <ListCakes
                                        data={this.getCakeData(category)}
                                        user={user}
                                        handleClickBuyBakery={this.handleClickBuyBakery}
                                        handleClickEdit={this.handleClickEdit}
                                        isNewCake={this.isNewCake}
                                        limit={3}
                                    />
                                    <div style={styles.showMoreWrapper}>
                                        <div
                                            onClick={() => this.handleClickHMenuIcon(`more/${category._id}`)}
                                            style={{
                                                ...styles.bakeryName,
                                                ...styles.showMoreText
                                            }}>Xem thêm...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </Col>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
                <Modal
                    visible={ModalAddCake.visible}
                    title={`Thêm bánh - ${cakeCategoryEdit.name}`}
                    onOk={() => this.handleOk('ModalAddCake')}
                    onCancel={() => this.handleCancel('ModalAddCake')}
                    footer={[
                        <Button key="back" onClick={() => this.handleCancel('ModalAddCake')}>
                            Đóng
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={ModalAddCake.loading || loading ? true : false}
                            onClick={() => this.handleOk('ModalAddCake')}
                        >
                            Đồng ý
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Tên bánh</div>
                    <Input
                        style={{ marginBottom: 10 }}
                        value={formData.name}
                        onChange={e => this.onChangeFormData(e.target.value, 'name')}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục</div>
                    <Select
                        value={formData.category_child}
                        style={{ width: '100%', marginBottom: 5 }}
                        onChange={value => this.onChangeFormData(value, 'category_child')}
                    >
                        {this.getChildCategories(cakeCategoryEdit).map(child => (
                            <Option key={child._id} value={child._id}>{child.name}</Option>
                        ))}
                    </Select>
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Giá</div>
                    <Input
                        style={{ marginBottom: 10 }}
                        value={formData.price}
                        onChange={e => this.onChangeFormData(e.target.value, 'price')}
                    />
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, marginRight: 20 }}>
                            <Select
                                style={{ width: 120 }}
                                value={formData.is_out_stock}
                                onChange={value => this.onChangeFormData(value, 'is_out_stock')}
                            >
                                <Option value="false">Còn hàng</Option>
                                <Option value="true">Hết hàng</Option>
                            </Select>
                            <div style={{ fontSize: '0.9rem', marginBottom: 5, marginTop: 5 }}>Giảm giá</div>
                            <Input
                                value={formData.sale_off}
                                onChange={e => this.onChangeFormData(e.target.value, 'sale_off')}
                            />
                        </div>
                        <div>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleUploadChange}
                            >
                                {cakeImage ? <img src={cakeImage} alt="" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default ComponentPage;