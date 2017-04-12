import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';
import {saveCookie} from '../../common/cookie';

function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  let results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class Activate extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        const res = await this.props.userActivateMutation({variables: {
          id: getParameterByName('u'),
          authKey: getParameterByName('a')
        }});

        saveCookie('XAuthToken', res.data.userActivate);
        window.location.href = '/';
      } catch (err) {
        this.setState({error: true});
      }
    }, 1000);
  }

  render() {
    return <div className="container">
      {this.state.error ? (
        <div className="msg error">Error: Invalid User Credentials</div>
      ) : (
        <div className="msg">Activating User...</div>
      )}

      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .msg {
          padding: 20px;
          font-size: 1.5em;
          border-radius: 2px;
          background-color: ${styles.colorWhite};
          color: ${styles.colorDarkblack};
        }
        .msg.error {
          color: ${styles.colorRed};
        }
      `}</style>
    </div>;
  }
}

const userActivateMutation = gql`
  mutation userActivateMutation($id: String!, $authKey: String!) {
    userActivate(id: $id, authKey: $authKey)
  }
`;

export default compose(
  graphql(userActivateMutation, {name: 'userActivateMutation'})
)(Activate);
