import React from 'react';
import ReactDOM from 'react-dom';

export default class ReactModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Hello world!</h2>
        <p>I'm a React component. Pura comes with <strong>React</strong> and <strong>ReactDOM</strong> installed by default.</p>
        <p>However, if you don't need it that's okay, too! Just don't <code>import</code> it into your modules and you'll save on precious KB.</p>
      </div>
    );
  }
}

ReactDOM.render(<ReactModule />, $('[data-react-module]')[0]);
