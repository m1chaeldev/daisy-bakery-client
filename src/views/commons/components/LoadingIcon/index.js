import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (<Spin indicator={antIcon} />);
    }
};

export default ComponentPage;
