import React, { Component } from "react";
import s from "styled-components"; // defines s as the styled-components library;

const Container = s.div`
  border: 1px solid red;
`;

const Title = s.h1`

`;

const Details = s.div``;

class Card extends Component {
  renderDetails = (detail, cardDetail) => {
    let formatedData;

    switch (detail) {
      case "population":
        formatedData = `${cardDetail} habitants`;
        break;
      case "height":
        formatedData = `${cardDetail} cm`;
        break;
      case "films":
        const length = cardDetail ? cardDetail.length : 0;
        formatedData = `Featured in ${length} film${length === 1 ? "." : "s."}`;
        break;
      default:
        formatedData = cardDetail;
        break;
    }

    return <p>{`${detail.split("_").join(" ")}: ${formatedData}`}</p>;
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
