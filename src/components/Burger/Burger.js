import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // gives you an array of the object keys
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // make an array from this ingredients object
      // with elem as many as indredients we have
      // so if we have cheese: 2, will have 
      // an array with length 2
      // console.log('igKey', igKey)
      // console.log('props.ingredients', Object.keys(props.ingredients))
      // for ex: Array(3) gives you an array with 3 spaces

      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log('props.ingredients[igKey]', props.ingredients[igKey])
        // salad + 2 for example
        // igKey is like salad and i is 1, 2, etc
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })
    // use reduce to check if there is any element in the beginning
    // take each element and add it to the array
    // return arr.concat(el)
    // the initial value or reduce value is an empty array
    // .reduce((arr, el) => [...arr, ...el], []);
    .reduce((prevValue, curValue) => {
      console.log('prevValue', prevValue)
      // console.log('curValue', curValue);
      // the initial value of the reduce value will be an empty []
      return prevValue.concat(curValue)
    }, []);

  // console.log('transformedIngredients', transformedIngredients)
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;