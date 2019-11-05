import React, { Component } from 'react';
import { Row, Col } from 'antd';

// Styles
import styles from './styles';
import './style.css';

const editIcon = require('./../../images/icons/edit.png');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { data, limit, handleClickBuyBakery, user, handleClickEdit, isNewCake } = this.props;
        const limitCakes = limit ? limit : 1000000;
        return (
            <Row gutter={[10, 10]}>
                {data.map((item, index) => index < limitCakes && (
                    <Col
                        key={item.id}
                        xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}
                        onClick={() => handleClickBuyBakery(item)}
                        style={styles.eachBakery}
                        className="EachBakery"
                    >
                        <div style={styles.bakeryImageWrapper}>
                            <img src={item.cake_image} alt={item.cake_name} style={styles.bakeryImage} />
                            {item.is_out_stock === true && (
                                <div style={styles.bakeryShadowWrapper}>
                                    <div style={styles.outOfBakeryWrapper}>
                                        <div style={styles.outOfBakeryText}>Tạm hết</div>
                                    </div>
                                </div>
                            )}
                            {isNewCake(item.cake_startedDate) && (
                                <div style={{
                                    ...styles.bakeryShadowWrapper,
                                    backgroundColor: 'transparent'
                                }}>
                                    <div style={styles.newBakeryWrapper}>
                                        <div style={{
                                            ...styles.outOfBakeryText,
                                            fontWeight: 100,
                                            fontStyle: 'italic'
                                        }}>Bánh mới</div>
                                    </div>
                                </div>
                            )}
                            {user.role === 'Admin' && (
                                <img
                                    src={editIcon}
                                    alt=""
                                    style={styles.editIcon}
                                    onClick={e => handleClickEdit(e, item)}
                                />
                            )}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <div style={styles.bakeryName}>{item.cake_name}</div>
                            <div style={styles.bakeryCode}># {item.cake_code}</div>
                            <div style={styles.bakeryPrice}>VND {numberWithCommas(item.cake_price)}</div>
                        </div>
                    </Col>
                ))}
            </Row>
        );
    }
};

export default ComponentPage;
