import Categories from "@/components/Categories";
import SubCategories from "@/components/SubCategories";

const Page = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10 py-12">
      <Categories slider={false} />
      <div className="mt-10">
        <SubCategories />
      </div>
    </div>
  );
};

export default Page;
