import React from "react";
import { render } from "@testing-library/react";
import Column from "../Column";

test("renders without no problem", () => {
  const wrapper = render(<Column />);
  expect(wrapper).toBeTruthy();
});
