import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
import { ThemeProvider } from "./context/theme-provider"
import WeatherDashboard from "./pages/WeatherDashboard"
import CityPage from "./pages/CityPage"
import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App