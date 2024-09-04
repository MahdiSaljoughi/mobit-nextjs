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
      src: "/images/poster/pgif.gif",
      src_mobile: "/images/poster/posterMobileSaat.jpg",
      alt: "poster",
    },
    {
      src: "/images/poster/p1.jpg",
      src_mobile: "/images/poster/posterMobileTcl.jpg",
      alt: "poster2",
    },
    {
      src: "/images/poster/p2.jpg",
      src_mobile: "/images/poster/posterMobileHonor.webp",
      alt: "poster3",
    },
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full rounded-none ltr"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
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
