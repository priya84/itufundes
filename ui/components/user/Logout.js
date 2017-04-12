import React from 'react';
import * as styles from '../../common/styles';
import {deleteCookie} from '../../common/cookie';

class Logout extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      deleteCookie('XAuthToken');
      window.location.href = '/';
    }, 1000);
  }

  render() {
    return <div className="container">
      Logging Out...

      <style jsx>{`
        .container {
          font-size: 1.2em;
        }
      `}</style>
    </div>;
  }
}

export default Logout;
