import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredient)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'captitalize' }}>{igKey}</span>:{props.ingredient[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}> Continue </Button>

        </Aux>
    );
};
export default orderSummary;