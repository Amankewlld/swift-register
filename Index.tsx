import POSLayout from "@/components/pos/POSLayout";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Quick Shop POS - Fast & Easy Cash Register System</title>
        <meta name="description" content="Modern point of sale system with intuitive interface, custom pricing, discounts, and receipt printing. Perfect for retail and food service." />
      </Helmet>
      <POSLayout />
    </>
  );
};

export default Index;
