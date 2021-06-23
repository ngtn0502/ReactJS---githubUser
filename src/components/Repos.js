import React from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = useGlobalContext();
  let init = { CSS: 0, JavaScript: 0, HTML: 0 };
  const acc = githubRepos.reduce((acc, item) => {
    if (acc[item.language] != null) {
      return;
    }
    if (acc[item.language]) {
      acc[item.language] += 1;
    } else {
      acc[item.language] = 1;
    }
    return acc;
  }, init);

  const chartData = [
    {
      label: "CSS",
      value: "100",
    },
    {
      label: "Javascript",
      value: "260",
    },
    {
      label: "HTML",
      value: "120",
    },
  ];

  return (
    <div className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData}></ExampleChart> */}
        <Pie3D data={chartData}></Pie3D>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
