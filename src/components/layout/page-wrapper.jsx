import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 z-[-1] h-[360px] w-full">
        <div className="absolute inset-0 z-[-1] h-full w-full bg-gradient-to-t from-white to-transparent" />
        <div
          className="absolute inset-0 z-[-2] h-full w-full "
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
