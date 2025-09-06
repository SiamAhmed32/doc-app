import AuthWrapper from "@/components/auth/AuthWrapper";

export default function PatientLayout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
