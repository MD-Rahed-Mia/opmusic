import React from "react";
import FooterMenu from "../component/FooterMenu";
import Nav from "../component/Nav";
export default function Layout({ children }) {
  return (
    <div>
      <section
        className="w-full min-h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0, 0.2), rgba(0,0,0, 0.2)), url(/images/background.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main
          className="min-w-[90%] mx-auto relative min-h-[550px] rounded-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(19,13,131,0.8953782196472339) 0%, rgba(73,34,161,0.9429972672662815) 96%)",
            backdropFilter: "revert-layer",
          }}
        >
          <Nav />

          {children}

          <FooterMenu />
        </main>
      </section>
    </div>
  );
}
