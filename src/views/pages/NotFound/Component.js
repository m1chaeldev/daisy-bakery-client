import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './../../commons/components/Header';
import Slider from './../../commons/components/Slider';

// Styles
import styles from './styles';

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoaded: true
        }
    }

    handleClickLogo = () => {
        const { history } = this.props;
        history.push('/home');
    }

    render() {
        return (
            <div style={styles.container}>
                <Header handleClickLogo={this.handleClickLogo} />
                <Slider />
                404 - Not found
            </div>
        );
    }

};

export default ComponentPage;