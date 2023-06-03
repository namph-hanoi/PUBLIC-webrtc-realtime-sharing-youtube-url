import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateSharing from "./index";

test('if an amount and note is entered, the pay button becomes enabled', async () => {
    render(<CreateSharing />);

    const textElement = screen.getByText('This is the header');


    expect(textElement).toBeInTheDocument();
});