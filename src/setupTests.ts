import '@testing-library/jest-dom';
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
window.ResizeObserver = ResizeObserver;

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;