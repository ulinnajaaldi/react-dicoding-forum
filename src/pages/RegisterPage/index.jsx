import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { asyncRegisterUser } from "@/states/users/action";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormRegister from "./components/FormRegister";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <PageWrapper>
      <div className="container flex h-[90vh] items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Masukan informasi dibawah untuk membuat akun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormRegister handleRegister={handleRegister} />
            <div className="mt-4 text-center text-sm">
              Sudah punya akun?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default RegisterPage;
