import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import './HeaderAdmin.scss';
import bk_logo from '../../assets/bk_logo.png';
// import { FALSE } from "node-sass";

class HeaderAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            clickDropDown: false,
        };
    }
    componentDidMount() { }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
    }
    handleOnClickDrop = () => {
        this.setState({
            clickDropDown: !this.state.clickDropDown,
        });
    };
    logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    };
    render() {
        return (
            <React.Fragment>
                <div className='home-header-admin-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className="header-logo"><img className="homepage-adimin-logo" src={bk_logo} /></div>

                            <div className='ssps'>SSPO</div>
                        </div>
                        <div className='center-content'></div>
                        <div className='language'>
                            <div className="language-top"><i className="fas fa-globe"></i>Ngôn ngữ</div>
                            <select className="language-bottom">
                                <option>Tiếng Việt</option>
                                <option>Tiếng Anh</option>
                            </select>
                            <div
                                className={`container-opt ${this.state.clickDropDown ? "show" : ""
                                    }`}
                            >
                                <div className="txt">Hồ sơ</div>
                                <div className="txt" onClick={() => this.logout()}>
                                    Đăng xuất
                                </div>
                            </div>
                        </div>
                        <div className="icon-admin" onClick={() => this.handleOnClickDrop()}>
                            <img src={this.state.user.picture} alt="profile" />
                            <i className="fas fa-caret-down dropdown"></i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
