import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ScreenProvider } from "./contexts/ScreenContext";
import { SidebarProvider } from "./contexts/SidebarContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ErrorFallback from "./components/ErrorFallback";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthProvider>
          <CitiesProvider>
            <ScreenProvider>
              <SidebarProvider>
                <BrowserRouter>
                  <Routes>
                    <Route index element={<Homepage />} />
                    <Route path='product' element={<Product />} />
                    <Route path='pricing' element={<Pricing />} />
                    <Route path='login' element={<Login />} />
                    <Route
                      path='app'
                      element={
                        <ProtectedRoute>
                          <AppLayout />
                        </ProtectedRoute>
                      }>
                      <Route index element={<Navigate replace to='cities' />} />
                      <Route path='cities' element={<CityList />} />
                      <Route path='cities/:id' element={<City />} />
                      <Route path='countries' element={<CountryList />} />
                      <Route path='form' element={<Form />} />
                    </Route>
                    <Route path='*' element={<PageNotFound />} />
                  </Routes>
                </BrowserRouter>
              </SidebarProvider>
            </ScreenProvider>
          </CitiesProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
