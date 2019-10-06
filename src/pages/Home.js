import React from "react";

import { Flex } from "../components";
import { Products, Categories } from "../containers";

export default function Home(props) {
  return (
    <Flex>
      <Categories {...props} />
      <Products {...props} />
    </Flex>
  );
}
