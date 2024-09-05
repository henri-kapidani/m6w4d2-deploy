import { Card, Button } from 'react-bootstrap';

function CardRecipe({ recipe }) {
    return (
        <Card>
            <Card.Img variant="top" src={recipe.image} />
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.excerpt}</Card.Text>
                <Button variant="primary">Details</Button>
            </Card.Body>
        </Card>
    );
}

export default CardRecipe;
