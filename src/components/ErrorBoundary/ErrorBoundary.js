import * as Sentry from "@sentry/react";
import { ErrorBoundaryFallback } from "../ErrorBoundaryFallback";

const ErrorBoundary = ({ children, tags }) => (
  <Sentry.ErrorBoundary
    beforeCapture={(scope) => {
      tags.forEach((tag) => scope.setTag(...tag));
    }}
    fallback={ErrorBoundaryFallback}
    showDialog
    dialogOptions={{
      title: "Whoops!",
      subtitle:
        "We're sorry for the inconvenience.  Our platform is in the early stages of development and we would greatly appreciate it if you would take the time to tell us what happened so we can quickly fix the issue and continue to work on new features for the platform and community.",
      subtitle2: "",
    }}
  >
    {children}
  </Sentry.ErrorBoundary>
);

export { ErrorBoundary };
