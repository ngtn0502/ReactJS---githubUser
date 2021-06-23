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
  // For pie3d chart

  const mostPopular = Object.values(acc)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // For doughnut3d chart
  const mostStars = Object.values(acc)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars };
    });

  // For bar and column chart

  const data = githubRepos.reduce(
    (total, item) => {
      const { forks_count, stargazers_count, name } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks_count] = { label: name, value: forks_count };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  // For column3d chart
  const stars = Object.values(data.stars).slice(-5).reverse();
  // For bar3d chart
  const forks = Object.values(data.forks).slice(-5).reverse();

  // Random data first
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
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostStars}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
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
