import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="glassmorphism-auth flex-center h-screen w-full">
      <SignIn />
    </div>
  );
}
