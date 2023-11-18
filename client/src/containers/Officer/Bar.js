import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import './Bar.scss';
// import { FALSE } from "node-sass";
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }
    componentDidMount() { }
    render() {
        return (
            <div className="homepage-admin-banner">
                {/* <div onClick={() => this.openBar()} className={this.state.isOpen ? "open" : "close"}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className={this.state.isOpen ? "close" : "open-bar"}>
              <div onClick={() => this.openBar()} className="homepage-admin-menu">
                MENU
              </div>
              <div className="homepage-admin-section">
                Quản lí sinh viên
              </div>
              <div className="homepage-admin-section">
                Quản lí máy in
              </div>
              <div className="homepage-admin-section">
                Xem lịch sử in
              </div>
            </div> */}
                <div className="homepage-admin-bar">
                    <div className="homepage-admin-menu">
                        MENU
                    </div>
                    <div className="homepage-admin-section">
                        Quản lí sinh viên
                    </div>
                    <div className="homepage-admin-section">
                        Quản lí máy in
                    </div>
                    <div className="homepage-admin-section">
                        Xem lịch sử in
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
