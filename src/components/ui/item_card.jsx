import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SimpleCard({ name, desc }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/new.webp" alt={name} />

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SimpleCard;
