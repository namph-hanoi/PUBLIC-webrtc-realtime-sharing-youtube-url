import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./index";

const setup = () => render(<HomePage />);

describe('<<<--- HOMEPAGE --->>>', () => {
  it('Expect case when there is no sharing', async () => {
      setup();
  })
  it('Expect case when there are some sharings', async () => {
      setup();
  })
});

