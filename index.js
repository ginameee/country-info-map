import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLandmark, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { faClock, faMoneyBillAlt, faStickyNote } from "@fortawesome/free-regular-svg-icons";


import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './src/components/App';

import '@/assets/scss/index.scss';

const Hot = hot(App);

library.add([faLandmark, faClock, faMoneyBillAlt, faGlobeAsia, faStickyNote]);
dom.watch();

ReactDOM.render(<Hot />, document.querySelector('#app'));
