import FilterProducts from "@/components/Filter";
import Products from "@/components/Products";

const Page = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10 py-12">
      <Products
        limit={20}
        filter={true}
        pagination={true}
        customClass="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center"
      />
    </div>
  );
};

export default Page;
