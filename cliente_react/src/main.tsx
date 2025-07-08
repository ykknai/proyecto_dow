import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Se cargaran las vistas que se llaman en router */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
