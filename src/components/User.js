import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Followers from "./Followers";
const User = () => {
  return (
    <div className="section">
      <Wrapper className="section-center">
        <Card></Card>
        <Followers></Followers>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  width: 90vw;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
