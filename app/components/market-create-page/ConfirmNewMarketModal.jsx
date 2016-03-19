let React = require("react");

let Modal = require("react-bootstrap/lib/Modal");
let Button = require("react-bootstrap/lib/Button");

let ConfirmNewMarketModal = React.createClass({

    onOpenMarketClick(event) {
        this.props.goToNextStep();
        this.props.sendNewMarketRequest();
        this.props.onHide();
    },
    onCancelClick(event) {
        this.props.onHide();
    },

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <div className="modal-body">
                    <h4>Your new market is ready to go!</h4>
                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                Before you press the button to launch, let's go over a few things one last time...
                            </p>
                            <ul>
                                <li>
                                    A $30 bond will be charged. This will be returned after expiry - unless your market
                                    is ruled unethical or cannot be expired.
                                </li>
                                <li>
                                    You'll get 50% of all fees charged during the lifetime of your market. The rest go
                                    to those reporting the outcome.
                                </li>
                                <li>
                                    Any of your initial liquidity remaining when the market expires will be returned to
                                    you - along with any profits generated by the Market Maker.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <Button
                            bsStyle="primary"
                            onClick={this.onCancelClick}>
                            Cancel
                        </Button>
                        <Button
                            className="text-capitalize"
                            bsStyle="success"
                            onClick={this.onOpenMarketClick}>
                            Open market
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = ConfirmNewMarketModal;