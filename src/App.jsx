import React, { Component } from "react";
import { render } from "react-dom";

// importing components:
import categories from "./categories";
import Generator from "./components/Generator";
import CategoryPicker from "./components/CategoryPicker";

class App extends Component {
  state = {
    selectedCategory: categories[0][0],
    categoryDetailsToShow: categories[0][1],
    maxRandom: 61
  };

  setMaxRandom = category => {
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
        <CategoryPicker
          handleCategoryChange={this.handleCategoryChange}
          setMaxRandom={this.setMaxRandom}
        />
        <Generator
          maxRandom={this.state.maxRandom}
          for={this.state.selectedCategory}
          details={[...this.state.categoryDetailsToShow]}
        />
      </div>
    );
  }
}

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
