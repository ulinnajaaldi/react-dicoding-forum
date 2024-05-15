import React from "react";
import { useNavigate } from "react-router-dom";

import PageWrapper from "./page-wrapper";

const PageNotFound = ({ title, url }) => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section className="container flex h-[90vh] max-w-2xl flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">{title} tidak ditemukan</h1>
        <Button onClick={() => navigate(url)}>Kembali</Button>
      </section>
    </PageWrapper>
  );
};

export default PageNotFound;
