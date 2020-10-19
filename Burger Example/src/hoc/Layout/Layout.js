import React, { Component } from "react"
import Aux from "../Auxiliary/Auxiliary"
import { connect } from 'react-redux'

import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children} {/*in App.js all written elements in <Layout></Layout>*/}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout)