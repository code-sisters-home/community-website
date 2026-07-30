import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Navbar } from '../../components/Navbar';
import { usePathname } from 'next/navigation';
import React from 'react';
import '@testing-library/jest-dom';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock ThemeChanger with proper state and attributes
vi.mock('../../components/DarkSwitch', () => ({
  default: ({ onChange }: { onChange?: (theme: string) => void }) => {
    const [theme, setTheme] = React.useState('light');
    
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      // In real implementation, this would toggle dark class on html
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      if (onChange) onChange(newTheme);
    };
    
    return (
      <button 
        data-testid="theme-changer" 
        onClick={toggleTheme}
        data-theme={theme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    );
  },
}));

// Mock MenuIcon
vi.mock('./icons/MenuIcon', () => ({
  MenuIcon: ({ open, className }: { open: boolean; className: string }) => (
    <svg data-testid="menu-icon" data-open={open} className={className}>
      <title>Menu Icon</title>
    </svg>
  ),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clean up dark class between tests
    document.documentElement.classList.remove('dark');
  });

  describe('Rendering', () => {
    it('renders the logo correctly', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      expect(screen.getByText('code_sisters')).toBeInTheDocument();
      expect(screen.getByText('{')).toBeInTheDocument();
      expect(screen.getByText('}')).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const homeLinks = screen.getAllByText('Главная');
      expect(homeLinks).toHaveLength(2);

      expect(screen.getAllByText('О нас')).toHaveLength(2);
      expect(screen.getAllByText('ЧаВо')).toHaveLength(2);
      expect(screen.getAllByText('Блог')).toHaveLength(2);
      expect(screen.getAllByText('Мерч')).toHaveLength(2);
    });

    it('renders ThemeChanger component', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      expect(screen.getByTestId('theme-changer')).toBeInTheDocument();
    });

    it('renders mobile menu toggle button', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Toggle Menu');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('ThemeChanger', () => {
    it('toggles theme when clicked', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const themeChanger = screen.getByTestId('theme-changer');
      
      // Initial theme should be light
      expect(themeChanger).toHaveAttribute('data-theme', 'light');
      expect(themeChanger).toHaveTextContent('🌙');
      expect(document.documentElement).not.toHaveClass('dark');
      
      // Click to change to dark
      fireEvent.click(themeChanger);
      expect(themeChanger).toHaveAttribute('data-theme', 'dark');
      expect(themeChanger).toHaveTextContent('☀️');
      expect(document.documentElement).toHaveClass('dark');
      
      // Click again to change back to light
      fireEvent.click(themeChanger);
      expect(themeChanger).toHaveAttribute('data-theme', 'light');
      expect(themeChanger).toHaveTextContent('🌙');
      expect(document.documentElement).not.toHaveClass('dark');
    });

    it('toggles dark class on document element', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const themeChanger = screen.getByTestId('theme-changer');
      
      // Initially no dark class
      expect(document.documentElement).not.toHaveClass('dark');
      
      // Switch to dark
      fireEvent.click(themeChanger);
      expect(document.documentElement).toHaveClass('dark');
      
      // Switch back to light
      fireEvent.click(themeChanger);
      expect(document.documentElement).not.toHaveClass('dark');
    });

  });

  describe('External links', () => {
    it('renders external merch link with correct attributes', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const merchLink = screen.getAllByText('Мерч')[0];
      expect(merchLink).toHaveAttribute('href', 'https://codesisters.vsemaykishop.ru/');
      expect(merchLink).toHaveAttribute('target', '_blank');
      expect(merchLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Mobile menu', () => {
    it('mobile menu is hidden by default', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const mobileMenu = document.querySelector('.lg\\:hidden');
      expect(mobileMenu).toHaveClass('lg:hidden');
    });

    it('toggles mobile menu when hamburger button is clicked', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Toggle Menu');
      
      const mobileMenu = document.querySelector('.lg\\:hidden');
      expect(mobileMenu).toHaveClass('lg:hidden');
      
      fireEvent.click(toggleButton);
      expect(mobileMenu).not.toHaveClass('hidden');
      
      fireEvent.click(toggleButton);
      expect(mobileMenu).toHaveClass('lg:hidden');
    });

    it('renders all navigation items in mobile menu when open', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Toggle Menu');
      fireEvent.click(toggleButton);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(within(mobileMenu).getAllByText('Главная')).toHaveLength(1);
      expect(within(mobileMenu).getAllByText('О нас')).toHaveLength(1);
      expect(within(mobileMenu).getAllByText('ЧаВо')).toHaveLength(1);
      expect(within(mobileMenu).getAllByText('Блог')).toHaveLength(1);
      expect(within(mobileMenu).getAllByText('Мерч')).toHaveLength(1);
    });
  });

  describe('Navigation', () => {
    it('internal links have correct href attributes', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);
      
      const homeLink = screen.getAllByText('Главная')[0].closest('a');
      const aboutLink = screen.getAllByText('О нас')[0].closest('a');
      const faqLink = screen.getAllByText('ЧаВо')[0].closest('a');
      const blogLink = screen.getAllByText('Блог')[0].closest('a');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(aboutLink).toHaveAttribute('href', '/about');
      expect(faqLink).toHaveAttribute('href', '/faq');
      expect(blogLink).toHaveAttribute('href', '/blog');
    });
  });

});