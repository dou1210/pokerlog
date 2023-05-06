import { App } from './models/App';

const app = new App();
// @ts-ignore
window.App = App;
app.init();
