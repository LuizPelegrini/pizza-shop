import { render } from '@testing-library/react';
import { OrderStatus } from './order-status';

describe('Order Status', () => {
  it('should display Pending text if status is pending', () => {
    const wrapper = render(<OrderStatus status='pending'/>);

    // displays the HTML output from component for debugging purposes...
    // wrapper.debug();

    const element = wrapper.getByText('Pending');
    const badgeElement = wrapper.getByTestId('badge');

    // for debugging purposes, print out the element html
    // console.log(element.outerHTML);

    expect(element).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-slate-400');
  })

  it('should display Processing text if status is processing', () => {
    const wrapper = render(<OrderStatus status='processing'/>);
    const element = wrapper.getByText('Processing');
    const badgeElement = wrapper.getByTestId('badge');

    expect(element).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-amber-500');
  })

  it('should display Canceled text if status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />);
    const element = wrapper.getByText('Canceled');
    const badgeElement = wrapper.getByTestId('badge');

    expect(element).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-rose-500');
  })

  it('should display Delivered text if status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)
    const element = wrapper.getByText('Delivered');
    const badgeElement = wrapper.getByTestId('badge');

    expect(element).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-emerald-500');
  })

  it('should display Delivering text if status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />);
    const element = wrapper.getByText('Delivering');
    const badgeElement = wrapper.getByTestId('badge');

    expect(element).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-amber-500');
  })
})