import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config/swift-config';

const { basePath } = config.path;

class NoMatch extends React.Component {
  componentDidMount() {
    this.props.history.push(`${basePath}/home`);
  }
  render() {
    return <div> No url match found , you  will be redirected </div>;
  }
}

NoMatch.propTypes = {
  history: PropTypes.object,
};

export default NoMatch;
