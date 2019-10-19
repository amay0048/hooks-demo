import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const Loader = ({ children, isLoading, isError }) => {
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Something went wrong!</>;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default Loader;
