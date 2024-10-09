import toast from "react-hot-toast";
import { CartContext } from "../AppContext";
import FlyingButton from "react-flying-item";
import { useContext, useState } from "react";
import MenuItemTile from "../menu/MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
  const {
    image,
    name,
    description,
    price,
    quantityType,
    extraIngredientPrices,
  } = menuItem;
  const [selectedQuantityType, setSelectedQuantityType] = useState(quantityType?.[0]||null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    console.log("add to cart");
    const hasOptions =
      quantityType.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedQuantityType, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopUp(false);
    toast.success("Added to cart");
  }
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = price;
  if (selectedQuantityType) {
    selectedPrice += selectedQuantityType.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {quantityType?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">
                    Pick your Quantity Type
                  </h3>
                  {quantityType.map((quantityTypes) => (
                    <label
                      key={quantityTypes._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedQuantityType(quantityTypes)}
                        checked={
                          selectedQuantityType?.name === quantityTypes.name
                        }
                        name="quantityType"
                      />
                      {quantityTypes.name} ₹{price + quantityTypes.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +₹{extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                <div
                  className="primary sticky bottom-2"
                  onClick={handleAddToCartButtonClick}
                >
                  Add to cart ₹{selectedPrice}
                </div>
              </FlyingButton>
              <button className="mt-2" onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
