import { render, screen } from '@testing-library/react'
import Welcome from '../Welcome';

test("Welcome renders successfully", () => {
    render(<Welcome/>);
    const element = screen.getByText(/Welcome/i);
    expect(element).toBeInTheDocument();
})