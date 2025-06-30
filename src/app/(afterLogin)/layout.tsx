import UserProvider from "@/providers/UserProvider";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
