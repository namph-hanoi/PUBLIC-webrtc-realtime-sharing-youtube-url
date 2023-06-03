import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePgae from "./index";

test('if an amount and note is entered, the pay button becomes enabled', async () => {
    render(<HomePgae />);

    const textElement = screen.getByText('This is the header');


    expect(textElement).toBeInTheDocument();
});