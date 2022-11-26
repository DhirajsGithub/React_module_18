import React, { useState, useEffect, useCallback, useReducer, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../components/hooks/http.js"

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((item)=> item.id !== action.id);
    default:
      throw new Error("Should not get there");
  }
}

const httpReducer = (curHttpState, action)=>{
  switch(action.type){
    case "SEND":
      return {loading : true, error: null}
    case "RESPONSE":
      return {...curHttpState , loading : false}
    case "ERROR" :
      return {loading : false, error: action.errorData}
    case "CLEAR":
      return {...curHttpState, loading : false, error: null}
    default:
      throw new Error("Shouldn't reach here")
  }
}

function Ingredients() {
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();

  const {isLoading, error, data, sendRequest, reqExtra, reqIdentifer, clear } = useHttp();

  useEffect(()=>{
    if(!isLoading && !error && reqIdentifer == "REMOVE_INGREDIENT"){
      dispatch({type:"DELETE", id: reqExtra})
    }else if (!isLoading && !error &&  reqIdentifer == "ADD_INGREDIENT"){
      dispatch({type: "ADD", ingredient :{ id: data.name, ...reqExtra } })
    }
    
  }, [data, reqExtra, reqIdentifer, isLoading, error ])
 
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, []);
  const filterIngredientHandler = useCallback((filteredIngredient) => {
    // setUserIngredients(filteredIngredient);
    dispatch({type: "SET", ingredients : filteredIngredient})
  }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = useCallback((ingredient) => {

    sendRequest(`https://react-http-6b42f-default-rtdb.firebaseio.com/ingredients.json`, 
    "POST",
    JSON.stringify(ingredient),
    ingredient,
    'ADD_INGREDIENT'   // IDENTIFIER
    )

    // setLoading(true);
    // dispatchHttp({type:"SEND"})
    // fetch(
    //   "https://react-http-6b42f-default-rtdb.firebaseio.com/ingredients.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(ingredient),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    //   .then((response) => {
    //     dispatchHttp({type:"RESPONSE"})
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     // setUseIngredients will be executed only when the promise is fullfilled
    //     // setUserIngredients((prevIngredients) => [
    //     //   ...prevIngredients,
    //     //   { id: responseData.name, ...ingredient },
    //     // ]);
        // dispatch({type: "ADD", ingredient :{ id: responseData.name, ...ingredient } })
    //   }).catch((error)=>{
    //     dispatchHttp({type: "ERROR", errorData: error.message})
    //     // setError("Something went wrong")
    // });
      
  },[]);
  const removeIngredientHandler = useCallback((id) => {

    sendRequest(`https://react-http-6b42f-default-rtdb.firebaseio.com/ingredients/${id}.json`, 
    "DELETE",
    null,
    id,
    'REMOVE_INGREDIENT'
    )

    // // const newIngredients = userIngredients.filter((item)=>{
    // //   return item.id !== id;
    // // })
    // // setUserIngredients(newIngredients)
    // dispatchHttp({type:"SEND"})
    // fetch(
    //   `https://react-http-6b42f-default-rtdb.firebaseio.com/ingredients/${id}.json`,
    //   {
    //     method: "DELETE",
    //   }
    // ).then(response =>{
    //   // setUserIngredients((prevIngredients) =>
    // //   prevIngredients.filter((item) => item.id !== id)
    // // );
    // dispatchHttp({type:"RESPONSE"})
    // dispatch({type: "DELETE", id : id})
    //   //  setLoading(false)
      
    // }).catch((error)=>{
    //   // setError("Something went wrong") 
    //   dispatchHttp({type:"ERROR", errorData : error.message})
    // });
    
    
    
  },[sendRequest]);
  const clearError = ()=>{
    // // setError(null);
    // // setLoading(false);
    // dispatchHttp({type:"CLEAR"})
    clear();
  }

  const ingredientList = useMemo(()=>{
      return (<IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
    />)
  }, [userIngredients, removeIngredientHandler])
  return (
    <div className="App">
    {/* {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal> } */}
    {error && <ErrorModal onClose={clearError}>{error}</ErrorModal> }
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadedIngredients={filterIngredientHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
