import AuthWrapper from "@/components/auth/AuthWrapper";

export default function DoctorLayout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
