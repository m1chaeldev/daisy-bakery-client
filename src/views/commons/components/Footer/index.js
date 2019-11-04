import React, { Component } from 'react';
import { Col } from 'antd';

// Styles
import styles from './styles';

const shopFacebook = 'Daisy Bakery';
const shopFacebookUrl = 'https://www.facebook.com/';
const shopInstagram = 'Daisy Bakery';
const shopInstagramUrl = 'https://www.instagram.com/';
const shopGmail = 'example@gmail.com';
const shopPhone = '0349445935';
const shopName = 'Daisy Bakery';

const footerImg = require('./../../../commons/images/footer.jpg');
const phoneIcon = require('./../../../commons/images/icons/phone.png');
const gmailColorIcon = require('./../../../commons/images/icons/gmail-color.png');
const facebookIcon = require('./../../../commons/images/icons/facebook.png');
// const instagramIcon = require('./../../../commons/images/icons/instagram.png');
const instagramcolorIcon = require('./../../../commons/images/icons/instagram-color.png');
const logoIcon = require('./../../../commons/images/logo.png');

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { width, developerGoto } = this.props;
        return (
            <div>
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
                                            onClick={() => developerGoto(shopFacebookUrl)}
                                            style={styles.daisyInfo}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={facebookIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopFacebook}</div>
                                        </div>
                                        <div
                                            onClick={() => developerGoto(shopInstagramUrl)}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={instagramcolorIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopInstagram}</div>
                                        </div>
                                        <div
                                            onClick={() => developerGoto('https://www.facebook.com/profile.php?id=100013727719041')}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img src={gmailColorIcon} alt="" style={styles.footerIcon} />
                                            </div>
                                            <div style={styles.footerText}>{shopGmail}</div>
                                        </div>
                                        <div
                                            onClick={() => developerGoto('https://www.facebook.com/profile.php?id=100013727719041')}
                                            style={{ ...styles.daisyInfo, marginTop: 10 }}
                                        >
                                            <div style={styles.iconWrapper}>
                                                <img
                                                    src={phoneIcon}
                                                    alt=""
                                                    style={{
                                                        ...styles.footerIcon,
                                                        filter: 'invert(38%) sepia(81%) saturate(902%) hue-rotate(326deg) brightness(99%) contrast(84%)'
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
                    <div style={styles.noCopyrightText}>
                        2019 &copy; {shopName}, made with luv by
                    <div
                            style={styles.developer}
                            onClick={() => developerGoto('https://www.facebook.com/Thai.Nguyen.3003')}
                        >Michael Nguyen</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ComponentPage;
