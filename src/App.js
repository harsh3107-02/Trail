import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Favourite from './components/Favourite/Favourite';
import Error from './components/Error/Error';
import { createBrowserRouter ,Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  );
}
export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/Favourite",
        element: <Favourite />,
      }
    ],
  },
]);

export default App;
