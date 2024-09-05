import { useEffect, useState } from 'react';
import CardRecipe from '../components/CardRecipe';

function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/recipes`)
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((data) => setRecipes(data.data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1>Our recipes</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                recipes.map((recipe) => (
                    <CardRecipe recipe={recipe}></CardRecipe>
                ))
            )}
        </div>
    );
}

export default RecipesList;
