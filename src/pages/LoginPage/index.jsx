import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { asyncSetAuthUser } from "@/states/authUser/action";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormLogin from "./components/FormLogin";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <PageWrapper>
      <div className="container flex h-[90vh] items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Masukan email dan password untuk masuk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormLogin handleLogin={handleLogin} />
            <div className="mt-4 text-center text-sm">
              Tidak punya akun?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
