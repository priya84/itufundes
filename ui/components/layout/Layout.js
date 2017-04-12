import React from 'react';
import Head from 'next/head';
import serialize from 'serialize-javascript';
import * as styles from '../../common/styles';

const {
  APP_CONF_API_FRNT_URL
} = typeof window === 'undefined' ? process.env : window.env;
const env = {
  APP_CONF_API_FRNT_URL
};

class Layout extends React.Component {
  render() {
    return <div>
      <Head>
        <title>{this.props.title}</title>
        <link rel="stylesheet" href="/static/css/animate.min.css" />
        <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
        <script dangerouslySetInnerHTML={{__html: `window.env = ${serialize(env)}`}} />
      </Head>

      <div id="layout">
        <section>{this.props.children}</section>

        <style jsx global>{`
          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed,
          figure, figcaption, footer, header, hgroup,
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          article, aside, details, figcaption, figure,
          footer, header, hgroup, menu, nav, section {
            display: block;
          }
          body {
            line-height: 1;
          }
          ol, ul {
            list-style: none;
          }
          blockquote, q {
            quotes: none;
          }
          blockquote:before, blockquote:after,
          q:before, q:after {
            content: '';
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Helvetica,Arial,Verdana,sans-serif;
            font-size: 14px;
            line-height: 18px;
            color: ${styles.colorDarkblack};
            background-color: #1e1f23;
            text-align: justify;
          }

          a {
            color: ${styles.colorBlue};
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          input[type=text], input[type=password], input[type=date] {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            width: 200px;
            outline: none !important;
            color: ${styles.colorDarkblack};
            background-color: ${styles.colorWhite};
            border: 1px solid ${styles.colorWhite};
            border-radius: 2px;
            padding: 0 10px;
            position: relative;
          }
          input[type=text]:focus, input[type=password]:focus, input[type=date]:focus {
            border: 1px solid ${styles.colorBlue} !important;
            outline: none !important;
          }
          input[type=text].dark, input[type=password].dark, input[type=date].dark {
            border: 1px solid ${styles.colorDarkwhite};
          }
          input[type=text].error, input[type=password].error, input[type=date].error {
            border: 1px solid ${styles.colorRed};
          }
          input[type=text][disabled], input[type=password][disabled], input[type=date][disabled] {
            background-color: ${styles.colorGrey};
            border: 1px solid ${styles.colorGrey};
            background: repeating-linear-gradient(
              -55deg,
              ${styles.colorWhite},
              ${styles.colorWhite} 10px,
              ${styles.colorDarkwhite} 10px,
              ${styles.colorDarkwhite} 20px
            );
          }
          ::-webkit-input-placeholder {
            color: ${styles.colorGrey};
            opacity: 1;
          }
          :-moz-placeholder {
            color: ${styles.colorSmoke};
            opacity: 1;
          }
          ::-moz-placeholder {
            color: ${styles.colorSmoke};
            opacity: 1;
          }
          :-ms-input-placeholder {
            color: ${styles.colorSmoke};
            opacity: 1;
          }

          .select {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            width: 200px;
            border: 1px solid ${styles.colorWhite};
            border-radius: 2px;
            overflow: hidden;
            background: ${styles.colorWhite} url("data:image/png;base64,R0lGODlhDwAUAIABAAAAAP///yH5BAEAAAEALAAAAAAPABQAAAIXjI+py+0Po5wH2HsXzmw//lHiSJZmUAAAOw==") no-repeat 90% 50%;
          }
          .select select {
            font-family: Helvetica,Arial,Verdana,sans-serif;
            color: ${styles.colorDarkblack};
            font-size: 14px;
            padding: 0 10px;
            width: 130%;
            border: none;
            box-shadow: none;
            background: transparent;
            background-image: none;
            -webkit-appearance: none;
          }
          .select select:focus {
            outline: none;
          }

          .btn {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            min-width: 110px;
            padding: 0 15px;
            border-radius: 2px;
            box-sizing: border-box;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            vertical-align: middle;
            background-color: ${styles.colorLightblue};
            color: ${styles.colorWhite};
          }
          .btn:hover, .btn:focus {
            background-color: ${styles.colorBlue};
          }
          .btn:active {
            text-decoration: underline;
          }
          .btn.red {
            background-color: ${styles.colorRed};
          }

          .hidden {
            display: none;
          }

          .layout-block {
            margin-bottom: 20px;
            width: 100vw;
          }
          @media ${styles.mediaAboveTablet} {
            .layout-block {
              width: 750px;
            }
          }
          @media ${styles.mediaAboveDesktop} {
            .layout-block {
              width: 970px;
            }
          }
          @media ${styles.mediaAboveWidescreen} {
            .layout-block {
              width: 1170px;
            }
          }
          .layout-block.pretty {
            background-color: ${styles.colorWhite};
            box-shadow: 0px 1px 4px ${styles.colorBlue};
            padding: 20px;
          }
        `}</style>

        <style jsx>{`
          #layout {
            display: flex;
            flex-direction: column;
            align-items: center
          }
        `}</style>
      </div>
    </div>;
  }
}

Layout.propTypes = {
  title: React.PropTypes.string
};
Layout.defaultProps = {
  title: 'ITU-Capstone'
};

export default Layout;
