import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Form as FinalForm, Field } from "react-final-form";
import client from "./apollo";
import { GET_POSTS, CREATE_POST } from "./gql";

function PostEditor(props) {
  const { post, onClose } = props;

  const onSubmit = async ({ id, author, body }) => {
    const input = { id, author, body };
    await client.mutate({
      variables: { input },
      mutation: CREATE_POST,
      refetchQueries: () => [{ query: GET_POSTS }],
    });

    if (onClose) {
      onClose();
    }
  };

  const onRender = ({ handleSubmit, pristine, invalid }) => {
    return (
      <Modal isOpen toggle={onClose}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={onClose}>
            {post.id ? "Edit Post" : "New Post"}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Author</Label>
              <Field
                required
                name="author"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Body</Label>
              <Field
                required
                name="body"
                className="form-control"
                component="input"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled={pristine} color="primary">
              Save
            </Button>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={post}
      render={onRender}
    ></FinalForm>
  );
}

export default PostEditor;
