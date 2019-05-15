import React from 'react';
import withServices from './withServices';

function Link({to, onClick, children, router, ...others}) {

  function onLinkClick(event) {
    if (onClick) {
      onClick(event);
    }

    if(event.isDefaultPrevented()) {
      return;
    }

    event.preventDefault();
    router.setLocation(to);
  }

  return (
    <a href={to} onClick={onLinkClick} {...others}>
      {children}
    </a>
  );
}

export default withServices('router')(Link);
