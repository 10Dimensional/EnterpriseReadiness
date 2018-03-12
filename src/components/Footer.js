import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <footer className={this.props.isFixed ? 'fixed-footer' : ''}>
                <div> </div>
            </footer>
        )
    }
}


export default Footer;