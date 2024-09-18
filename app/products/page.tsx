import axios from "axios";
import MainFooter from "@/components/Footer/MainFooter";
import Product from "@/components/Product/Product";

export default async function ProducstPage() {
  const productsFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
  );
  const products = JSON.parse(productsFetch.data.products);

  return (
    <>
      <div className="min-h-screen contain">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6">
          {products.map((product: any, index: any) => (
            <div key={index} className="border-b lg:border-none">
              <Product item={product} />
            </div>
          ))}
        </div>
      </div>
      <MainFooter />
    </>
  );
}
