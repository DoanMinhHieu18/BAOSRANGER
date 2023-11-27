import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import upload_image from "../../assets/upload1.jpg";
import icon_word from "../../assets/icon-word.png";
import icon_pdf from "../../assets/PDF_icon.svg.png";
import printerIcon from "../../assets/PrinterIcon.png";
import { toast } from "react-toastify";
import "./ModalSetupPrint.scss";
class ModalSetUpPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    toggle = () => {
        this.props.toggleFromParent();
    };
    async componentDidMount() {
        await this.getPrinter()
        await this.getPrinterTime()
    }
    getPrinter = async () => {
        const url = `${process.env.REACT_APP_API_URL}/api/getallprinter`;
        const { data } = await axios({
            url: url,
            method: "POST",
            withCredentials: true,
        });
    }
    getPrinterTime = async () => {
        const test = {
            printerid: "1"
        }
        const url1 = `${process.env.REACT_APP_API_URL}/api/getprintertime`;
        const { data } = await axios({
            url: url1,
            method: "POST",
            data: test,
            withCredentials: true,
        });
    }
    testConfig = () => {
        const data = {
            printerid: "1",
            time: "6h-7h",
        }
        this.props.handle(data)
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className="modal-setup-print"
                size="lg"

            >

                <div className="modal-header-setup" toggle={() => this.toggle()}>
                    <div className="chooseMachine">
                        Chọn máy in
                    </div>
                    <div onClick={() => this.toggle()} className="button-goBack">
                        <i className="fas fa-solid fa-arrow-left"></i>
                    </div>

                </div>
                <div className="modal-body-one-setup">
                    <div className="MachineList">
                        <div className="Machine">
                            <img src={printerIcon} className="PrinterIcon" />
                            <div className="Status">
                                <div className="PrinterType">
                                    Máy in 2021
                                </div>
                                <div className="PrinterStatus">
                                    <i className="fas fa-solid fa-check Icon"></i>
                                    <div className="StatusText">
                                        Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Machine">
                            <img src={printerIcon} className="PrinterIcon" />
                            <div className="Status">
                                <div className="PrinterType">
                                    Máy in 2021
                                </div>
                                <div className="PrinterStatus">
                                    <i className="fas fa-solid fa-check Icon"></i>
                                    <div className="StatusText">
                                        Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="MachineList">
                        <div className="Machine">
                            <img src={printerIcon} className="PrinterIcon" />
                            <div className="Status">
                                <div className="PrinterType">
                                    Máy in 2021
                                </div>
                                <div className="PrinterStatus">
                                    <i className="fas fa-solid fa-check Icon"></i>
                                    <div className="StatusText">
                                        Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Machine">
                            <img src={printerIcon} className="PrinterIcon" />
                            <div className="Status">
                                <div className="PrinterType">
                                    Máy in 2021
                                </div>
                                <div className="PrinterStatus">
                                    <i className="fas fa-solid fa-check Icon"></i>
                                    <div className="StatusText">
                                        Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-body-two-setup">
                    <div className="body-two-header">
                        Chọn thời gian lấy tài liệu
                    </div>
                    <select className="SelectOption">
                        <option>Unknown</option>
                        <option>DEF</option>
                    </select>
                </div>
                <div className="modal-footer-setup">
                    <button className="ConfirmButton" onClick={() => this.testConfig()}>
                        Xác nhận
                    </button>
                    <button className="CancelButton">
                        Hủy
                    </button>
                </div>
            </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSetUpPrint);