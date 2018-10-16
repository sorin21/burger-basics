import React, { Component } from 'react'
import Aux from 'hoc/_Aux'
import Burger from "components/Burger/Burger";
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    axios.get('https://react-burger-project-5c90d.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      })
  }

  updatePurchaseState = (ingredients) => {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    // turn this obj in an array
    const sum = Object.keys(ingredients)
      .map((igKey) => {
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

  purchaseHandler  = () => {
    this.setState({purchasing: true});
  }

  modalClosed = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Sorin',
        address: {
          street: 'Test 1',
          zipCode: '323224',
          country: 'Romania'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then((response) => {
        // stop loading spinner
        this.setState({loading: false, purchasing: false})
      })
      .catch((error) => {
        this.setState({loading: false, purchasing: false})
      });
  }
 
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;

    }

    let orderSummary = null;

    // show the spinner when we get ingredients from firebase
    let burger = this.state.error ?  <p> Ingredients ca't be loaded</p> : <Spinner />
    // if the response is null
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.modalClosed}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice} />
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    } 

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalClosed} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);