import React, { Component } from "react"

import Modal from "../../components/UI/Modal/Modal"
import Aux from "../Auxiliary/Auxiliary"

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props)

            //To not see old error and modal everytime in every request makes error null
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request
            })
            //*When there is a error state will change and modal will show to the screen
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })

            })
        }

        state = {
            error: null
        }

        //This one will relase interceptors when burgerbuilder not showing
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }


        //If we close modal error state will be null and modal will be closed
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    {/*When there is a error modal going to be show to the screen*/}
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler