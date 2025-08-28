import Header from "../Header";

interface ProductHeaderProps {
  defaultDptOpen?: boolean;
}

export default function ProductHeader({ defaultDptOpen = false }: ProductHeaderProps) {
  return (
    <>

      {/* Main Header reused from Home */}
      <Header defaultDptOpen={defaultDptOpen} />
    </>
  );
}
