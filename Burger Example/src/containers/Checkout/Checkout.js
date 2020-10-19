import React, { Component } from "react"

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/hello')
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        tPrice={this.props.tPrice}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler} />
                    <Route
                        path={this.props.match.path + '/hello'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(Checkout)