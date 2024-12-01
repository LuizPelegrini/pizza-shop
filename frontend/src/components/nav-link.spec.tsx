import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { NavLink } from "./nav-link"

describe('NavLink', () => {
  it('should be an active if page path matches link path', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/about']}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </MemoryRouter>
    );

    expect(wrapper.getByText('Home').dataset.active).toEqual('false');
    expect(wrapper.getByText('About').dataset.active).toEqual('true');
  })
})