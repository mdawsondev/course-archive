import React from 'react';
import { render as ReactDOM } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

// eslind-disable-next-line
({
  babel: true,
  plugins: ['jsdom-quokka-plugin']
})

ReactDOM(<Router />, document.querySelector('#main'));