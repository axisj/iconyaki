import styled from "@emotion/styled";
import { ConfigProvider } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "./layout.css";
import { SMixinFlexColumn } from "../styles/emotion";

interface Props {}

export function Layout({}: Props) {
  return (
    <Container>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "system-ui",
            fontSize: 13,
            controlHeightSM: 25,
            borderRadius: 4
          },
          components: {}
        }}
      >
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
      </ConfigProvider>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  ${SMixinFlexColumn("stretch", "stretch")};
`;
