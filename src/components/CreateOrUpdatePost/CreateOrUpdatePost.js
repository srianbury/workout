import Head from "next/head";
import Link from "next/link";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Alert,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

function CreateOrUpdateView({ user, variant, children }) {
  const subtext = variant === "Update" ? "update this" : "create a";
  return (
    <div>
      <Head>
        <title>Workout | {variant}</title>
      </Head>
      <main>
        <Box sx={{ mb: 1 }}>
          <h1>{variant}</h1>
        </Box>
        {user ? (
          children
        ) : (
          <Box>
            <Box>{`Please login to ${subtext} Post.`}</Box>
            <Link href="/signin">
              <Box
                sx={{
                  display: "inline",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                Sign In.
              </Box>
            </Link>
          </Box>
        )}
      </main>
    </div>
  );
}
CreateOrUpdateView.propTypes = {
  variant: PropTypes.oneOf(["Create", "Update"]).isRequired,
};

function CreateOrUpdatePostView({ formik, loading, error, onCancel, variant }) {
  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          id="title"
          name="title"
          type="text"
          label="Title"
          variant="outlined"
          {...formik.getFieldProps("title")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.title && formik.errors.title ? (
          <Alert severity="error">{formik.errors.title}</Alert>
        ) : null}
        <TextField
          id="shortDescription"
          name="shortDescription"
          type="text"
          label="Brief Description"
          variant="outlined"
          {...formik.getFieldProps("shortDescription")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.shortDescription && formik.errors.shortDescription ? (
          <Alert severity="error">{formik.errors.shortDescription}</Alert>
        ) : null}
        <TextField
          id="longDescription"
          name="longDescription"
          type="text"
          label="Describe the Workout"
          variant="outlined"
          {...formik.getFieldProps("longDescription")}
          fullWidth
          multiline
          minRows={4}
          sx={{
            display: "block",
          }}
        />
        {formik.touched.longDescription && formik.errors.longDescription ? (
          <Alert severity="error">{formik.errors.longDescription}</Alert>
        ) : null}
        <TextField
          id="videoSource"
          name="videoSource"
          type="text"
          label="Video Source"
          placeholder="i.e. https://www.youtube.com/watch?v=Kuv0xThzxrU"
          variant="outlined"
          {...formik.getFieldProps("videoSource")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.videoSource && formik.errors.videoSource ? (
          <Alert severity="error">{formik.errors.videoSource}</Alert>
        ) : null}
        <Box>
          <Button
            id={variant === "Update" ? "updateId" : "submitId"}
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting || loading}
            variant="outlined"
          >
            {formik.isSubmitting || loading ? (
              <CircularProgress sx={{ mr: 1 }} size={20} />
            ) : null}
            {variant === "Update" ? "Update" : "Submit"}
          </Button>
          <Button
            onClick={onCancel}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
        {error ? (
          <Alert severity="error">An unexpected error occurred.</Alert>
        ) : null}
      </Stack>
    </Box>
  );
}
CreateOrUpdatePostView.propTypes = {
  onCancel: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["Create", "Update"]).isRequired,
};

export { CreateOrUpdateView, CreateOrUpdatePostView };
