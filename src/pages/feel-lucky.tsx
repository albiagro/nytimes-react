import axios from "axios";
import { useEffect, useState } from "react";
import { IRecipe, myApiKey } from "./main";
import { Recipe } from "../components/recipe";
import { Button, Card, Container, Navbar } from "react-bootstrap";

export const FeelLucky = () => {
  const [click, setClick] = useState(0);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  var url = `https://api.spoonacular.com/recipes/random?number=1&include-tags=vegetarian,dessert&apiKey=${myApiKey}`;

  const getRecipe = () => {
    axios({
      method: "get",
      url: url,
      responseType: "json",
    })
      .then(function (response) {
        setRecipe({
          id: response.data.recipes[0].id,
          title: response.data.recipes[0].title,
          image: response.data.recipes[0].image,
        } as IRecipe);
      })
      .catch((error) => console.log(error)); //do nothing
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  return (
    <div>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>
            Today is your lucky day! Click the button to get a random vegetarian
            dessert recipe!
          </Card.Title><br/>
          <Button variant="primary" onClick={() => setClick(click + 1)}>
        Get my random dessert!
      </Button>
        </Card.Body>
      </Card><br/>      
      {click > 0 && recipe !== null && <Recipe recipe={recipe} idCard='feel-lucky-card' />}
    </div>
  );
};
