import React, { Component } from 'react';
import { Row, Col, Empty } from 'antd';

// Styles
import styles from './styles';
import './style.css';

const editIcon = require('./../../images/icons/edit.png');
const deleteIcon = require('./../../images/icons/delete.png');

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ComponentPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	calcPercent = (percent, total) => {
		let result = 0;
		result = Number(percent) * Number(total) / 100;
		return result.toFixed(0);
	};

	render() {
		const {
			data,
			limit,
			handleClickBuyBakery,
			user,
			handleClickEdit,
			handleClickDelete,
			isNewCake } = this.props;
		const limitCakes = limit ? limit : 1000000;
		return (
			<Row gutter={[10, 10]}>
				{data && data.length > 0 ? data.map((item, index) => index < limitCakes && (
					<Col
						key={item._id}
						xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}
						onClick={() => handleClickBuyBakery(item, Number(item.price) - this.calcPercent(item.sale_off, item.price))}
						style={styles.eachBakery}
						className="EachBakery"
					>
						<div style={styles.bakeryImageWrapper}>
							<img src={item.image} alt={item.name} style={styles.bakeryImage} />
							{item.is_out_stock === true && (
								<div style={styles.bakeryShadowWrapper}>
									<div style={styles.outOfBakeryWrapper}>
										<div style={styles.outOfBakeryText}>Tạm hết</div>
									</div>
								</div>
							)}
							{isNewCake(item.started_date) && (
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
							{user.level === 'Admin' && (
								<div>
									<img
										src={editIcon}
										alt=""
										style={{ ...styles.editIcon, right: 30 }}
										onClick={e => handleClickEdit(e, item)}
									/>
									<img
										src={deleteIcon}
										alt=""
										style={styles.editIcon}
										onClick={e => handleClickDelete(e, item)}
									/>
								</div>
							)}
						</div>
						<div style={{ textAlign: 'center', marginTop: 10 }}>
							<div style={styles.bakeryName}>{item.name}</div>
							<div style={styles.bakeryCode}># {item.code}</div>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<div style={item.sale_off && Number(item.sale_off) > 0 ? styles.bakeryPriceSaleOff : styles.bakeryPrice}>{numberWithCommas(item.price)}đ</div>
								{item.sale_off && Number(item.sale_off) > 0 && (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div style={{ ...styles.bakeryPrice, marginLeft: 10, marginRight: 5 }}>{numberWithCommas(Number(item.price) - this.calcPercent(item.sale_off, item.price))}đ</div>
										<div style={{ ...styles.bakeryPrice, color: 'red', fontWeight: 'normal', fontStyle: 'italic' }}>-{item.sale_off}%</div>
									</div>
								)}
							</div>
						</div>
					</Col>
				)) : <Empty description="Danh mục này hiện chưa có sản phẩm" />}
			</Row>
		);
	}
};

export default ComponentPage;
