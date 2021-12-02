'use strict';

const e = React.createElement;

class CookiePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accepted: false };
  }

  render() {
    if (this.state.accepted) {
      return 'Thanks';
    }

    return e(
      'button',
      { onClick: () => this.setState({ accepted: true }) },
      'Accept cookies?'
    );
  }
}

const domContainer = document.querySelector('#cookiePopupContainer');
ReactDOM.render(e(CookiePopup), domContainer);