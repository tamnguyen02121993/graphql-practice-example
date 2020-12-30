import React from "react";
import { Query } from "react-apollo";
import { Table } from "reactstrap";
import { GET_POSTS } from "./gql";

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

function PostViewer(props) {
  const { canEdit, onEdit } = props;
  const rowStyles = (post, canEdit) =>
    canEdit(post) ? { cursor: "pointer", fontWeight: "bold" } : {};
  return (
    <Query query={GET_POSTS}>
      {({ loading, data }) =>
        !loading && (
          <Table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((p) => (
                <tr
                  key={p.id}
                  style={rowStyles(p, canEdit)}
                  onClick={() => canEdit(p) && onEdit(p)}
                >
                  <td>{p.author}</td>
                  <td>{p.body}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
    </Query>
  );
}

export default PostViewer;
