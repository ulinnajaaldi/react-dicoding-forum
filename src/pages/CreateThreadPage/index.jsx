import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncCreateThread } from "@/states/threads/action";

import ActionTopBack from "@/components/common/action-top-back";
import PageWrapper from "@/components/layout/page-wrapper";
import FormCreateThread from "./components/FormCreateThread";

const CreateThreadPage = () => {
  const dispatch = useDispatch();

  const handlePostThread = (form) => {
    dispatch(asyncCreateThread(form));
  };

  return (
    <PageWrapper>
      <ActionTopBack url="/" />
      <div className="container max-w-2xl py-10 md:py-20">
        <h1 className="text-center text-2xl font-bold md:text-4xl">
          Buat thread kamu sendiri!
        </h1>
        <FormCreateThread handlePostThread={handlePostThread} />
      </div>
    </PageWrapper>
  );
};

export default CreateThreadPage;
