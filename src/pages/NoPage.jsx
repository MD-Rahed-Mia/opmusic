import React from "react";
import Layout from "./Layout";

export default function NoPage() {
  return (
    <div>
      <Layout>
        <div className="w-full min-h-[500px] flex items-center justify-center flex-col">
          <h1 className="text-3xl text-center text-white">No Page found</h1>
          <h1 className="text-3xl text-center text-white">404</h1>
        </div>
      </Layout>
    </div>
  );
}
