import TopLinks from "./TopLinks";
import DepartmentsMenu from "./DepartmentsMenu";

type HeaderProps = {
  onToggleMenu: () => void;
  onToggleSearch: () => void;
  onToggleDpt: () => void;
  defaultDptOpen?: boolean; // 👈 added optional prop
};

export default function Header({
  onToggleMenu,
  onToggleSearch,
  onToggleDpt,
  defaultDptOpen = false, // 👈 default to false
}: HeaderProps) {
  return (
    <header>
      {/* Header Top */}
      <div className="header-top mobile-hide">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left"></div>
            <div className="right">
              <TopLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Header Nav */}
      <div className="header-nav">
        <div className="container">
          <div className="wrapper flexitem">
            <a className="trigger desktop-hide" onClick={onToggleMenu}>
              <i className="ri-menu-2-line"></i>
            </a>
            <div className="left flexitem">
              <div className="logo">
                <a href="#">
                  <span className="circle"></span>&nbsp;EcoBazaarX
                </a>
              </div>
            </div>
            <div className="right">
              <ul className="flexitem second-links">
                <li className="mobile-hide">
                  <a href="#">
                    <div className="icon-large">
                      <i className="ri-heart-line"></i>
                    </div>
                    <div className="fly-item">
                      <span className="item-number">0</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="iscart">
                    <div className="icon-large">
                      <i className="ri-shopping-cart-line"></i>
                      <div className="fly-item">
                        <span className="item-number">0</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="header-main mobile-hide">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left">
              <DepartmentsMenu defaultOpen={defaultDptOpen} />
            </div>
            <div className="right">
              <div className="search-box">
                <form
                  action=""
                  className="search"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <span className="icon-large">
                    <i className="ri-search-line"></i>
                  </span>
                  <input
                    type="search"
                    placeholder="What product are you looking for today?"
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
