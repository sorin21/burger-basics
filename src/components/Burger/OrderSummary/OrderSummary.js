import React, { Component } from 'react';
import Aux from 'hoc/_Aux';
import Button from "components/UI/Button/Button";


class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] will update')
  }
  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
      })
    // console.log(ingredients);
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Your burger has these ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" colorBlack clicked={this.props.cancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;