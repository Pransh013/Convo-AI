import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
  return (
    <main className="flex items-center justify-center">
      <SignIn />
    </main>
  );
}
