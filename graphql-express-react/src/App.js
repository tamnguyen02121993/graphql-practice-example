import "./App.css";
import PostViewer from "./PostViewer";
import PostEditor from "./PostEditor";
import { useState } from "react";
import { Container, Button } from "reactstrap";

function App() {
  const [editing, setEditing] = useState(null);
  return (
    <Container>
      <Button className="my-2" color="primary" onClick={() => setEditing({})}>
        New Post
      </Button>
      <PostViewer canEdit={() => true} onEdit={(post) => setEditing(post)} />
      {editing && (
        <PostEditor post={editing} onClose={() => setEditing(null)} />
      )}
    </Container>
  );
}

export default App;
