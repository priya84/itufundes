import React from 'react';
import * as styles from '../../common/styles';

function FurnitureView({id, name, image, description, dealer, price, size, onAdd, onRemove}) {
  return <div className="container">
    <div className="left-col">
      <div className="title">{name} • {dealer} • ${price}</div>
      <div className="info">{size}</div>
      <div className="description">{description}</div>
    </div>

    <div className="right-col">
      <img src={image} />
      {onAdd && <div className="btn" data-id={id} onClick={onAdd}><i className="fa fa-plus" aria-hidden="true" /> Add</div>}
      {onRemove && <div className="btn red" data-id={id} onClick={onRemove}><i className="fa fa-minus" aria-hidden="true" /> Remove</div>}
    </div>

    <style jsx>{`
      .container {
        display: flex;
        padding: 30px 20px;
      }
      .container:hover .btn {
        display: block;
      }
      .container:hover img {
        display: none;
      }

      .left-col {
        flex: 1;
      }
      .right-col {
        display: flex;
        align-items: center;
        min-height: 110px;
      }
      img {
        height: 110px;
        width: 110px;
      }
      .btn {
        widht: 110px;
        display: none;
      }

      .title {
        font-size: 1.2em;
        color: ${styles.colorWhite};
      }
      .info {
        padding: 10px 0;
      }
      .description {
        padding-right: 20px;
      }
    `}</style>
  </div>;
}

FurnitureView.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  price: React.PropTypes.number.isRequired,
  dealer: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func
};

export default FurnitureView;
