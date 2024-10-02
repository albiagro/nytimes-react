import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../components/recipe";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const myApiKey = process.env.REACT_APP_API_KEY;

export interface IRecipe {
  id: number;
  title: string;
  image: string;
}

interface Props {
  query: string
}

export const Main = (props : Props) => {
  var {query} = props
  const [recipesList, setRecipes] = useState<IRecipe[] | null>(null);
  const [resultsNumber, increaseResultsNumber] = useState(12)
  const location = useLocation()
  var url = `https://api.spoonacular.com/recipes/complexSearch?`

  // console.log(location.state.query)
   if(location.state !== null) query = location.state.query

  if(query !== '') {
    url += `query=${query}`
  }
  else {
    url+= `diet=vegetarian`
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
  }, [query, resultsNumber]);


  return (
    <div>
      <Row xs={1} md={4} className="g-8">
        {recipesList?.map((recipe) => (
          <Col key={recipe.id}>
            <br />
            <Recipe recipe={recipe} />
          </Col>
        ))}
      </Row>
      {recipesList!==null && <div className='container'><Button className="btnLoadMore" variant="primary" onClick={() => increaseResultsNumber((resultsNumber) => resultsNumber + 12)}>Load more</Button></div>}
    </div>
  );
};
