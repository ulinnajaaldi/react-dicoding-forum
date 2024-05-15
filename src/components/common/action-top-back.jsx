import React from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import { Button } from "../ui/button";

const ActionTopBack = ({ url }) => {
  const navigate = useNavigate();

  return (
    <div className="container relative max-w-2xl">
      <div className="absolute left-8 top-0 h-full w-full">
        <Button variant="link" className="pl-0" onClick={() => navigate(url)}>
          <BiChevronLeft className="mr-2 h-5 w-5" />
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default ActionTopBack;
