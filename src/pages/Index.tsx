import POSLayout from "@/components/pos/POSLayout";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Shop Cash Register</title>
        <meta name="description" content="Modern cash register system with intuitive interface, custom pricing, discounts, and receipt printing. Perfect for retail and food service." />
      </Helmet>
      <POSLayout />
    </>
  );
};

export default Index;
