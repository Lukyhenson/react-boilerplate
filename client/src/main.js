import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './containers'
import Home from './containers/home'

import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={'/'} component={App}>
        <IndexRoute component={Home} />

      </Route>
    </Router>
  </Provider>
, document.querySelector('#app'))
