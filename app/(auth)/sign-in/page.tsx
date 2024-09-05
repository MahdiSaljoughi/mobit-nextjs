import SignIn from "@/components/Forms/SignIn";

export default function Page() {
  return (
    <div className="bg-[#fdfdfd]">
      <div className="contain md:flex items-center justify-center min-h-[900px]">
        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
