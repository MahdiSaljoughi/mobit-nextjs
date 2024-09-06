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
    <div className="rounded-xl block transition-colors">
      <Link href={`/products/${item.slug}`} className="bg-zinc-100 block rounded-2xl p-8">
        <img src={item.image} alt={item.title} className="rounded-xl w-full hover:scale-105 transition-transform" />
      </Link>
      <Link href={`/products/${item.slug}`} className="block mt-4 text-right">
        <h2 className="line-clamp-2">{item.title}</h2>
      </Link>
      <div className="flex items-center justify-end pb-4 h-14">
        {item.count > 0 ? (
          <span>{`${item.price.toLocaleString()} تومان `}</span>
        ) : (
          <span className="text-red-500 text-sm bg-red-400/20 p-1.5 rounded-xl inline-block">
            ناموجود
          </span>
        )}
      </div>
    </div>
  );
}
