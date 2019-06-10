import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoaded: true
        }
    }

    render() {
        return (
            <div>
                Home Page
                <br></br>
                <Link style={{ textDecoration: "none", color: "red" }} to="/cailoz"> Nhấn vào </Link>
                <br></br>
                <button onClick={this.props.Tanglen}>+</button>
                <div style={{
                    display: "inline",
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    {this.props.data}
                </div>
                <button onClick={this.props.Giamxuong}>-</button>
            </div>
        );
    }

};

export default HomePage;