import { Button, Card } from 'react-bootstrap';
import {IRecipe, myApiKey} from '../pages/main'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

interface Props {
    recipe: IRecipe
    idCard: string
}

interface RecipeDetails {
    servings: number,
    readyInMinutes: number
}


export const Recipe = (props: Props) => {
    const {recipe} = props;
    const [recipeInformation, setInformation] = useState<RecipeDetails | null>(null);

    const navigate = useNavigate();

  const getInformation = () => {
    axios({
      method: "get",
      url: `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${myApiKey}`,
      responseType: "json",
    }).then(function (response) {
        setInformation(
            { servings: response.data.servings, readyInMinutes: response.data.readyInMinutes } as RecipeDetails)
        });
  };

  useEffect(() => {
    getInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openRecipeInstruction = () => {
    navigate('/recipe-instructions', {state:{recipeId: recipe.id}})
  }

    return (
        <Card className= 'myCard' id={props.idCard}>
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>
          Suitable for {recipeInformation?.servings} people <br />
          Ready in {recipeInformation?.readyInMinutes} minutes
        </Card.Text>
        <Button variant="primary" onClick={openRecipeInstruction}>Let's start!</Button>
      </Card.Body>
    </Card>
        )
}