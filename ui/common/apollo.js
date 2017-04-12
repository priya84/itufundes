import React from 'react';
import {ApolloProvider, getDataFromTree, ApolloClient, createNetworkInterface} from 'react-apollo';
import 'isomorphic-fetch';
import {parseCookieStr, readCookie} from './cookie';

const isBackend = !process.browser;
const API_URL = isBackend ?
  process.env.APP_CONF_API_BACK_URL :
  window.env.APP_CONF_API_FRNT_URL;

let apolloClient = null;

function _initClient(headers, initialState) {
  const networkInterface = createNetworkInterface({
    uri: `${API_URL}/graphql`,
    opts: {
      credentials: 'same-origin'
      // Pass headers here if your graphql server requires them
    }
  });

  // Add user auth token to every request.
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      if (isBackend) {
        req.options.headers['x-auth-token'] = parseCookieStr(headers.cookie, 'XAuthToken');
      } else {
        req.options.headers['x-auth-token'] = readCookie('XAuthToken');
      }
      next();
    }
  }]);

  return new ApolloClient({
    initialState,
    networkInterface,
    ssrMode: isBackend,
    dataIdFromObject: result => result.id || null
  });
}

const initClient = (headers, initialState = {}) => {
  if (isBackend) {
    return _initClient(headers, initialState);
  }
  if (!apolloClient) {
    apolloClient = _initClient(headers, initialState);
  }
  return apolloClient;
};

export default (Component) => (
  class extends React.Component {
    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const client = initClient(headers);

      const props = {
        url: {query: ctx.query, pathname: ctx.pathname},
        ...await (Component.getInitialProps ? Component.getInitialProps(ctx) : {})
      };

      if (isBackend) {
        const app = (
          <ApolloProvider client={client}>
            <Component {...props} />
          </ApolloProvider>
        );
        await getDataFromTree(app);
      }

      return {
        initialState: {
          apollo: {
            data: client.getInitialState().data
          }
        },
        headers,
        ...props
      };
    }

    constructor(props) {
      super(props);
      this.client = initClient(this.props.headers, this.props.initialState);
    }

    render() {
      return (
        <ApolloProvider client={this.client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  }
);
