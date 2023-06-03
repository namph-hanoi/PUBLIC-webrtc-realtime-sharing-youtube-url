import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./index";
import { mount, configure } from 'enzyme';
import { createTheme } from "@mui/material";
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({adapter: new Adapter()});


const setup = () => render(<Header />);

const muiTheme = createTheme();
const deepSetup = () => {
  const wrapper = mount(
    <Header />,
    {
      context: {muiTheme},
    }
  );

  return {
    wrapper,
  };
};

describe('<<<--- HEADER --->>>', () => {
  test('Simulate user inputs valid email, expect normal display of user input', async () => {
    setup();
    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    await userEvent.type(emailField, "namph.tech@gmail.com");
    expect(emailField.value).toBe("namph.tech@gmail.com");
  })

  test('Simulate user inputs invalid email, expect showing some error', async () => {
    setup();
    const { wrapper } = deepSetup();
    
    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const loginBtn = screen.getByRole('button', { name: /login/i })
    await userEvent.type(emailField, "namph.tech");
    expect(emailField.value).toBe("namph.tech");
    
    await userEvent.click(loginBtn);
    
    const emailMuiField = wrapper.find({ "data-testid": "email" }).at(0);
    emailMuiField.simulate('change', { target: { value: 'namph.tech' } });
    const buttonMui = wrapper.find({ "data-testid": "button" }).at(0);
    buttonMui.simulate('click');
    expect(emailMuiField.props().helperText).toEqual(undefined);
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

  // // Todo: delete in the next commit
  // test('Alter the onChange function in index.tsx, expect a awkward change here', async () => {
  //   setup();
  //   await userEvent.type(screen.getByPlaceholderText(/email/i), "55");
  //   const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
  //   expect(emailInput.value).toBe("5050");
  // });
})