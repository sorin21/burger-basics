import React from 'react';
import Aux from 'hoc/_Aux';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
  // console.log(ingredients);
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Your burger has these ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout</p>
    </Aux>
  );
};

export default OrderSummary;