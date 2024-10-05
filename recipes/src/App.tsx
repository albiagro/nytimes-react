import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {MyNavBar} from './components/navbar'
import {Main} from './pages/main'
import { RecipeStepByStep } from './pages/recipe-instructions';
import { FeelLucky } from './pages/feel-lucky';
import { createContext, useState } from 'react';

export type GlobalContent = {
  query: string
  setQuery:(c: string) => void
}

export const AppContext = createContext<GlobalContent>({
  query: '',
  setQuery: () => {}
})

function App() {

  const [query, setQuery] = useState('')

  return (
    <div className="App">
      <AppContext.Provider value = {{query, setQuery}}>
      <Router>
      <MyNavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recipe-instructions" element={<RecipeStepByStep />} />
          <Route path="/feel-lucky" element={<FeelLucky />} />
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
