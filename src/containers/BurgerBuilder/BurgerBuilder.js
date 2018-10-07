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
      totalPrice: 4,
      purchasable: false,
    }
  }

  updatePurchaseState = (ingredients) => {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    // turn this obj in an array
    const sum = Object.keys(ingredients)
      .map(({igKey}) => {
        // return the value
        // console.log("igKey", Object.keys(ingredients));
        // console.log("ingredients", ingredients[igKey]);
        return ingredients[igKey];
      })
      .reduce((sum, eachElement) => {
        return sum + eachElement;
      }, 0);
      // console.log(sum);
      this.setState({purchasable: sum > 0 });
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
    });
    this.updatePurchaseState(updatedIngredients);
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

    this.updatePurchaseState(updatedIngredients);
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;

    }
    // console.log('disabledInfo', disabledInfo)
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;;