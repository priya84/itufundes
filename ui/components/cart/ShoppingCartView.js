import React from 'react';
import * as styles from '../../common/styles';
import FurnitureListView from '../furniture/FurnitureListView';

function ShoppingCartView({items, onRemove, onCompleteOrderClick}) {
  const total = items.reduce((res, item) => res + item.price, 0);

  return <div className="shopping-cart-view  animated bounceInUp">
    <div className="items animated fadeInUp">
      <FurnitureListView
        furniture={items}
        onRemove={onRemove}
      />
    </div>
    <div className="logo">
      <i className="fa fa-cart-arrow-down" aria-hidden="true" />
    </div>
    <div className="order">
      <div className="btn" onClick={onCompleteOrderClick}>
        ${total} Complete Your Order
      </div>
    </div>

    <style jsx>{`
      .shopping-cart-view {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .shopping-cart-view:hover .items {
        display: flex;
      }

      .items {
        flex: 1;
        display: none;
        position: relative;
        border-top: 1px solid #151518;
        z-index: 10;
        background-color: #2F4550;
        box-shadow: inset 0px 0px 40px 5px rgba(33,33,33,1);
      }
      .logo {
        position: absolute;
        z-index: 1;
        bottom: 90px;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0.3;
        overflow: hidden;
      }
      .logo i {
        font-size: 12em;
      }

      .order {
        position: relative;
        z-index: 15;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid ${styles.colorDarksmoke};
        background-color: #2F4550;
        box-shadow: inset 0px 0px 15px 5px rgba(33,33,33,0.5);
      }
      .order .btn {
        flex: 1;
        height: 50px;
        line-height: 50px;
        padding: 0 40px;
        font-size: 1.5em;
        letter-spacing: 2px;
      }
    `}</style>
  </div>;
}

ShoppingCartView.propTypes = {
  items: React.PropTypes.array.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onCompleteOrderClick: React.PropTypes.func.isRequired
};

export default ShoppingCartView;
