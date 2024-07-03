import React from 'react';
import {useAppSelector} from "../../store/hooks.ts";
import {selectProduct} from "./salesSlice.ts";

const SideBar = () => {
  const product = useAppSelector(selectProduct)

  return (
    <div className={'w-72 bg-white'}>
      <div className={'p-4'}>
        <img src={product?.image} alt={`${product?.title}-image`}/>
        <h2 className={'text-center font-medium text-xl'}>{product?.title}</h2>
        <p className={'text-center text-sm text-gray-300'}>{product?.subtitle}</p>
      </div>
      <div className={'border-b-2 w-72 pt-2'}/>
      <div className={'flex flex-row flex-wrap p-4'}>
        {product?.tags.map(tag => (
          <div key={tag} className={'p-1 m-2 border-2 rounded-md'}>{tag}</div>
        ))}
      </div>
      <div className={'border-b-2 w-72 pt-2'}/>

    </div>
  );
};

export default SideBar;