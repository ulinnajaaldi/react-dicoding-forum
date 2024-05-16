import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "react-router-dom";

const Navbar = ({ authUser, onSignOut }) => {
  const pathname = useLocation().pathname;
  const authPage = ["/login", "/register"];

  const renderButton = () => {
    if (authPage.includes(pathname)) {
      return (
        <Button variant="outline" asChild>
          <Link to="/">Homepage</Link>
        </Button>
      );
    } else {
      return (
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      );
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur-sm">
      <nav className="container flex items-center justify-between py-2">
        <Link to="/">
          <h1 className="text-xl font-bold">Dicoding Forum</h1>
        </Link>
        {authUser ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <p className="font-medium">{authUser?.data.user.name}</p>
                  <Avatar>
                    <AvatarImage src={authUser?.data.user.avatar} />
                    <AvatarFallback>UL</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {authUser?.data.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/">Homepage</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboard">Ledaerboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create-thread">Create Treads</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          renderButton()
        )}
      </nav>
    </header>
  );
};

export default Navbar;
