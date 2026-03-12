import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/home.jsx'
import Contact from './components/contact.jsx'
import Carousel from './Pages/cardCarousel.jsx'
import { HeroSection } from './Pages/index.js'
import { BookForm } from './Pages/index.js'
import ScrollAnimation from './Pages/scrollAnimation.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
       { path: "connects", element: < ScrollAnimation/> },
      { path: "contact", element: <BookForm 
      //  Header={Header}
        
        /> },
      { path: "bikes", element:<Carousel/> },
      // { path: "service", element: <StackedCards /> },
      //       { path: "thank-you", element: <ThankYou/> }


    ]
  }
]);



 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <RouterProvider router={router} />
    
  </StrictMode>,
)


