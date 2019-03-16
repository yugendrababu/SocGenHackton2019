import 'babel-polyfill/dist/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const context = require.context('./', true, /.+\.spec\.js?$/);

context.keys().forEach(context);

module.exports = context;
