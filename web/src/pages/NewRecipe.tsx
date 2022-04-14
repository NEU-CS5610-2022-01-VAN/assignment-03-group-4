import React from "react";
import { Form, Button } from "react-bootstrap";

const NewRecipe = () => {
  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formRecipeTitle">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRecipeContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Content"
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default NewRecipe;
