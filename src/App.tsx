import './App.css'
import Header from "./components/Header.tsx";
import SideBar from "./features/sales/SideBar.tsx";
import Table from "./features/sales/Table.tsx";
import {
  setProduct
} from "./features/sales/salesSlice.ts";
import {
  useAppDispatch
} from "./store/hooks.ts";

import data from './data/stackline_frontend_assessment_data_2021.json'

import {useEffect} from "react";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setProduct(data[0]))
  }, [])

  return (
    <>
      <div className='h-screen  '>
        <Header/>
        <div className='flex flex-row bg-lightgray h-full pt-10'>

          <SideBar />

          <div className='m-4 pl-10 bg-white'>
            <Table/>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
