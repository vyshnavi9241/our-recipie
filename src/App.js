import { useState, useEffect } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    searchRecipes();
},[]);

const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setRecipes(data.meals);
    setIsLoading(false);

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  }

    return (
    <div className="container">
      <h1><center>Our Recipe App</center></h1>
      <SearchBar
        isLoading={isLoading}
        query={query}
        setQuery={(event) => setQuery(event.target.value)}
        handleSubmit={handleSubmit}
      />
      <div className="recipes">
        
        {recipes ? recipes.map(recipe => (
          <RecipeCard
             key={recipe.idMeal}
             recipe={recipe}
          />
        )) : "No Results!"}
      </div>
    </div>
  );
}

export default App;
