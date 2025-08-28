import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Manual chunking for better performance
        manualChunks: {
          // React core libraries
          vendor: ['react', 'react-dom'],
          
          // Firebase chunk
          firebase: ['firebase/app', 'firebase/firestore'],
          
          // UI libraries
          ui: ['lucide-react'],
          
          // Add other large libraries you might be using
          // three: ['three'], // Uncomment if using Three.js
          // charts: ['recharts'], // Uncomment if using charts
        },
        
        // Better file naming for chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? 
            chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') || 'chunk'
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        }
      }
    },
    
    // Enable minification (using esbuild - default, no extra dependency needed)
    minify: 'esbuild',
    
    // Disable source maps in production for smaller bundles
    sourcemap: false
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'firebase/app', 
      'firebase/firestore',
      'lucide-react'
    ]
  }
});