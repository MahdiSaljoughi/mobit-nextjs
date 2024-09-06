import { Curosel } from "@/components/Curosel/Curosel";
import Item8 from "@/components/Item8/Item8";

export default function Home() {
  return (
    <>
      <main className="min-h-[900px] flex flex-col gap-y-2">
        <Curosel />
        <section className="contain">
          <Item8 />
        </section>
      </main>
    </>
  );
}
