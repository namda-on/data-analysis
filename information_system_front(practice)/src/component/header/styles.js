import styled from "styled-components";

export const Header = styled.div`
  height: 6rem;
  background-color: black;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0rem 2rem;
`;

export const Title = styled.div`
  font-size: 2rem;

  font-weight: bold;
  color: white;
`;

export const LoginButton = styled.button`
  outline: none;
  border: 1px solid black;
  position: relative;
  background-color: white;

  font-size: 1.6rem;
  font-weight: bold;

  border-radius: 0.5rem;
`;
export const JoinButton = styled.button`
  outline: none;
  border: 1px solid black;
  position: relative;
  left: 630px;

  background-color: white;

  font-size: 1.6rem;
  font-weight: bold;

  border-radius: 0.5rem;
`;

export const LoginBox = styled.div`
  width: 30rem;
  height: 40rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 2rem 2rem;
`;

export const LoginTitle = styled.div`
  font-size: 2rem;

  font-weight: bold;
  margin-bottom: 3rem;
`;

export const LoginLabel = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const LoginInput = styled.input`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const SubmitButton = styled.button`
  width: 15rem;
  outline: none;
  border: 1px solid black;

  background-color: white;

  font-size: 1.6rem;
  font-weight: bold;

  border-radius: 0.5rem;

  margin-top: 4rem;

  &:hover {
    background-color: gray;
  }
`;

export const JoinBox = styled.div`
  width: 40rem;
  height: 60rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 2rem 2rem;
`;
