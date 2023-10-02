import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Container from './components/Container';
import SearchList from './pages/SearchList';

export default function App(props) {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route path="/" element={<Container />}/>
            <Route path="/searchlist" element={<SearchList totalResultados={3500000} />}/>
          </Route>
        )
    );
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  );
}