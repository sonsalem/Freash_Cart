import BestSale from "@/components/BestSale";
import Categories from "@/components/Categories";
import Featuers from "@/components/Featuers";
import Grocery from "@/components/Grocery";
import LandingSlider from "@/components/LandingSlider";
import Products from "@/components/Products";

const Page = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <LandingSlider />
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <Categories slider={true} />
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <Grocery />
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <Products
          limit={10}
          header={true}
          customClass="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <BestSale />
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-20">
        <Featuers />
      </div>
    </div>
  );
};

export default Page;
