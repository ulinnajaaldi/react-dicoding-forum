import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FormCreateThread = ({ handlePostThread }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    body: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handlePostThread(form);
        setForm({
          title: "",
          category: "",
          body: "",
        });
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
  );
};

export default FormCreateThread;
