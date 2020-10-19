import React, { Component } from "react"

import Aux from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'

class BurgerBuilder extends Component {


    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients) {
        //This is going to get sum of salad, bacon, cheese and meat.
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        //This is going to get sum of salad, bacon, cheese and meat.

        //if sum is > 0 purchasable gonna be true
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()

        this.props.history.push('/checkout')
        //We can send data also
        //state: { ingredients: this.state.ingredients }
    }
    render() {
        const disableInfo = {
            ...this.props.ings
        }
        //{salad: true, cheese: false} -> this for going to return object like this.
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        //Create order summary here because we want to decide whether to show spinner or not
        let orderSummary = null
        let burger = this.props.error ? <p>Cannot Loaded Ingredients</p> : <Spinner />

        //If ingredients not null burger and orderSummary will be updated
        //Ingredients will be updated when data required from the database(Code in componentDidMount)
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ings}
                    />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.tPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>)
            orderSummary =
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.tPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />
        }

        return (
            <Aux>
                {this.state.purchasing ?
                    (<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {/*Show orderSummary or spinner*/}
                        {orderSummary}
                    </Modal>) : null}
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



//withErrorHandler going to show modal to the screen when there is error and it is global.
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))