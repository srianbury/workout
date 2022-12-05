import { useContext } from "react";
import {
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { DeletePostDialogContext } from ".";
import { AuthenticatorContext } from "../Authenticator";

function DeletePostDialog({ afterDeleteCb }) {
  const { user } = useContext(AuthenticatorContext);
  const { open, postId, message, closeDeleteModal, handleError } = useContext(
    DeletePostDialogContext
  );
  const [deletePostMutation, { loading, error }] = useMutation(gql`
    mutation ($token: String!, $postId: ID!) {
      deletePost(token: $token, postId: $postId)
    }
  `);

  async function deletePost() {
    const response = await deletePostMutation({
      variables: {
        token: user.token,
        postId,
      },
    });
    if (response?.data?.deletePost === true) {
      closeDeleteModal();
      afterDeleteCb();
    } else {
      handleError();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={closeDeleteModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post?
        </DialogContentText>
        {message ? (
          <DialogContentText id="alert-dialog-message">
            <Alert severity="error" sx={{ mt: 1 }}>
              {message}
            </Alert>
          </DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteModal} variant="contained" color="neutral">
          Cancel
        </Button>
        <Button onClick={deletePost} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DeletePostDialog };
