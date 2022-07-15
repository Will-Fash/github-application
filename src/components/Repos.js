import React, {useContext} from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const {repos} = useContext(GithubContext);

  // variable to hold most popular languages in the repo
  let languages =  repos.reduce((total, item) => {
    const {language, stargazers_count} = item;

    if(!language) return total;

    if(!total[language])
      total[language] = {label: language, value: 1, stars: stargazers_count};
    else
      total[language] = {...total[language], value : total[language].value + 1, stars: total[language].stars + stargazers_count};

    return total;
  }, {})

  // To extract the 5 most popular languages depending on the amount of times they appear in the repos array
  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 5);

  // most stars per language
  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars = a.stars;
  }).map((item) => {
    return {...item,value: item.stars};
  }).slice(0, 5);

  // stars and forks
  let {stars, forks} = repos.reduce((total, item) => {

    const {stargazers_count, name, forks} = item;
    total.stars[stargazers_count] = {label: name, value: stargazers_count};
    total.forks[forks] = {label: name, value: forks}
    return total;
  }, {
    stars: {}, forks: {}
  })

  // Get top 5 repos with most stars
  stars = Object.values(stars).slice(-5).reverse();

  // Get top 5 repos that have been forked the most
  forks = Object.values(forks).slice(-5).reverse();

  const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "160"
  },
  {
    label: "Javascript",
    value: "80"
  }
];

  return <section className={"section"}>
    <Wrapper className={"section-center"}>
      <Pie3D data={mostUsed}/>
      <Column3D data={stars}/>
      <Doughnut2D data={mostPopular}/>
      <Bar3D data={forks}/>
    </Wrapper>
  </section>

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
