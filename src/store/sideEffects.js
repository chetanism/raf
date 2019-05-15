
function on(listeners, actionType, listener) {
  if (!listeners[actionType]) {
    listeners[actionType] = [];
  }

  listeners[actionType].push(listener);
}

class SideEffect {
  constructor() {
    this.preListeners = {};
    this.postListeners = {};
    this.bootListeners = {boot: []};
    this.booted = false
  }

  triggerBoot(store) {
    this.bootListeners.boot.forEach(l => l(store));
    this.booted = true;
  }

  boot(listener) {
    on(this.bootListeners, 'boot', listener);
  }

  before(actionType, listener) {
    on(this.preListeners, actionType, listener)
  }

  after(actionType, listener) {
    on(this.postListeners, actionType, listener)
  }

  getMiddleware() {
    return (store) => (next) => (action) => {
      if (this.preListeners[action.type]) {
        this.preListeners[action.type].forEach(l => l(action.payload, store));
      }

      next(action);

      if (this.postListeners[action.type]) {
        this.postListeners[action.type].forEach(l => l(action.payload, store));
      }
    }
  }
}

// export default new SideEffect();
export default SideEffect;