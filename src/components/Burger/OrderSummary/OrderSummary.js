import React from 'react';
import Aux from 'hoc/_Aux';
import Button from "components/UI/Button/Button";

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
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
    </Aux>
  );
};

export default OrderSummary;