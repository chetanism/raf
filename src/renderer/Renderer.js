import React from 'react';
import ReactDOM from 'react-dom';

class Renderer {

  constructor(store, router, element, container) {
    this.currentRouterState = null;
    this.router = router;
    this.element = element;
    this.store = store;
    this.container = container;
  }

  async render() {
    const routerState = this.store.getState().router;
    if (routerState !== this.currentRouterState) {
      this.currentRouterState = routerState;
      const page = await this.router.resolve({...routerState, store: this.store});

      if (page.redirect) {
        return this.router.setLocation(page.redirect);
      }

      ReactDOM.render(
        (
          <Renderer.ContainerContext.Provider value={this.container}>
            {page.component}
          </Renderer.ContainerContext.Provider>
        ),
        this.element,
      )
    }
  }
}

Renderer.ContainerContext = React.createContext(null);

export default Renderer
