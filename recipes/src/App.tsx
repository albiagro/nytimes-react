import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {MyNavBar} from './components/navbar'
import {Main} from './pages/main'
import { RecipeStepByStep } from './pages/recipe-instructions';

function App() {
  return (
    <div className="App">
      <Router>
      <MyNavBar />
        <Routes>
          <Route path="/" element={<Main query={''}/>} />
          <Route path="/recipe-instructions" element={<RecipeStepByStep />} />
          <Route path="/feel-lucky" element={<Main query={''} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
