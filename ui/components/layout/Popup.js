import React from 'react';
import ReactDOM from 'react-dom';
import * as styles from '../../common/styles';

class Popup extends React.Component {
  constructor() {
    super();
    this.tryClose = this.tryClose.bind(this);
  }

  tryClose(ev) {
    if (this.popupRef === ev.target) {
      this.props.onClose();
    }
  }

  render() {
    const popupRef = (ref) => (this.popupRef = ref);

    return <div className="popup" ref={popupRef} onClick={this.tryClose}>
      <div className="box animated fadeInDown">
        {this.props.children}
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0,0,0,0.6);
        }
        .box {
          background-color: ${styles.colorWhite};
          color: ${styles.colorDarksmoke};
          border-radius: 2px;
          padding: 20px;
        }
      `}</style>
    </div>;
  }
}

export default Popup;
