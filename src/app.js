export class App {
  configureRouter(config, router) {
    config.map([
      { route: '', moduleId: './app/no-selection', title: 'Select'},
      { route: 'contacts/:id', moduleId: './contacts/view', name: 'contacts' }
    ]);

    this.router = router;
  }
}

