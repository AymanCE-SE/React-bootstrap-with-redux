import { createRoot } from 'react-dom/client'
import { MainLayout } from './layout/MainLayout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Provider } from 'react-redux'
import { myStore } from './redux'

createRoot(document.getElementById('root')).render(
  <>
  <Provider store={myStore}>
<MainLayout></MainLayout>  
  </Provider>
  </>

)
