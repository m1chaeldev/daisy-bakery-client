import React, { Component } from 'react';
import { Col, message, Button, Icon, Modal, Input, Upload, Select } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';
// import LoadingIcon from './../../commons/components/LoadingIcon';
import ListCakes from './../../commons/components/ListCakes';
import CartAndUser from './../../commons/components/CartAndUser';

// Styles
import styles from './styles';
import './styles.css';

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
                id: '',
                name: '',
                image: null,
                is_out_stock: 'false',
                category: null,
                category_child: null,
                code: '',
                price: '',
                sale_off: '',
                serverKey: 'tuoilzphaduoctao123'
            },
            loading: null,
            cakeCategoryEdit: '',
            mode: 'create',
            width: 0,
            height: 0,
            cakeData: null
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

    handleClickBuyBakery = (item, price) => {
        if (item.is_out_stock) return message.error(`Bánh này hiện tại đã hết, vui lòng liên hệ ${shopPhone}`);
        const { cart, updateUserCart } = this.props;
        const newCart = cart;
        const isExist = newCart.findIndex(obj => obj.name === item.name);
        if (isExist === -1) {
            let bakery = [...newCart];
            const newItem = { ...item, amount: 1, price };
            bakery.push(newItem);
            updateUserCart(bakery);
            message.success(`Đã thêm "${item.name}" vào giỏ hàng`);
        } else {
            let newData = newCart;
            newData[isExist].amount += 1;
            updateUserCart(newData);
        }
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

    resetFormData = () => {
        const data = {
            id: '',
            name: '',
            image: null,
            is_out_stock: 'false',
            category: null,
            category_child: null,
            code: '',
            price: '',
            sale_off: '',
            serverKey: 'tuoilzphaduoctao123'
        };
        this.setState({ formData: data });
    };

    handleEditCake = async (e, item) => {
        e.stopPropagation();
        await this.resetFormData();
        const { formData } = this.state;
        const { categoryData } = this.props;
        const categories = categoryData && categoryData.data ? categoryData.data.filter(obj => obj._id === item.category) : [];
        const newData = formData;
        newData.id = item._id;
        newData.name = item.name;
        newData.image = item.image;
        newData.is_out_stock = item.is_out_stock === false ? 'false' : 'true';
        newData.category = item.category;
        newData.category_child = item.category_child;
        newData.code = item.code;
        newData.price = item.price;
        newData.sale_off = item.sale_off;
        this.setState({ cakeCategoryEdit: categories[0], formData: newData, mode: 'edit' });
        this.showModal('ModalAddCake');
    };

    handleDeleteCake = async (e, item) => {
        e.stopPropagation();
        const { deleteCakeRequest } = this.props;
        if (window.confirm("Dữ liệu sẽ biến mất vĩnh viễn nếu bạn xóa")) {
            deleteCakeRequest({
                id: item._id,
                serverKey: 'tuoilzphaduoctao123'
            });
        }
    };

    handleCreateCake = async (category) => {
        const { categoryData } = this.props;
        await this.resetFormData();
        const { formData } = this.state;
        const newData = formData;
        newData.category = category._id;
        const child = categoryData && categoryData.child ? categoryData.child.filter(obj => obj.category === category._id) : [];
        newData.category_child = child.length > 0 ? child[0]._id : null;
        this.setState({ cakeCategoryEdit: category, formData: newData, mode: 'create' });
        this.showModal('ModalAddCake');
    };

    getChildCategories = (category) => {
        const { categoryData } = this.props;
        const child = categoryData && categoryData.child ? categoryData.child.filter(obj => obj.category === category._id) : [];
        return child;
    };

    getCategories = (category) => {
        const { categoryData } = this.props;
        const categories = categoryData && categoryData.data ? categoryData.data.filter(obj => obj._id === category._id) : [];
        return categories;
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

    hideModal = (state) => {
        const { ModalAddCake } = this.state;
        if (state === 'ModalAddCake') {
            let newData = ModalAddCake;
            newData.visible = false;
            this.setState({
                ModalAddCake: newData,
            });
        }
    };

    onChangeFormData = (value, key) => {
        const { formData } = this.state;
        let newData = formData;
        newData[key] = value;
        this.setState({ formData: newData });
    };

    onSubmitCreateCake = () => {
        const { formData, mode } = this.state;
        if (formData.name.length > 0 && formData.code.length > 0 && Number(formData.price) > 0
            && Number(formData.sale_off) > 0 && formData.image) {
            const {
                createCakeRequest,
                updateCakeRequest
            } = this.props;
            if (mode === 'create') createCakeRequest(formData);
            else updateCakeRequest(formData);
            this.hideModal('ModalAddCake');
        } else message.error('Vui lòng nhập đầy đủ các thông tin');
    };

    render() {
        const { width, cakeData, formData, cakeCategoryEdit, ModalAddCake, loading } = this.state;
        const { user, categoryData } = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { category } = this.props.match.params;
        const categoryList = categoryData && categoryData.data ? categoryData.data.filter(obj => obj._id === category) : [];
        return (
            <div style={styles.container}>
                <Header handleClickLogo={() => this.handleClickHMenuIcon('/home')} />
                <Slider />
                <div style={styles.content}>
                    <CartAndUser />
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
                                    handleClickEdit={this.handleEditCake}
                                    handleClickDelete={this.handleDeleteCake}
                                    isNewCake={this.isNewCake}
                                />
                            </div>
                        </div>
                    </Col>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
                <Modal
                    visible={ModalAddCake.visible}
                    title={`Thêm bánh - ${cakeCategoryEdit.name}`}
                    onOk={this.onSubmitCreateCake}
                    onCancel={() => this.hideModal('ModalAddCake')}
                    footer={[
                        <Button key="back" onClick={() => this.hideModal('ModalAddCake')}>
                            Đóng
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={ModalAddCake.loading || loading ? true : false}
                            onClick={this.onSubmitCreateCake}
                        >
                            Đồng ý
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Tên bánh</div>
                    <Input
                        placeholder="Nhập tên bánh"
                        style={{ marginBottom: 10, color: 'black' }}
                        value={formData.name}
                        onChange={e => this.onChangeFormData(e.target.value, 'name')}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Mã bánh</div>
                    <Input
                        placeholder="Nhập mã bánh"
                        style={{ marginBottom: 10, color: 'black' }}
                        value={formData.code}
                        onChange={e => this.onChangeFormData(e.target.value, 'code')}
                    />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục</div>
                    <Select
                        value={formData.category}
                        disabled
                        style={{ width: '100%', marginBottom: 5 }}
                    >
                        {this.getCategories(cakeCategoryEdit).map(category => (
                            <Option key={category._id} value={category._id}>{category.name}</Option>
                        ))}
                    </Select>
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục con</div>
                    <Select
                        value={formData.category_child}
                        style={{ width: '100%', marginBottom: 5 }}
                        onChange={value => this.onChangeFormData(value, 'category_child')}
                    >
                        {this.getChildCategories(cakeCategoryEdit).map(child => (
                            <Option key={child._id} value={child._id}>{child.name}</Option>
                        ))}
                    </Select>
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Giá (đ)</div>
                    <Input
                        placeholder="Nhập giá bánh"
                        style={{ marginBottom: 10, color: 'black' }}
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
                            <div style={{ fontSize: '0.9rem', marginBottom: 5, marginTop: 5 }}>Giảm giá (%)</div>
                            <Input
                                placeholder="Nhập số lượng phần trăm (vd: 25)"
                                style={{ color: 'black' }}
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
                                {formData.image ? <img src={formData.image} alt="" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default ComponentPage;