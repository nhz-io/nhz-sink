import React from 'react';
import Base from './Base.jsx';
import config from 'config';

export default class Component extends Base {
  static childContextTypes = {}

  getChildContext() {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return null;
  }
}
