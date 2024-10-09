import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
    const [isOpen,setIsOpen]=useState(false);
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevQuantityT) => {
      const newQuantityType = [...prevQuantityT];
      newQuantityType[index][prop] = newValue;
      return newQuantityType;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button 
        onClick={()=>setIsOpen(prev=>!prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button">
            {isOpen &&(
                <Up/>
            )}
            {!isOpen &&(
                <Down/>
            )}
            <span>{name}</span>
            <span>({props?.length})</span>
        </button>
        <div className={isOpen ? 'block':'hidden'}>
      {props?.length > 0 &&
        props.map((quantityT, index) => (
          <div  className="flex items-end gap-2" key={index}>
            <input
              type="text"
              placeholder="Quantity Type"
              value={quantityT.name}
              onChange={(ev) => editProp(ev, index, "name")}
            />
            <input
              type="text"
              placeholder="Extra Price"
              value={quantityT.price}
              onChange={(ev) => editProp(ev, index, "price")}
              onClick={(ev) => ev.target.value = ""} 
            />
            <div>
              <button
                type="button"
                onClick={() => removeProp(index)}
                className="bg-white mb-2 px-2"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button className="bg-white items-center" type="button" onClick={addProp}>
        <Plus className="w-5 h-5" />
        <span>{addLabel}</span>
      </button>
    </div>
    </div>
  );
}
