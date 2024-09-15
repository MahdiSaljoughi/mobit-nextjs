import SignUp from "@/components/Forms/SignUp";

export default function SignupPage() {
  return (
    <div className="bg-[#fdfdfd] md:min-h-screen">
      <div className="contain flex items-center justify-center md:fixed inset-0">
        <div className="w-full">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
