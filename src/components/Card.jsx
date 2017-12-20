import React, { Component } from "react";
import s from "styled-components"; // defines s as the styled-components library;

import commarize from "../helpers/commarize";

const Container = s.div`
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  `;

const Title = s.h2`
  font-family: var(--font-headers);
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  margin: 0;
  font-size: 2.2rem;
  padding: 1rem 0;
`;

const Details = s.ul`
  font-family: var(--font-sans);
  text-transform: uppercase;
  padding: 20px 40px;
  span {
    color: var(--color-accent);
  }
  li {
    margin-bottom: 20px;
  }
`;

class Card extends Component {
  renderDetails = (detail, cardDetail) => {
    let formatedData;

    const renderedCardDetail = cardDetail ? cardDetail : "loading";
    switch (detail) {
      case "population":
        formatedData = `${renderedCardDetail.commarize()} Habitants`;
        break;
      case "height":
        formatedData = `${renderedCardDetail} cm`;
        break;
      case "films":
        const length = cardDetail ? cardDetail.length : 0;
        formatedData = `Featured in ${length} film${length === 1 ? "." : "s."}`;
        break;
      default:
        formatedData = renderedCardDetail;
        break;
    }

    return (
      <li>
        <strong>{detail.split("_").join(" ")}</strong>:{" "}
        <span>{formatedData}</span>
      </li>
    );
  };

  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <Details>
          {this.props.details.map(detail =>
            this.renderDetails(detail, this.props.cardData[detail])
          )}
        </Details>
      </Container>
    );
  }
}

export default Card;
