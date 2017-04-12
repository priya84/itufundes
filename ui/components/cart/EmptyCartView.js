import React from 'react';
import * as styles from '../../common/styles';

const EmptyCartView = () => <div className="container">
  <div className="msg">Your Shopping Cart is Empty</div>
  <i className="fa fa-cart-arrow-down" aria-hidden="true" />
  <div className="msg2">Add Items From the Shopping List</div>

  <style jsx>{`
    .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      display: none;
    }
    .msg {
      font-size: 2em;
    }
    i {
      margin: 50px 0;
      font-size: 6em;
      color: ${styles.colorWhite};
    }
    .msg2 {
      font-size: 1.6em;
    }
  `}</style>
</div>;

EmptyCartView.propTypes = {};

export default EmptyCartView;
