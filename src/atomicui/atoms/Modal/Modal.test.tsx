/* eslint-disable react/no-children-prop */
import { render } from "@testing-library/react";

import Modal from "./Modal";

const onClose = jest.fn();

const title = "This is test modal";

describe("Modal", () => {
	it("should render", () => {
		const { getByTestId } = render(<Modal onClose={onClose} title={title} children={""} />);
		expect(getByTestId("modal")).toBeInTheDocument();
	});

	it("should render with title", () => {
		const { getByTestId } = render(<Modal onClose={onClose} title={title} children={""} />);
		expect(getByTestId("modal-title")).toHaveTextContent(title);
	});

	it("should fire the onClose button", () => {
		const { getByTestId } = render(<Modal onClose={onClose} title={title} children={""} />);
		getByTestId("modal-close").click();
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
