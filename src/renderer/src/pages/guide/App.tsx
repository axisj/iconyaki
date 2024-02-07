import styled from "@emotion/styled";
import { message } from "antd";
import * as React from "react";
import { SMixinFlexColumn } from "../../styles/emotion";

interface Props {
  accept?: string;
}

export default function App({ accept = "image/svg+xml" }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Container>
      <h2>아이콘 색상</h2>
      <pre>
        {`
<svg
  width="28"
  height="28"
  viewBox="0 0 28 28"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M14 6.8823C7.37 6.8823 2 11.4323"
    fill="#000000"
  />
  <path
    d="M12.08 3.1823C10.72 3.4523 8.53 3.5323"
    stroke="#000000"
  />
</svg>
`}
      </pre>
      <br />
      <br />
      위와 같이 svg파일을 생성하면
      {'fill="#000000", fill="black" 또는 stroke="#000000", stroke="black"'} 이 사용된 path는
      iconyaki.module.css 파일에 선언된 스타일에 따라. currentColor로 색상이 적용됩니다. 만일
      #000000이나 black값이 아니라면 고유의 색상이 적용됩니다.
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: auto;
  padding: 20px;
`;
