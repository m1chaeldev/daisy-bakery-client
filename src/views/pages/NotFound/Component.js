import React, { Component } from 'react';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';
import Footer from './../../commons/components/Footer';
import CartAndUser from './../../commons/components/CartAndUser';

// Styles
import styles from './styles';

const notFoundImg = require('./../../commons/images/404-error.png');

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const { history } = this.props;
        history.push(location);
    }

    render() {
        const { width } = this.state;
        return (
            <div style={styles.container}>
                <Header handleClickLogo={this.handleClickLogo} />
                <Slider />
                <div style={styles.content}>
                    <CartAndUser {...this.props} />
                    <div style={styles.notFoundWrapper}>
                        <img src={notFoundImg} alt="" style={styles.notFoundImg} />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50
                    }}>
                        <div
                            style={{
                                ...styles.bakeryName,
                                fontWeight: 100
                            }}>Trang này không tồn tại.
                        </div>
                        <div
                            onClick={() => this.handleClickHMenuIcon('/home')}
                            style={{
                                ...styles.bakeryName,
                                fontWeight: 100,
                                cursor: 'pointer',
                                marginLeft: 5,
                                color: '#0053a0',
                                fontFamily: 'Open Sans, sans-serif'
                            }}>Về trang chủ
                        </div>
                    </div>
                </div>
                <Footer width={width} developerGoto={this.developerGoto} />
            </div>
        );
    }
};

export default ComponentPage;