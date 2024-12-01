import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('Pagination', () => {
  it('should display current page and total number of pages', () => {    
    const wrapper = render(
      <MemoryRouter initialEntries={["?page=2"]}>
        <Pagination perPage={10} totalCount={200} />
      </MemoryRouter>
    );

    expect(wrapper.getByText('Page 2 of 20')).toBeInTheDocument();
    expect(wrapper.getByText('Total of 200 item(s)')).toBeInTheDocument();
  })

  it('should not be able to navigate to next page when user is in last page', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['?page=10']}>
        <Pagination perPage={10} totalCount={100} />
      </MemoryRouter>
    )

    expect(wrapper.getByTestId('next-page-button')).toBeDisabled();
    expect(wrapper.getByTestId('last-page-button')).toBeDisabled();
  })

  it('should not be able to navigate to previous page when user is in first page', () => {
    const wrapper = render(
      <MemoryRouter>
        <Pagination perPage={10} totalCount={100} />
      </MemoryRouter>
    );

    expect(wrapper.getByTestId('previous-page-button')).toBeDisabled();
    expect(wrapper.getByTestId('first-page-button')).toBeDisabled();
  })

  it('should be able to navigate to next page', async () => {
    // we need BrowserRouter as wrapper so we can access/manipulate window.location
    const wrapper = render(<Pagination perPage={10} totalCount={100} />, { wrapper: BrowserRouter });

    const nextPageButtonElement = wrapper.getByRole('button', {
      name: 'Next page'
    });

    const user = userEvent.setup();
    await user.click(nextPageButtonElement);

    expect(new URLSearchParams(location.search).get('page')).toEqual('2');
  })

  it('should be able to navigate to previous page', async () => {
    // start on page 2
    new URLSearchParams(location.search).set('page', '2')
    // we need BrowserRouter as wrapper so we can access/manipulate window.location
    const wrapper = render(<Pagination perPage={10} totalCount={100} />, { wrapper: BrowserRouter });
    
    const previousButtonElement = wrapper.getByRole('button', {
      name: 'Previous page'
    });

    const user = userEvent.setup();
    await user.click(previousButtonElement);

    expect(new URLSearchParams(location.search).get('page')).toEqual('1');
  })

  it('should be able to navigate to first page', async () => {
    // start on page 2
    new URLSearchParams(location.search).set('page', '2')

    const wrapper = render(<Pagination totalCount={100} perPage={10} />, { wrapper: BrowserRouter })

    const firstPageButtonElement = wrapper.getByRole('button', {
      name: 'First page'
    })

    const user = userEvent.setup();
    await user.click(firstPageButtonElement)

    expect(new URLSearchParams(location.search).get('page')).toEqual('1')
  });

  it('should be able to navigate to last page', async () => {
    const wrapper = render(<Pagination totalCount={100} perPage={10} />, { wrapper: BrowserRouter })
    const lastPageButtonElement = wrapper.getByRole('button', {
      name: 'Last page'
    });

    const user = userEvent.setup();
    await user.click(lastPageButtonElement);

    expect(new URLSearchParams(location.search).get('page')).toEqual('10')
  })
});