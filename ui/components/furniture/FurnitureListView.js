import React from 'react';
import FurnitureView from './FurnitureView';
import * as styles from '../../common/styles';

function FurnitureListView({furniture, onAdd, onRemove}) {
  return <div className="furniture-list">
    {furniture.map((f) =>
      <div className="row" key={f.id}>
        <FurnitureView
          id={f.id}
          name={f.name}
          image={f.image}
          description={f.description}
          dealer={f.dealer}
          price={f.price}
          size={f.size}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
    )}

    <style jsx>{`
      .furniture-list {
        flex: 1;
        overflow-y: scroll;
      }
      .furniture-list::-webkit-scrollbar {
        width: 0px;
      }
      .furniture-list .row {
        border-bottom: 1px solid ${styles.colorDarksmoke};
      }
      .furniture-list .row:last-child {
        border-bottom: 0;
      }
    `}</style>
  </div>;
}

FurnitureListView.propTypes = {
  furniture: React.PropTypes.array.isRequired,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func
};

export default FurnitureListView;
