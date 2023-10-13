import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider} from 'react-router-dom';
import Container from './components/Container';
import SearchList from './pages/SearchList';
import SearchListFinal from './pages/SearchListFinal';

export default function App() {

    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //       <Route>
    //         <Route path="/" element={<Container />}/>
    //         <Route path="/searchlist" element={<SearchList />}/>
    // <Route path="/searchlistFinal" element={<SearchListFinal />}/>
    //       </Route>
    //     )
    // );
  return (
    <div>
       {/* <RouterProvider router={router}/> */}
       <button className="bg-blue-500 hover:bg-blue-700 text-white text-[20px] font-bold py-4 px-12 rounded-3xl">
       <a className="text-white" href='/sign-in'>Sign In</a>
       </button>
 
    </div>
  );
}