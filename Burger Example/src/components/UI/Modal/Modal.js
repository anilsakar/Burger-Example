import React, { Component } from "react"
import classes from "./Modal.css"
import Aux from "../../../hoc/Auxiliary/Auxiliary"
import Backdrop from "../BackDrop/Backdrop"

class Modal extends Component {

    shouldComponentUpdate(nextProp, nextState){
        return nextProp.show !== this.props.show || nextProp.children !== this.props.children
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transfrom: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal