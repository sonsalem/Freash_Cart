import ProductSingelPage from "@/components/ProductSingelPage";

interface ParamsType {
  params: {
    id: string;
  };
}
const Page = async ({ params }: ParamsType) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 lg:px-24 py-12">
      <ProductSingelPage id={id} />
    </div>
  );
};

export default Page;
