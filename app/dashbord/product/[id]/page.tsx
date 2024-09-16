import AdminProducst from "@/components/Admin/Product/Product";
import prismadb from "@/lib/prisma";

export default async function page({ params }: { params: { id: number } }) {
  const product = await prismadb.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!product) {
    return (
      <div className="min-h-[900px] flex items-center justify-center">
        <span className="block text-2xl text-red-400">کالا یافت نشد!</span>
      </div>
    );
  } else {
    return (
      <>
        <AdminProducst product={product} />
      </>
    );
  }
}
