import React, { Component } from 'react'
import Aux from '../../hoc/_Aux'
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    }
  }

  addIngredientHandler = (type) => {
    // update state imuatable way
    const updatedIngredients = {
      // distripute all state properties in this obj
      ...this.state.ingredients
    }
    const oldValue = this.state.ingredients[type];

    // update ingredients value
    updatedIngredients[type] = oldValue + 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ 
      totalPrice: newPrice, 
      ingredients: updatedIngredients
     })
  }

  removeIngredientHandler = (type) => {
    // update state imuatable way
    const updatedIngredients = {
      // distripute all state properties in this obj
      ...this.state.ingredients
    }
    const oldValue = this.state.ingredients[type];

    if(oldValue <= 0) {
      return;
    }

    // update ingredients value
    updatedIngredients[type] = oldValue - 1;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;

    }
    console.log('disabledInfo', disabledInfo)
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;;