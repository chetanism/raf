class Application {
  constructor(store, router, renderer, sideEffect) {
    this.store = store;
    this.router = router;
    this.renderer = renderer;
    this.sideEffect = sideEffect;
  }

  start() {
    this.store.start(this.update);
    this.router.start();
    this.sideEffect.triggerBoot(this.store);
    console.log('Application Started!');
  }

  update = () => this.renderer.render()
    .catch(error => console.log(error));

}

export default Application;
