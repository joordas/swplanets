import React, { Component } from "react";
import s from "styled-components";

import categories from "../categories";

const List = s.ul``;
const Category = s.li``;

class CategoryPicker extends Component {
  render() {
    return (
      <List>
        {categories.map(category => (
          <Category
            onClick={() => this.props.handleCategoryChange(category)}
            setMaxRandom={() => this.props.setMaxRandom(category[0])}
            key={category[0]}
          >
            {category[0]}
          </Category>
        ))}
      </List>
    );
  }
}

export default CategoryPicker;
