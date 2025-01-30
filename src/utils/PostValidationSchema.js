import * as Yup from "yup";
const postValidationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Title must be 100 characters or less.")
      .min(1, "Title cannot be blank")
      .strict()
      .required("Title is required."),
    shortDescription: Yup.string().max(
      500,
      "Short description must be 500 characters or less."
    ),
    longDescription: Yup.string().max(
      5000,
      "Long description must be 5000 characters or less."
    ),
    videoSource: Yup.string().max(
      200,
      "Video URL must be 200 characters or less."
    ),
});

export { postValidationSchema };