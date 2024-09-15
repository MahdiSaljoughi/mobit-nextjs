import SignIn from "@/components/Forms/SignIn";

export default function Page() {
  return (
    <div className="bg-[#fdfdfd] md:min-h-screen">
      <div className="contain flex items-center justify-center md:fixed inset-0">
        <div className="w-full">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
