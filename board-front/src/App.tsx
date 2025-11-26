
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./stores/auth.store";
import RegisterPage from "./pages/RegisterPage";
import OAuth2CallbackPage from "./pages/OAuth2CallbackPage";
import { useEffect } from "react";
import { userApi } from "./apis/user/user.api";
import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";

export default function App() {
  const { isInitialized, accessToken, user, setUser } = useAuthStore();

  useEffect(() => {
    console.log(isInitialized);
    if (!isInitialized) return;
    if (!accessToken) return;
    if (user) return;

    (async () => {
      if (accessToken && !user) {
        const me = await userApi.me();
        if (me.success && me.data) {
          setUser(me.data);
        }
      }
    })();

  }, [isInitialized, accessToken]);

  if (!isInitialized) {
    return <div>로딩중</div>
  }

  const isLoggedIn = Boolean(accessToken && user);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <div> Main - DashBoard </div>
      </Layout>
    </>
  );
}
