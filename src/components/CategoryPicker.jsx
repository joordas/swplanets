import React, { Component } from "react";
import s from "styled-components";

import categories from "../categories";

const List = s.ul`
  background-color: var(--lightGrey);
  margin: 0;
  padding: 20px;
  font-family: var(--font-headers);

`;
const Category = s.li`
  background-color: white;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 8px 4px;
  font-size: 1.4rem;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;
  &.selected {
    border-color: var(--color-accent);
  }
`;

const Title = s.h3`
  
`;

class CategoryPicker extends Component {
  render() {
    return (
      <div>
        <Title>Categories:</Title>
        <List>
          {categories.map(category => (
            <Category
              onClick={() => this.props.handleCategoryChange(category)}
              setMaxRandom={() => this.props.setMaxRandom(category[0])}
              key={category[0]}
              className={
                this.props.selectedCategory === category[0] ? "selected" : ""
              }
            >
              {category[0]}
            </Category>
          ))}
        </List>
      </div>
    );
  }
}

export default CategoryPicker;
