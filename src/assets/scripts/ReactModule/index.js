import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ReactModule extends React.Component {
  constructor(props) {
    super(props);

    this.key = 'AZtqQhF9PrR9avRirhnaz2QNHbDFxV';
    this.data = '';

    this.state = {
      isLoading: false,
      dataComplete: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({isLoading: true});

    axios.post(`https://lighthouse-tmi.herokuapp.com/run?url=${this.field.value}&auth=${this.key}`).then(res => {
      this.data = res.data;

      this.setState({
        isLoading: false,
        dataComplete: true
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Test your site!</h1>
        <p>Results provided by Google Lighthouse</p>

        <form onSubmit={this.handleSubmit}>
          <input ref={el => this.field = el} type="url" placeholder="Your website" disabled={this.state.isLoading} />
        </form>

        {this.state.isLoading &&
          <p>Loading your results</p>
        }

        {this.state.dataComplete &&
          <h1>Your score: {this.data.score}</h1>
        }
      </div>
    );
  }
}

// Set default props for unset variables
ReactModule.defaultProps = {
  greeting: 'Hi'
};

// Establish types for props to prevent renderering errors
ReactModule.propTypes = {
  greeting: PropTypes.string
};

ReactDOM.render(
  <ReactModule greeting="Hello" />,
  $('[data-react-module]')[0]
);
