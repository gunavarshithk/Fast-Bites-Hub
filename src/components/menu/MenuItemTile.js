import AddToCartButton from "../../components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart, ...item}) {
  const {image, description, name, price,
    quantityType, extraIngredientPrices,
  } = item;
  const hasQunatityTypeOrExtras = quantityType?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        {/* <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="food-tem-name"/>
         */}
         <div className="max-w-full mx-auto" style={{ width: '200px', height: '120px' }}>
          <img
            src={image}
            className="object-cover w-full h-full rounded-xl"
            alt="food-item-name"
          />
        </div>
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        {description}
      </p>
      <AddToCartButton
        image={image}
        hasQunatityTypeOrExtras={hasQunatityTypeOrExtras}
        onClick={onAddToCart}
        price={price}
      />
    </div>
  );
}