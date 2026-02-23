/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @jest-environment node
 */

import { create, act } from "react-test-renderer";
import Sample from "@/pages/components/sample";

describe("Sample Component", () => {
  test("renders correctly", async () => {
    let component: any;

    await act(async () => {
      component = await create(<Sample />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test("clicks the h1 element and toggles the message", async () => {
    let component: any;

    await act(async () => {
      component = create(<Sample />);
    });

    await act(async () => {
      component.root.findByType("h1").props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test("clicks the button and increments the count", async () => {
    let component: any;

    await act(async () => {
      component = create(<Sample />);
    });

    await act(async () => {
      component.root.findByType("button").props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test("clicks the h1 element twice and toggles the message back", async () => {
    let component: any;

    await act(async () => {
      component = create(<Sample />);
    });

    await act(async () => {
      component.root.findByType("h1").props.onClick();
    });

    await act(async () => {
      component.root.findByType("h1").props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
