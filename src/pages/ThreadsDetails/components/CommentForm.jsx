import React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CommentForm = (props) => {
  const { authUser, content, setContent, handleComment } = props;

  return (
    <form className="space-y-2">
      <h2 className="text-lg font-semibold">Beri Komentar</h2>
      <div className="flex flex-col gap-1">
        <Textarea
          placeholder="Tulis komentar anda"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={authUser ? false : true}
        />
        <Button
          type="submit"
          size="sm"
          disabled={authUser ? false : true}
          onClick={handleComment}
        >
          Kirim
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
