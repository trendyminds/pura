import React from "react";
import PropTypes from "prop-types";

const ReactModule = props => (
  <div className="ReactModule">
    <h2>{props.greeting} world!</h2>
    <p>
      I'm a React component. Pura comes with <strong>React</strong> and{" "}
      <strong>ReactDOM</strong> installed by default.
    </p>
    <p>
      However, if you don't need it that's okay, too! Just don't{" "}
      <code>import</code> it into your modules and you'll save on precious KB.
    </p>
  </div>
);

// Set default props for unset variables
ReactModule.defaultProps = {
  greeting: "Hello"
};

// Establish types for props to prevent renderering errors
ReactModule.propTypes = {
  greeting: PropTypes.string
};

export default ReactModule;
