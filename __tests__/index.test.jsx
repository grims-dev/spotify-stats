import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { authed: false },
  }),
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Spotify Stats',
    });

    expect(heading).toBeInTheDocument();
  })
})