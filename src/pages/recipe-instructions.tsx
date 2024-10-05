import axios from "axios";
import { useEffect, useState } from "react";
import { myApiKey } from "./main";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface Ingredient {
  id: string,
  name: string,
  localizedName: string, 
  image: string
}

interface Equipment {
  id: string,
  name: string,
  localizedName: string, 
  image: string
}

interface Step {
    number: number,
    equipment : Equipment[],
    ingredients: Ingredient[],
    step: string,
}

interface RecipesInstructions {
  steps: Step[];
}

export const RecipeStepByStep = () => {

  const location = useLocation()

  const [recipeInstructions, setInstructions] =
    useState<RecipesInstructions | null>(null);

  const url = `https://api.spoonacular.com/recipes/${location.state.recipeId}/analyzedInstructions?apiKey=${myApiKey}`

  const getInstructions = () => {
    axios({
      method: "get",
      url: url,
      responseType: "json",
    }).then(function (response) {
      setInstructions(
        { steps: response.data[0].steps} as RecipesInstructions)
    });
  };

  useEffect(() => {
    getInstructions();
  }, []);

  return (
    <div>
      {recipeInstructions?.steps.map((step) => ( 
         <Card className="myCard">
          <Card.Body>
            <Card.Title>Step n. {step.number}</Card.Title>
          
            {step.equipment.length > 0 && <Card.Text> Equipment: <ul>
              {step.equipment?.map((equipment) => (
                <li>{equipment.name}</li>
                ))} </ul> </Card.Text>}

            {step.ingredients.length > 0 && <Card.Text> Ingredients: <ul>
              {step.ingredients?.map((ingredient) => (
                <li>{ingredient.name}</li>
                ))} </ul> </Card.Text>}

             <Card.Text>  Description: {step.step} </Card.Text>            
          </Card.Body>
        </Card>
      ))}
     </div>  
  );
};
