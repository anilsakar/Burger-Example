import React from "react"

import classes from "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import { withRouter } from "react-router-dom"



const burger = props => {

    //creates all burgers ingredients.
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        }).reduce((arr, el) => {    //make it one dim array
            return arr.concat(el)
        }, [])


    if (transformedIngredients === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    //console.log(transformedIngredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )

}

/*We used <Router> at App.js and called it like -> '<Route path="/" component={BurgerBuilder} />'.
Hence, if we console.log(props) we will see BurgerBuilder path, match and other proporties. However,
we cannot see those proporties at Burger modal because we did not use <Router> to open it.
Hence, if we want to see those props at Burger, we can use withRouter. Thus, we can see those
props at Burger also.*/
export default withRouter(burger)