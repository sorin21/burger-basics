import React, { Component } from 'react';
import Modal from 'components/UI/Modal/Modal';
import Aux from 'hoc/_Aux';

// takes the wrapped comp like an input and axios
const withErrorHandler = (WrappedComponent, axios) => {
  // then returns a class that receives props
  return class extends Component {
    state = {
      error: null
    }

    // instead of componentWillMount
    fetchDataHandler = () => {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        // clear the errors
        this.setState({error: null});
        return request;
      })
      // setup the global interceptor, that allows us to handle errors
      // this funct use will get the response(null)
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        // show the error modal
        console.log('error', error)
        this.setState({error});
      })
    }

    componentWillUnmount = () => {
      // console.log('Will unmont', this.reqInterceptor, this.resInterceptor);
      // console.log('Will unmont', this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    };
    

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      this.fetchDataHandler();
      // returns some jsx including the wrapped comp
      return (
        // distribute any props that this comp might receive
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
        </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;