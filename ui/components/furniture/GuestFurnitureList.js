import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SearchView from './SearchView';
import FurnitureListView from './FurnitureListView';
import Popup from '../layout/Popup';
import Login from '../user/Login';

class GuestFurnitureList extends React.Component {
  constructor() {
    super();
    this.state = {loginPopup: false};
    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onAdd() {
    this.setState({loginPopup: true});
  }

  onClose() {
    this.setState({loginPopup: false});
  }

  render() {
    let furniture = this.props.allFurnitureQuery.allFurniture;

    return <div className="container">
      <SearchView />

      <FurnitureListView
        furniture={furniture}
        onAdd={this.onAdd}
      />

      {this.state.loginPopup && <Popup onClose={this.onClose}><Login /></Popup>}

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

GuestFurnitureList.propTypes = {
  allFurnitureQuery: React.PropTypes.object.isRequired
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

export default compose(
  graphql(allFurnitureQuery, {name: 'allFurnitureQuery'})
)(GuestFurnitureList);
