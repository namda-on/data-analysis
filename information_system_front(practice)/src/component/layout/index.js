import React from "react";

import * as S from "./styles";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <S.Layout>
      <Header />
      <S.Content>
        <S.ContentContainer>{children}</S.ContentContainer>
      </S.Content>
    </S.Layout>
  );
};

export default Layout;
