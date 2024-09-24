import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material', 
      '@mui/system',
      '@mui/icons-material',
      'hoist-non-react-statics',
      'shallowequal'
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Incluir módulos CommonJS en node_modules
    },
  },
});
