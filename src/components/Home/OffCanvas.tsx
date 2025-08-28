import TopLinks from "./TopLinks";
import DepartmentsMenu from "./DepartmentsMenu";

type OffCanvasProps = {
  onClose: () => void;
};

export default function OffCanvas({ onClose }: OffCanvasProps) {
  return (
    <aside className="site-off desktop-hide">
      <div className="off-canvas">
        <div className="canvas-head flexitem">
          <div className="logo">
            <a href="#">
              <span className="circle"></span>&nbsp;EcoBazaarX
            </a>
          </div>
          <a className="t-close flexcenter" onClick={onClose}>
            <i className="ri-close-line"></i>
          </a>
        </div>

        <div className="departments">
          <DepartmentsMenu />
        </div>

        <div className="thetop-nav">
          <div className="right">
            <TopLinks />
          </div>
        </div>
      </div>
    </aside>
  );
}
