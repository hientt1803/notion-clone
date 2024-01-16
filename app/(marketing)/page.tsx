import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heros from "./_components/Hero";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex justify-center align-middle items-center flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
