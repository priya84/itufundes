import React from 'react';

class BillingDetailsFormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '****-****-****-6339',
      expiration: '06/19',
      csc: '***',
      address: ' 2711 N 1st St',
      address2: '',
      city: 'San Jose',
      state: 'California',
      zip: '95134'
    };
    this.handleCardNumber = this.handleInput.bind(this, 'cardNumber');
    this.handleExpiration = this.handleInput.bind(this, 'expiration');
    this.handleCsc = this.handleInput.bind(this, 'csc');
    this.handleAddress = this.handleInput.bind(this, 'address');
    this.handleAddress2 = this.handleInput.bind(this, 'address2');
    this.handleCity = this.handleInput.bind(this, 'city');
    this.handleState = this.handleInput.bind(this, 'state');
    this.handleZip = this.handleInput.bind(this, 'zip');
  }

  handleInput(key, ev) {
    this.setState({[key]: ev.target.value});
  }

  render() {
    return <div className="box">
      <div className="col left">
        <input type="text" className="dark" placeholder="Credit Card Number" value={this.state.cardNumber} onChange={this.handleCardNumber} />
        <input type="text" className="dark" placeholder="Expiration Date" value={this.state.expiration} onChange={this.handleExpiration} />
        <input type="text" className="dark" placeholder="Security Code" value={this.state.csc} onChange={this.handleCsc} />
      </div>

      <div className="col">
        <input type="text" className="dark" placeholder="Address" value={this.state.address} onChange={this.handleAddress} />
        <input type="text" className="dark" placeholder="Apt., Ste., Bldg." value={this.state.address2} onChange={this.handleAddress2} />
        <input type="text" className="dark" placeholder="City" value={this.state.city} onChange={this.handleCity} />
        <input type="text" className="dark" placeholder="State" value={this.state.state} onChange={this.handleState} />
        <input type="text" className="dark" placeholder="Zip Code" value={this.state.zip} onChange={this.handleZip} />
      </div>

      <style jsx>{`
        .box {
          display: flex;
          margin: 10px 0;
        }
        .col {
          display: flex;
          flex-direction: column;
        }
        .col.left {
          margin-right: 40px;
        }
        .col > * {
          margin: 10px 0;
        }
      `}</style>
    </div>;
  }
}

export default BillingDetailsFormView;
