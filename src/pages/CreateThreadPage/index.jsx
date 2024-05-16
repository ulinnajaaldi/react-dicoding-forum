import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncCreateThread } from "@/states/threads/action";

import ActionTopBack from "@/components/common/action-top-back";
import PageWrapper from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateThreadPage = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    body: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostThread = () => {
    dispatch(asyncCreateThread(form));
    setForm({
      title: "",
      category: "",
      body: "",
    });
  };

  return (
    <PageWrapper>
      <ActionTopBack url="/" />
      <div className="container max-w-2xl py-10 md:py-20">
        <h1 className="text-center text-2xl font-bold md:text-4xl">
          Buat thread kamu sendiri!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePostThread();
          }}
          className="mt-5 grid gap-4 md:mt-10"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Judul</Label>
            <Input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Judul thread"
              value={form.title}
              className="bg-white"
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Kategori</Label>
            <Input
              type="text"
              id="category"
              name="category"
              required
              placeholder="Kategori"
              value={form.category}
              className="bg-white"
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="body">Isi</Label>
            <Textarea
              id="body"
              name="body"
              required
              placeholder="Isi thread"
              value={form.body}
              className="bg-white"
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Buat thread</Button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreateThreadPage;
