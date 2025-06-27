import Login from "./_components/Login";
import OAuthErrorHandler from "./_components/OAuthErrorHandler/OAuthErrorHandler";

export default function LoginPage() {
  return (
    <>
      <OAuthErrorHandler />
      <Login />
    </>
  );
}
