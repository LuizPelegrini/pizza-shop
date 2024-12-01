import { render } from "@testing-library/react";
import { SignIn } from "./sign-in";
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/lib/react-query';
import { HelmetProvider } from "react-helmet-async";

describe('SignIn', () => {
  it('should prefill email input if email is provided in url', () => {

    const wrapper = render(
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/sign-in?email=johnfoe@example.com']}>
            <SignIn />
          </MemoryRouter>
        </QueryClientProvider>
      </HelmetProvider>
    );

    // wrapper.debug();

    expect(wrapper.getByTestId('email')).toHaveValue('johnfoe@example.com')
  })
})