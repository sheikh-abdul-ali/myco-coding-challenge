import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

const clickHandler = jest.fn();

describe("Button", () => {
	it("should render", async () => {
		const screen = render(<Button name={"This is a test button"} handleClick={clickHandler} isDisabled={false} />);
		expect(screen.getByTestId("button")).toBeInTheDocument();
		userEvent.click(screen.getByTestId("button"));
		await waitFor(() => expect(clickHandler).toHaveBeenCalled());
	});

	it("should render with disabled attribute", () => {
		const screen = render(<Button name={"This is a test button"} handleClick={clickHandler} isDisabled={true} />);
		expect(screen.getByTestId("button")).toBeInTheDocument();
		expect(screen.getByTestId("button")).toBeDisabled();
	});

	it("should render with large size", () => {
		const { getByTestId } = render(
			<Button name={"This is a test button"} handleClick={clickHandler} isDisabled={false} size="lg" />
		);
		expect(getByTestId("button")).toHaveClass("button-lg");
	});
});
