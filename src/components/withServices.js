import {ContainerContext} from '../index';
import React, {Component} from 'react';

function withServices(...services) {
  return function (SomeComponent) {
    return class SomeComponentWithServices extends Component {
      static contextType = ContainerContext;
      render() {
        const container = this.context;

        this.servicesToInject = services.reduce((obj, service) => {
          obj[service] = container.get(service);
          return obj;
        }, {});

        return <SomeComponent {...this.props} {...this.servicesToInject} />
      }
    }
  }
}

export default withServices;
