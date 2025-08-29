import { useState, useEffect, useMemo } from "react";
import Header from "../components/Home/Header";
import OffCanvas from "../components/Home/OffCanvas";
import SliderHero from "../components/Home/SliderHero";
import Features from "../components/Home/Features";
import Trending from "../components/Home/Trending";
import Footer from "../components/Home/Footer";

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDpt, setShowDpt] = useState(false);

  // dynamic body class names
  const siteClass = useMemo(
    () =>
      [
        "site",
        "page-home",
        showMenu && "showmenu",
        showSearch && "showsearch",
        showDpt && "showdpt",
      ]
        .filter(Boolean)
        .join(" "),
    [showMenu, showSearch, showDpt]
  );

  // prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  return (
    <div id="page" className={siteClass}>
      {/* Side Menu */}
      <OffCanvas onClose={() => setShowMenu(false)} />

      {/* Header */}
      <Header defaultDptOpen={true} /> 


      {/* Main Content */}
      <main>
        <SliderHero />
        {/* <Trending /> */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay */}
      {(showMenu || showSearch || showDpt) && (
        <div
          className="overlay"
          onClick={() => {
            setShowMenu(false);
            setShowSearch(false);
            setShowDpt(false);
          }}
        />
      )}
    </div>
  );
}
