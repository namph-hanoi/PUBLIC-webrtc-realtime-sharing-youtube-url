import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateSharing from "./index";

const setup = () => render(<CreateSharing />);

describe('<<<--- CREATE SHARING --->>>', () => {
  it('Expect case user inputs invalid youtube link ', async () => {
      setup();
  })
  it('Expect case user inputs valid youtube link ', async () => {
      setup();
  })
  it('Expect button \'share\' enable when the input valid', async () => {
      setup();
  })
  it('Expect button \'share\' disable when the input invalid', async () => {
      setup();
  })

  it('Expect the browser to return to HomePage after createSharing successful', async () => {
      setup();
  })

  it('Expect not rendering the page when the user\' state is not logged-in', async () => {
      setup();
  })
})