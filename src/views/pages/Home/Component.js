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

const { Option } = Select;
const shopPhone = '0349445935';

// const facebookIcon = require('./../../commons/images/icons/facebook.png');
// const rightArrowIcon = require('./../../commons/images/icons/right-arrow.png');
// const pinIcon = require('./../../commons/images/icons/pin.png');
// const phoneIcon = require('./../../commons/images/icons/phone.png');
// const gmailIcon = require('./../../commons/images/icons/gmail.png');
// const userIcon = require('./../../commons/images/icons/user.png');
// const cartIcon = require('./../../commons/images/icons/cart.png');

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
        cake_price: '10000',
        cake_startedDate: new Date(2019, 9, 24),
        is_out_stock: true,
        saleOff: '25'
    },
    {
        id: '4',
        cake_image: require('./../../commons/images/bakery3.jpg'),
        cake_name: 'Bánh mì Def',
        cake_category: 'Bánh mì 2',
        cake_code: 'SW168',
        cake_price: '50000',
        cake_startedDate: new Date(2019, 10, 3),
        is_out_stock: false
    },
    {
        id: '5',
        cake_image: require('./../../commons/images/bakery3.jpg'),
        cake_name: 'Bánh mì Def 1',
        cake_category: 'Bánh mì 2',
        cake_code: 'SW168',
        cake_price: '50000',
        cake_startedDate: new Date(2019, 10, 3),
        is_out_stock: false
    },
    {
        id: '6',
        cake_image: require('./../../commons/images/bakery3.jpg'),
        cake_name: 'Bánh mì Def 2',
        cake_category: 'Bánh mì 2',
        cake_code: 'SW168',
        cake_price: '50000',
        cake_startedDate: new Date(2019, 10, 3),
        is_out_stock: false
    },
    {
        id: '7',
        cake_image: require('./../../commons/images/bakery3.jpg'),
        cake_name: 'Bánh mì Def 3',
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
            user: {
                role: 'Admin',
                name: 'Thái Nguyễn'
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
            ModalAddCake: {
                loading: false,
                visible: false
            },
            formData: {
                cakeName: '',
                cakeCategory: '',
                cakePrice: '',
                cakeIsOutStock: '',
                cakeSaleOff: ''
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

    handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    };

    onChange = (e, key) => {
        const { value } = e.target;
        const { formData } = this.state;
        let newData = formData;
        newData[key] = value;
        this.setState({ formData: newData });
    };

    addNewCake = (category) => {
        this.setState({ cakeCategoryEdit: category.name });
        this.showModal('ModalAddCake');
    };

    render() {
        const { width, user, categorySelected, categoryData, ModalAddCake, cakeImage, cakeCategoryEdit } = this.state;
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
                                                onClick={() => this.addNewCake(category)}
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
                                    // limit={3}
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
                <Modal
                    visible={ModalAddCake.visible}
                    title={`Thêm bánh - ${cakeCategoryEdit}`}
                    onOk={() => this.handleOk('ModalAddCake')}
                    onCancel={() => this.handleCancel('ModalAddCake')}
                    footer={[
                        <Button key="back" onClick={() => this.handleCancel('ModalAddCake')}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalAddCake.loading} onClick={() => this.handleOk('ModalAddCake')}>
                            Save
                        </Button>
                    ]}
                >
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Tên bánh</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'cakeName')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Danh mục</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'cakeCategory')} />
                    <div style={{ fontSize: '0.9rem', marginBottom: 5 }}>Giá</div>
                    <Input style={{ marginBottom: 10 }} onChange={e => this.onChange(e, 'cakePrice')} />
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, marginRight: 20 }}>
                            <Select defaultValue="outStock" style={{ width: 120 }} onChange={this.handleSelectChange}>
                                <Option value="inStock">Còn hàng</Option>
                                <Option value="outStock">Hết hàng</Option>
                            </Select>
                            <div style={{ fontSize: '0.9rem', marginBottom: 5, marginTop: 5 }}>Giảm giá</div>
                            <Input onChange={e => this.onChange(e, 'cakeSaleOff')} />
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