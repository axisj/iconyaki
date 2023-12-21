import styled from "@emotion/styled";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "./layout.css";
import { SMixinFlexColumn } from "../styles/emotion";

interface Props {}

export function Layout({}: Props) {
  return (
    <Container>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  ${SMixinFlexColumn("stretch", "stretch")};
`;
