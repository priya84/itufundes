import React from 'react';
import BillingDetailsFormView from './BillingDetailsFormView';

class BillingDetailsView extends React.Component {
  render() {
    return <div className="container">
      <div className="title">Billing Details:</div>

      <BillingDetailsFormView />

      <div className="btn">Update</div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
        }
        .btn {
          width: 200px;
        }
        .title {
          font-size: 1.1em;
          font-weight: bold;
        }
      `}</style>
    </div>;
  }
}

export default BillingDetailsView;
