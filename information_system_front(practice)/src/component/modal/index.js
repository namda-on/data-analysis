import React from "react";

import * as S from "./styles";

const Modal = ({ children, show, toggleModal }) => (
  <S.Modal show={show} onClick={toggleModal}>
    <S.Container onClick={(e) => e.stopPropagation()}>{children}</S.Container>
  </S.Modal>
);

export default Modal;
