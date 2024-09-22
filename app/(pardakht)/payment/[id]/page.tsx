import Payment from "@/components/Cart/Payment";

export default function page({ params }: { params: { id: any } }) {
  return (
    <>
      <Payment orderId={params.id} />
    </>
  );
}
