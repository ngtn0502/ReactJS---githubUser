import React from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = useGlobalContext();
  let acc = githubRepos.reduce((acc, item) => {
    const { language, stargazers_count } = item;
    if (language == null) {
      return acc;
    }
    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      acc[language] = {
        ...acc[language],
        value: acc[language].value + 1,
        stars: acc[language].stars + stargazers_count,
      };
    }
    return acc;
  }, {});

  const mostPopular = Object.values(acc)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostStars = Object.values(acc)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars };
    });

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
        <Pie3D data={mostPopular}></Pie3D>
        <div></div>
        <Doughnut2D data={mostStars}></Doughnut2D>
        <div></div>
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
  }
`;

export default Repos;
