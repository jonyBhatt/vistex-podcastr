import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="glassmorphism-auth flex-center h-screen w-full">
      <SignUp />
    </div>
  );
}
