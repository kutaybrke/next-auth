import '@testing-library/jest-dom'

jest.mock('lottie-react', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-lottie">Loading...</div>
})); 
