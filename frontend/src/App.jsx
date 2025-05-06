import { Route, Routes } from "react-router"

import AuthPage from "./pages/authPage"
import MainLayout from "./layouts/mainLayout"
import AddadsPage from "./pages/addadsPage"
import PrivateRoute from "./components/privateRoute"
import MyAdsPage from "./pages/myAdsPage"
import AdsPage from "./pages/adsPage"
import AdsList from "./components/adsList"
import EditForm from "./components/editForm"



function App() {

  return (
    <>
      <Routes>
        <Route path="register" element={<AuthPage />} />
        <Route path="login" element={<AuthPage />} />

        <Route path="main" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="addAds" element={<AddadsPage />} />
          <Route path="myAds" element={<MyAdsPage />} />
          <Route path="ads" element={<AdsList />} />
          <Route path="ads/:id" element={<AdsPage />} />
          <Route path="ads/edit/:id" element={<EditForm />} />
        </Route>

        <Route path="*" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
