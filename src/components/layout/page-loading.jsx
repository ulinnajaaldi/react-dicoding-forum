import React from "react";
import PageWrapper from "./page-wrapper";

const PageLoading = () => {
  return (
    <PageWrapper>
      <section className="container flex h-[90vh] max-w-2xl flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </section>
    </PageWrapper>
  );
};

export default PageLoading;
