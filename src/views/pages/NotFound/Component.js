import React, { Component } from "react";

class NotFoundPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageLoaded: true
        }
    }

    render() {
        return (
            <div>404 - Not Found</div>
        );
    }

};

export default NotFoundPage;