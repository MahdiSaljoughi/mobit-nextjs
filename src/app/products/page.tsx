import MainFooter from "@/src/components/Footer/MainFooter";
import Product from "@/src/components/Product/Product";

export default async function ProducstPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const products = data.products;

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
