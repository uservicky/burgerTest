import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuiltControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4.0,
            purchasable: false,
            purchasing: false
        }
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchasingCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchasingContinueHandler = () => {
        alert('continue!!');
    }

    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updateCount = oldCount + 1;
        const updateIngredient = { ...this.state.ingredient };
        updateIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({
            ingredient: updateIngredient,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredient);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if (oldCount <= 0)
            return;
        const updateCount = oldCount - 1;
        const updateIngredient = { ...this.state.ingredient };
        updateIngredient[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredient: updateIngredient,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredient);
    }

    render() {
        const disabledInfo = { ...this.state.ingredient };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    <OrderSummary
                        ingredient={this.state.ingredient}
                        purchaseCancelled={this.purchasingCancelHandler}
                        purchaseContinue={this.purchasingContinueHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredient={this.state.ingredient} />
                <BuiltControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );

    }
}

export default BurgerBuilder;