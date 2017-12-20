import React, { Component } from "react";
import s from "styled-components";

import Card from "./Card";

const RandomButton = s.button`

`;

class Generator extends Component {
  state = {
    cardData: {}
  };

  fetchCardData = () => {
    // this fetch will query a random number to the api, making sure the output is not higher than the count the API has available.
    fetch(
      `https://swapi.co/api/${this.props.for}/${Math.ceil(
        Math.random() * this.props.maxRandom
      )}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      // sometimes the API will return an planet with a 'unknown' name (i.e. https://swapi.co/api/planets/28/) . This could take the fun out of the game, so we filter the results and call the api again if it returns unkown.
      .then(data => {
        console.log(data);
        data.name !== "unknown"
          ? this.setState({ cardData: data })
          : this.fetchCardData();
      })
      .catch(error => {
        console.error(error);
        // sometimes, the API can also return a 404 even within the count limit (i.e. https://swapi.co/api/people/17/), so we make sure it returns a valid result by calling it again in those cases.
        this.fetchCardData();
      });
  };

  componentWillReceiveProps() {
    this.fetchCardData();
  }

  render() {
    return (
      <div>
        <Card
          title={this.state.cardData.name || ""}
          for={this.props.for}
          cardData={this.state.cardData}
          details={this.props.details}
        />
        <RandomButton onClick={this.fetchCardData}>Next</RandomButton>
      </div>
    );
  }
}

export default Generator;