import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import { Row, Col } from 'antd';

// Styles
import styles from './styles';

// Constants
const slideImages = [
    {
        name: 'Quảng cáo 1',
        image: 'https://www.goodlady.com.sg/image/cache/catalog/Cart/banner-1920x450.jpg'
    },
    {
        name: 'Quảng cáo 2',
        image: 'https://lifelabtesting.com/wp-content/uploads/2018/12/Blog-banner-template_0006_Layer-4-1920x450-1.jpg'
    },
    {
        name: 'Quảng cáo 3',
        image: 'https://www.weightwatchersshop.co.uk/media/simpleslider/30-minute-meals-ecommerce-banner-cropped-1920x450.jpg'
    }
];

const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

class ComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Row>
                {/* <Col md={24}>
                    <div style={styles.hotMovieBackground}>
                        <Link style={{ textDecoration: "none" }} to="/home">
                            <div style={styles.hotMovie}>
                                {this.props.text}
                            </div>
                        </Link>
                    </div>
                </Col> */}
                <Col span={24}>
                    <Slide {...properties}>
                        {slideImages.map((img, index) => (
                            <div key={index}>
                                <img
                                    style={styles.eachSlide}
                                    src={img.image}
                                    alt={img.name} />
                            </div>
                        ))}
                    </Slide>
                </Col>
            </Row >
        );
    }
};

export default ComponentPage;
