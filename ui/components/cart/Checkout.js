import React from 'react';
import BillingDetailsFormView from '../profile/BillingDetailsFormView';
import * as styles from '../../common/styles';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showConfirmation: false};
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  confirmOrder() {
    this.setState({showConfirmation: true});
  }

  render() {
    return <div className="checkout">
      {this.state.showConfirmation ? (
        <div className="confirmation">
          <div className="title">Hooray! You Have Successfully Finished Your Ordered</div>
          <div className="animated zoomIn">
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </div>
          <a><i className="fa fa-calendar-check-o" aria-hidden="true" /> Notify me on the delivery date</a>
        </div>
      ) : (
        <div className="order">
          <div className="title">Completing Your Order:</div>

          <BillingDetailsFormView />

          <div className="bar">
            <div className="btn" onClick={this.confirmOrder}><i className="fa fa-shopping-cart" aria-hidden="true"/>  Finish and Pay</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .order {
          display: flexbox;
          flex-direction: column;
        }
        .order .bar {
          padding-top: 20px;
          display: flexbox;
          justify-content: center;
        }
        .order .btn {
          width: 200px;
          font-size: 1.3em;
        }
        .order .title {
          font-size: 1.1em;
          font-weight: bold;
        }

        .confirmation {
          width: 250px;
        }
        .confirmation .title {
          font-size: 1.2em;
          line-height: 1.5em;
          text-align: center;
        }
        .confirmation .animated i {
          display: block;
          font-size: 10em;
          color: ${styles.colorGreen};
          text-align: center;
          padding: 20px 0;
        }
        .confirmation a {
          display: block;
          text-align: center;
        }
      `}</style>
    </div>;
  }
}

Checkout.propTypes = {
};

export default Checkout;
