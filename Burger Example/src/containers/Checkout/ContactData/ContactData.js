import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {

    //Create objects to put those values into input dynamically. For detail look below code starts with 'let form = (...'
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false

    }

    orderHandler = (event) => {
        //To stop form button to refresh the page 
        event.preventDefault()

        const formData = {}
        //Data will be like -> name: anil, street: blabla etc. For detail look firebase database.
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        console.log(formData)

        //Create data to send to the database
        const order = {
            ingredients: this.props.ings,
            price: this.props.tPrice,
            orderData: formData,
            userId: this.props.userId

        }

        this.props.onOrderBurger(order, this.props.token)

    }

    checkValidity(value, rules) {
        //console.log(value,rules)
        let isValid = true

        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }


        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value)
        //console.log(this.state.orderForm[inputIdentifier])

        //Get copy of orderform object
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //Get selected element by the help of 'inputElementIdentifier'. 'inputElementIdentifier' will be name, street etc.
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        //Change selected input value
        updatedFormElement.value = event.target.value
        //Check whether value valid or not.
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        //It will change after user enter value and this will affect in input.js to turn <input> class red or default
        updatedFormElement.touched = true
        //Update selected input
        updatedOrderForm[inputIdentifier] = updatedFormElement
        //Change all order form with new updated data.

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })



    }

    render() {

        const formElementsArray = []
        for (let key in this.state.orderForm) {
            //key will be name, street, zipcode etc.
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        //Create form data with inputs
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        //In input.js validation if check not gonna work so, select is not going to be red anytime
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))