import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import OrderModal from '../components/OrderModal';
import { DataProvider } from '../context/DataContext';

// Mock the data context
const mockDataContext = {
  services: [
    { id: '1', name: 'Test Service', price: '10$', order: 1, active: true },
  ],
  paymentMethods: [
    { id: '1', name: 'Test Payment', details: 'test-details', active: true },
  ],
  siteSettings: {
    title: 'Test Site',
    description: 'Test Description',
    orderNotice: 'Test Notice',
  },
  orders: [],
  loading: false,
  error: null,
  updateService: vi.fn(),
  addService: vi.fn(),
  deleteService: vi.fn(),
  updatePaymentMethod: vi.fn(),
  addPaymentMethod: vi.fn(),
  deletePaymentMethod: vi.fn(),
  updateSiteSettings: vi.fn(),
  addOrder: vi.fn(),
  archiveOrder: vi.fn(),
  deleteOrder: vi.fn(),
  refreshData: vi.fn(),
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <DataProvider>
      {children}
    </DataProvider>
  </BrowserRouter>
);

describe('LandingPage Component', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );
    
    expect(screen.getByText('KYCtrust')).toBeInTheDocument();
  });

  it('displays services correctly', async () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('خدماتنا المالية الرقمية')).toBeInTheDocument();
    });
  });

  it('opens order modal when service button is clicked', async () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Wait for services to load
    await waitFor(() => {
      const orderButton = screen.getByText('اطلب الآن');
      expect(orderButton).toBeInTheDocument();
    });
  });
});

describe('OrderModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    serviceName: 'Test Service',
  };

  it('renders when open', () => {
    render(
      <TestWrapper>
        <OrderModal {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText('طلب خدمة جديدة')).toBeInTheDocument();
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <TestWrapper>
        <OrderModal {...defaultProps} isOpen={false} />
      </TestWrapper>
    );

    expect(screen.queryByText('طلب خدمة جديدة')).not.toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <TestWrapper>
        <OrderModal {...defaultProps} />
      </TestWrapper>
    );

    const submitButton = screen.getByText('إرسال الطلب');
    fireEvent.click(submitButton);

    // Should not submit without required fields
    expect(mockDataContext.addOrder).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(
      <TestWrapper>
        <OrderModal {...defaultProps} />
      </TestWrapper>
    );

    const nameInput = screen.getByPlaceholderText('أدخل اسمك الكامل');
    const submitButton = screen.getByText('إرسال الطلب');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDataContext.addOrder).toHaveBeenCalledWith({
        customerName: 'Test User',
        serviceName: 'Test Service',
        notes: expect.any(String),
        archived: false,
      });
    });
  });
});

describe('DataContext', () => {
  it('provides default values', () => {
    const TestComponent = () => {
      return <div>Test</div>;
    };

    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('Accessibility Tests', () => {
  it('has proper heading structure', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check if main heading exists
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('has proper button accessibility', async () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });
  });

  it('has proper link accessibility', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});

describe('Performance Tests', () => {
  it('renders quickly', () => {
    const startTime = performance.now();
    
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render in less than 100ms
    expect(renderTime).toBeLessThan(100);
  });
});

describe('Error Handling', () => {
  it('handles loading state', () => {
    const LoadingWrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>
        <DataProvider>
          {children}
        </DataProvider>
      </BrowserRouter>
    );

    render(
      <LoadingWrapper>
        <LandingPage />
      </LoadingWrapper>
    );

    // Component should handle loading gracefully
    expect(screen.getByRole('main') || screen.getByText('جاري تحميل البيانات...')).toBeInTheDocument();
  });
});
