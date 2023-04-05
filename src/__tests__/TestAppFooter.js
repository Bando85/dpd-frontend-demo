import { render, screen } from '@testing-library/react'
import AppFooter from '../AppFooter';

test("AppNavbar renders successfully", () => {
    render(<AppFooter/>);
    const element = screen.getByText(/created/i);
    expect(element).toBeInTheDocument();
})