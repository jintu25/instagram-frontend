import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import ThemeProvider from './provider/ThemeProvider.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import { setSocket } from './redux/socketSlice.jsx'
import { setOnlineUsers } from './redux/chatSlice.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
