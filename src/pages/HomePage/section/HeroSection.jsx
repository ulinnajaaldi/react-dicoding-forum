import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

const HeroSection = (props) => {
  const { categories, category, setCategory } = props;

  return (
    <section className="text-center">
      <div className="container max-w-2xl py-10">
        <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Dicoding Forum React Redux
        </h1>

        <p className="mt-6 text-balance text-lg leading-8 text-gray-600">
          Forum simple yang dibuat dengan React dan Redux Toolkit
        </p>

        <div className="mt-8 flex justify-center">
          <Button size="sm" variant="outline" className="mt-2" asChild>
            <Link to="/leaderboard">
              Lihat Leaderboard
              <ArrowRightIcon className="ml-2 inline-block h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-col">
          {categories?.length > 0 && (
            <h3 className="text-sm font-semibold text-gray-900">
              Kategori Populer
            </h3>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories?.map((cat, index) => (
              <Button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                size="sm"
                variant={cat === category ? "default" : "outline"}
                className="mt-2"
                onClick={() => setCategory(cat === category ? "" : cat)}
              >
                #{cat}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
