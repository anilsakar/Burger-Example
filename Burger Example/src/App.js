import React, { Component } from 'react';

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asycnComponent from './hoc/asyncComponent/asyncComponent'


const asyncCheckout = asycnComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asycnComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth = asycnComponent(()=>{
  return import('./containers/Auth/Auth')
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    }

    return (
      <div className="App">
        {/*Inside layout there is toolbar, sidedrawer and childrens(BurgerBuilder) */}
        <Layout>
          {routes}
        </Layout>
        {/*Inside layout there is toolbar, sidedrawer and childrens(BurgerBuilder) */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
