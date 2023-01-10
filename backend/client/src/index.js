import {createRoot} from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider} from "./Context/ProductContext";
import {ShoppingCartProvider} from "./Context/ShoppingCartContext";

const root = createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <ShoppingCartProvider>
              <App />
            </ShoppingCartProvider>
          </ProductProvider>
        </AuthProvider>
    </BrowserRouter>
)