import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASED_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASED_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASED_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        //Take the data and send it to database to send it.
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                //Close spinner when data send to the database and close modal
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                //Close spinner when data send to the database and close modal
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        /*Get data from the database and convert it into array.(Because of axios-orders.js we didnt use base url.
       for detail look axios-orders.js)*/
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = []

                for (let key in res.data) {
                    fetchedOrders.push({
                        //Order objects from database
                        ...res.data[key],
                        id: key
                    })
                }
                //To see what upper code would print, unmark console.log below
                //console.log(fetchedOrders)
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}