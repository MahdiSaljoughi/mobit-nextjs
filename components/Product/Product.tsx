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
    <div className="rounded-xl block bg-white dark:bg-zinc-800 hover:shadow-lg transition-colors font-[fontd1]">
      <Link href={`/products/${item.slug}`}>
        <img src={item.image} alt={item.title} className="rounded-xl w-full" />
      </Link>
      <Link href={`/products/${item.slug}`} className="min-h-20 block">
        <h2 className="text-center line-clamp-2">{item.title}</h2>
      </Link>
      <div className="flex items-center justify-center pb-4 h-14">
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
