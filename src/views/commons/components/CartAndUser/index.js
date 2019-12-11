import React, { Component } from 'react';
import { Input, Empty, Col, message, Popover, Button, Icon, Modal, Card } from 'antd';
// import LoadingIcon from './../../commons/components/LoadingIcon';

// Styles
import styles from './styles';
import './styles.css';

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
            cart: [
                {
                    id: '1',
                    cake_image: require('./../../images/bakery.png'),
                    cake_name: 'Bánh mì Sandwich',
                    cake_category: 'Bánh mì 1',
                    cake_code: 'SW165',
                    cake_price: '5000',
                    cake_startedDate: new Date(2019, 9, 29),
                    is_out_stock: false,
                    amount: 1
                },
                {
                    id: '2',
                    cake_image: require('./../../images/bakery.png'),
                    cake_name: 'Bánh mì Sandwich',
                    cake_category: 'Bánh mì 1',
                    cake_code: 'SW165',
                    cake_price: '10000',
                    cake_startedDate: new Date(2019, 9, 29),
                    is_out_stock: false,
                    amount: 1
                },
            ],
            user: {
                role: 'Admin',
                name: 'Thái Nguyễn'
            },
            ModalUserInformation: {
                loading: false,
                visible: false
            },
            ModalHistory: {
                loading: false,
                visible: false
            },
            ModalPayment: {
                loading: false,
                visible: false
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

    handleClickOptionUserPopover = (path) => {
        // const { history } = this.props;
        if (path === 'logout') alert('Logout')
        else this.showModal(path);
    };

    showModal = (state) => {
        const { ModalHistory, ModalUserInformation, ModalPayment } = this.state;
        if (state === 'ModalUserInformation') {
            let newData = ModalUserInformation;
            newData.visible = true;
            this.setState({
                ModalUserInformation: newData,
            });
        }
        if (state === 'ModalHistory') {
            let newData = ModalHistory;
            newData.visible = true;
            this.setState({
                ModalHistory: newData,
            });
        }
        if (state === 'ModalPayment') {
            let newData = ModalPayment;
            newData.visible = true;
            this.setState({
                ModalPayment: newData,
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
        const { ModalHistory, ModalUserInformation, ModalPayment } = this.state;
        if (state === 'ModalUserInformation') {
            let newData = ModalUserInformation;
            newData.visible = false;
            this.setState({
                ModalUserInformation: newData,
            });
        }
        if (state === 'ModalHistory') {
            let newData = ModalHistory;
            newData.visible = false;
            this.setState({
                ModalHistory: newData,
            });
        }
        if (state === 'ModalPayment') {
            let newData = ModalPayment;
            newData.visible = false;
            this.setState({
                ModalPayment: newData,
            });
        }
    };

    userPopover = () => {
        const { user } = this.state;
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
        const { cart } = this.state;
        return (
            <div style={{ width: 250 }}>
                <div style={{ width: '100%', maxHeight: 230, overflowY: 'auto', overflowX: 'hidden' }}>
                    {cart.length <= 0 ?
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
                                            }}>{numberWithCommas(Number(item.cake_price) * Number(item.amount))}đ</div>
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
        const { cart } = this.state;
        let result = 0;
        for (let index = 0; index < cart.length; index += 1) {
            const element = cart[index];
            result += Number(element.amount) * Number(element.cake_price);
        };
        return result;
    };

    searchCakes = (value) => {
        message.success(`Bạn đang tìm bánh: ${value}`);
    };

    onChange = (e, key) => {
        const { value } = e.target;
    };

    render() {
        const { width, user, cart, ModalHistory, ModalUserInformation, ModalPayment } = this.state;
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
                    visible={ModalUserInformation.visible}
                    title="Thông tin tài khoản"
                    zIndex={10000}
                    onOk={() => this.handleOk('ModalUserInformation')}
                    onCancel={() => this.handleCancel('ModalUserInformation')}
                    footer={[
                        <Button key="back" onClick={() => this.handleCancel('ModalUserInformation')}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalUserInformation.loading} onClick={() => this.handleOk('ModalUserInformation')}>
                            Save
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
                    onCancel={() => this.handleCancel('ModalHistory')}
                    footer={[
                        <Button key="back" onClick={() => this.handleCancel('ModalHistory')}>
                            Close
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
                    onCancel={() => this.handleCancel('ModalPayment')}
                    footer={[
                        <Button key="back" onClick={() => this.handleCancel('ModalPayment')}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={ModalPayment.loading} onClick={() => this.handleOk('ModalPayment')}>
                            Save
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