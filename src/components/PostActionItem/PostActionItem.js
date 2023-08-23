import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeletePostDialogContext } from "../DeletePostDialog";

function PostActionItem({ postId }) {
  const router = useRouter();
  const { openConfirmDeletePostModel } = useContext(DeletePostDialogContext);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);

  function handleClick(event) {
    setMenuAnchor(event.currentTarget);
  }

  function handleClose() {
    setMenuAnchor(null);
  }

  function handleEdit() {
    router.push(`/edit/${postId}`);
  }

  function deletePost() {
    openConfirmDeletePostModel(postId);
  }

  return (
    <Box>
      <IconButton
        id="edit-post-menu-icon-button"
        aria-label="edit"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="edit-post-menu"
        anchorEl={menuAnchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem id="edit-post-option-edit" onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem id="edit-post-option-delete" onClick={deletePost}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export { PostActionItem };
