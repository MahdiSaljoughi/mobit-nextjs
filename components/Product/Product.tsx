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
    <Link
      href={`/products/${item.slug}`}
      className="rounded-2xl group/product p-4 transition-colors flex gap-x-3 lg:flex-col"
    >
      <span className="block w-60 lg:w-full lg:min-h-40 bg-zinc-100 rounded-2xl p-2 lg:p-8">
        <img
          src={item.image}
          alt={item.title}
          className="w-full lg:w-40 lg:min-h-40 group-hover/product:scale-110 transition-transform-2 mx-auto"
        />
      </span>
      <span className="flex flex-col justify-between gap-y-2">
        <span className="block lg:pt-4 text-right h-[56px] lg:h-[74px]">
          <h2 className="leading-6 lg:leading-7 line-clamp-2 text-[12px] lg:text-sm">
            {item.title}
          </h2>
        </span>
        <span className="block">
          {item.count > 0 ? (
            <span className="text-[12px] lg:text-sm block text-left">{`${item.price.toLocaleString()} تومان `}</span>
          ) : (
            <span className="text-red-500 text-[12px] lg:text-sm block text-center">
              ناموجود
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}
