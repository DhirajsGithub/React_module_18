import React, { useState } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  // const inputState = useState({ title: "", amount: "" });
  // const [inputState, setInputState] = useState({ title: "", amount: "" });
  // NOTE: only use object when your data changes together recomannded
  const [title, setTitle] = useState('');
  const [amount , setAmount] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({title: title, amount: amount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              // value={inputState[0].title}
              // value={inputState.title}
              value={title}
              // onChange={(event) => {
              //   const newTitle = event.target.value; // for closure purpose
              //   // inputState[1]( prevState =>({
              //     setInputState( prevState =>({
              //     title: newTitle,
              //     amount: prevState.amount,
              //   }) )
              // }}
              onChange={event => {setTitle(event.target.value)}}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={event => {setAmount(event.target.value)}}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator /> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
