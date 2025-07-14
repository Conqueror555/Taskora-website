import ResetPasswordForm from "@/app/Components/ResetPasswordForm/ResetPasswordForm";

interface PageProps {
  params: {
    resetToken: string;
  };
}

export default function Page({ params }: PageProps) {
  return <ResetPasswordForm resetToken={params.resetToken} />;
}
