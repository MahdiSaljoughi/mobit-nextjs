import Link from "next/link";
interface ProductItem {
  slug: string;
  image: string;
  title: string;
  price: number;
  id: number;
  count: number;
  description: string;
  cat: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductProps {
  item: ProductItem;
}

export default function Product({ item }: ProductProps) {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <Link href={`/products/${item.slug}`}>
        <img src={item.image} alt={item.title} className="rounded-t-xl" />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/products/${item.slug}`}>
          <h2 className="text-lg">{item.title}</h2>
        </Link>
        <p className="p-2">{item.price}</p>
        <button className="rounded-xl bg-gray-700 text-white px-4 py-2">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
