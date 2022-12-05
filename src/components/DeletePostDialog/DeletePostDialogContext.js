import { createContext } from "react";

const DeletePostDialogContext = createContext({
  open: false,
  postId: null,
  message: null,
});

export { DeletePostDialogContext };
