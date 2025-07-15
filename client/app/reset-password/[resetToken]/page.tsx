import ResetPasswordForm from "@/app/Components/ResetPasswordForm/ResetPasswordForm";

interface PageProps {
  params: {
    resetToken: string;
  };
}

// ✅ DO NOT mark this `async` unless you're using `await`
export default function Page({ params }: PageProps) {
  return <ResetPasswordForm resetToken={params.resetToken} />;
}
