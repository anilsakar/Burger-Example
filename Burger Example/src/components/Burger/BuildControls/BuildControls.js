import React from "react"

import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>{props.price.toFixed(2) + '$'}</strong></p>
        {controls.map(cnt => (
            <BuildControl
                key={cnt.label}
                label={cnt.label}
                added={() => props.ingredientsAdded(cnt.type)}
                removed={() => props.ingredientsRemoved(cnt.type)}
                disabled={props.disabled[cnt.type]} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN-UP TO ORDER'}</button>
    </div>
)


export default buildControls