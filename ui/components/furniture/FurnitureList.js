import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SearchView from './SearchView';
import FurnitureListView from './FurnitureListView';
import {addSceneItem} from '../../common/viewer/viewer';

class FurnitureList extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(ev) {
    let furniture = this.props.allFurnitureQuery.allFurniture;
    let selectedId = ev.currentTarget.dataset.id;
    let selected = furniture.find((f) => {
      return f.id === selectedId;
    });

    addSceneItem(selected);
    this.props.addShoppingCartItemMutation({variables: {
      itemId: selected.id
    }});
  }

  render() {
    let furniture = this.props.allFurnitureQuery.allFurniture;

    return <div className="container">
      <SearchView />

      <FurnitureListView
        furniture={furniture}
        onAdd={this.onAdd}
      />

    <style jsx>{`
      .container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `}</style>
    </div>;
  }
}

FurnitureList.propTypes = {
  allFurnitureQuery: React.PropTypes.object.isRequired,
  addShoppingCartItemMutation: React.PropTypes.func.isRequired
};

const allFurnitureQuery = gql`
  query allFurnitureQuery {
    allFurniture {
      id
      name
      image
      modelUrl
      type
      price
      size
      description
      dealer
    }
  }
`;
const addShoppingCartItemMutation = gql`
  mutation addShoppingCartItemMutation($itemId: String!) {
    addShoppingCartItem(itemId: $itemId) {
      id
      items {
        id
        name
        image
        modelUrl
        type
        price
        size
        description
        dealer
      }
    }
  }
`;

export default compose(
  graphql(allFurnitureQuery, {name: 'allFurnitureQuery'}),
  graphql(addShoppingCartItemMutation, {name: 'addShoppingCartItemMutation'})
)(FurnitureList);
