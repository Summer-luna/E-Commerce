import {createRoot} from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Routes/Authentication/AuthContext";
import { ProductProvider} from "./Routes/Shop/ProductContext";

const root = createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
        <ProductProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
        </ProductProvider>
    </BrowserRouter>
)