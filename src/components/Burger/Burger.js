import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transfromedIngredients = Object.keys(props.ingredient)
        .map(igkey => {
            return [...Array(props.ingredient[igkey])].map((_, i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    console.log(transfromedIngredients);
    if (transfromedIngredients.length === 0) {
        transfromedIngredients = <p>Please add some ingredient...</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfromedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;