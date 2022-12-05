import { useState } from "react";
import { DeletePostDialogContext } from "./DeletePostDialogContext";
import { DeletePostDialog } from "./DeletePostDialog";

const DELETE_POST_INIT = {
  open: false,
  postId: null,
  message: null,
};
function DeletePostDialogContextProvider({ children, afterDeleteCb }) {
  const [state, setState] = useState(DELETE_POST_INIT);

  function closeDeleteModal() {
    setState(DELETE_POST_INIT);
  }

  function openConfirmDeletePostModel(postId) {
    setState({
      open: true,
      postId,
      message: DELETE_POST_INIT.message,
    });
  }

  function handleError() {
    setState((cur) => ({
      ...cur,
      message:
        "There was an error while deleting your post.  Please try again.",
    }));
  }

  return (
    <DeletePostDialogContext.Provider
      value={{
        open: state.open,
        postId: state.postId,
        message: state.message,
        closeDeleteModal,
        openConfirmDeletePostModel,
        handleError,
      }}
    >
      <DeletePostDialog afterDeleteCb={afterDeleteCb} />
      {children}
    </DeletePostDialogContext.Provider>
  );
}

export { DeletePostDialogContextProvider };
