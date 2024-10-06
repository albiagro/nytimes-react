import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../components/recipe";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import {AppContext} from "../App"

export const myApiKey = process.env.REACT_APP_API_KEY;

export interface IRecipe {
  id: number;
  title: string;
  image: string;
}

export const Main = () => {
 
  const [recipesList, setRecipes] = useState<IRecipe[] | null>(null);
  const [resultsNumber, increaseResultsNumber] = useState(12)
  
  var url = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian`

  const {query} = useContext(AppContext)

  if(query !== '') {
    url += `&query=${query}`
  }

  url+= `&number=${resultsNumber}&apiKey=${myApiKey}`

  const getRecipes = () => {
    axios({
      method: "get",
      url: url,
      responseType: "json",
    }).then(function (response) {
        setRecipes(
          response.data.results.map(
           (doc: any) =>
             ({ id: doc.id, title: doc.title, image: doc.image } as IRecipe)
         ));
      }
    ).catch(error => console.log(error)) //do nothing
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, resultsNumber]);

  return (
    <div>
      <Row xs={1} md={4} className="g-8">
        {recipesList?.map((recipe) => (
          <Col key={recipe.id}>
            <br />
            <Recipe recipe={recipe} idCard='' />
          </Col>
        ))}
      </Row>
      {recipesList!==null && <div className='container'><Button className="btnLoadMore" variant="primary" onClick={() => increaseResultsNumber((resultsNumber) => resultsNumber + 12)}>Load more</Button></div>}
    </div>
  );
};
