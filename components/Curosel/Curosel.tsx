"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Curosel() {
  const itmes = [
    {
      src: "/images/poster/1.jpg",
      src_mobile: "/images/poster/1mobile.jpg",
      alt: "poster1",
    },
    {
      src: "/images/poster/2.jpg",
      src_mobile: "/images/poster/2mobile.webp",
      alt: "poster2",
    },
    {
      src: "/images/poster/3.gif",
      src_mobile: "/images/poster/3mobile.jpg",
      alt: "poster3",
    },
    {
      src: "/images/poster/4.webp",
      src_mobile: "/images/poster/4mobile.webp",
      alt: "poster4",
    },
    {
      src: "/images/poster/5.webp",
      src_mobile: "/images/poster/5mobile.webp",
      alt: "poster5",
    },
    {
      src: "/images/poster/6.webp",
      src_mobile: "/images/poster/6mobile.webp",
      alt: "poster6",
    },
    {
      src: "/images/poster/7.webp",
      src_mobile: "/images/poster/7mobile.webp",
      alt: "poster7",
    },
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel plugins={[plugin.current]} className="w-full rounded-none ltr">
      <CarouselContent>
        {itmes.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-2 md:p-0 bg-zinc-50 dark:bg-zinc-900">
                <Link href="/">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="hidden md:block w-full"
                  />
                  <img
                    src={item.src_mobile}
                    alt={item.alt}
                    className="block md:hidden rounded-2xl w-full"
                  />
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
