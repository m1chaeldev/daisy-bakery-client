import React, { Component } from 'react';
import { Row, Col } from 'antd';

// Styles
import styles from './styles';

const logoImg = require('./../../images/logo.png');

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { bgColor } = this.props;
        return (
            <Row>
                <Col span={24} style={{ ...styles.background, backgroundColor: bgColor ? bgColor : '#eae7dc' }}>
                    <img
                        src={logoImg}
                        alt="Daisy bakery"
                        style={styles.logo}
                        onClick={this.props.handleClickLogo}
                    />
                </Col>
            </Row >
        );
    }
};

export default ComponentPage;
