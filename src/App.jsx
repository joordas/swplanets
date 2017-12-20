import React, { Component } from "react";
import { render } from "react-dom";
import s from "styled-components";

// importing components:
import categories from "./categories";
import Generator from "./components/Generator";
import CategoryPicker from "./components/CategoryPicker";

const Wrapper = s.div`
  max-width: 1000px;
  margin: 0 auto;
  height: 300px;
  grid-gap: 100px;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const Title = s.h1`
  font-family: var(--font-display);
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 4rem;
`;

class App extends Component {
  state = {
    selectedCategory: categories[0][0],
    categoryDetailsToShow: categories[0][1],
    maxRandom: 61
  };

  setMaxRandom = category => {
    // the API call without an id parameter provides us the total count of objects inside that category. we can use that to limimt our randomizer function to that number, and avoid getting 404's.
    fetch(`https://swapi.co/api/${category || this.state.selectedCategory}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ maxRandom: data.count }))
      .catch(error => {
        console.error(error);
      });
  };
  handleCategoryChange = category => {
    const selectedCategory = category[0];
    const categoryDetailsToShow = category[1];
    this.setState({ selectedCategory, categoryDetailsToShow });
    this.setMaxRandom(selectedCategory);
  };

  componentDidMount() {
    this.setMaxRandom();
  }

  render() {
    return (
      <div>
        <Title>Star Wars Trivia</Title>
        <Wrapper>
          <CategoryPicker
            handleCategoryChange={this.handleCategoryChange}
            setMaxRandom={this.setMaxRandom}
            selectedCategory={this.state.selectedCategory}
          />
          <Generator
            maxRandom={this.state.maxRandom}
            for={this.state.selectedCategory}
            details={[...this.state.categoryDetailsToShow]}
          />
        </Wrapper>
      </div>
    );
  }
}

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
