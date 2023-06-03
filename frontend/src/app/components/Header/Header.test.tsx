import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./index";

const setup = () => render(<Header />);

describe('<<<--- HEADER --->>>', () => {
  test('Simulate user inputs valid email, expect normal display of user input', async () => {
    setup();
  })
  test('Simulate user inputs invalid email, expect showing some error', async () => {
    setup();
  })
  test('Simulate user inputs valid password, expect normal display of user input', async () => {
    setup();
  })
  test('Simulate user inputs invalid password, expect showing some error', async () => {
    setup();
  })
  test('Expect button login enable when all inputs valid', async () => {
    setup();
  })
  test('Expect button login disable when one input invalid', async () => {
    setup();
  })
  test('Expect button login trigger relevant login function', async () => {
    setup();
  })
  test('Expect user\'s email and button \'Share a video\' to display when user\'s state is logged-in', async () => {
    setup();
  })
  test('Expect the button \'Share a video\' to work', async () => {
    setup();
  })

  // Todo: delete in the next commit
  test('Alter the onChange function in index.tsx, expect a awkward change here', async () => {
    setup();
    await userEvent.type(screen.getByPlaceholderText(/email/i), "55");
    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    expect(emailInput.value).toBe("5050");
  });
})