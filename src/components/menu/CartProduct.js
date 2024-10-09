import {cartProductPrice} from "../AppContext";
import Trash from "../icons/Trash";
import Image from "next/image";

export default function CartProduct({product,onRemove,index}) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image className="rounded-lg" width={240} height={240} src={product.image} alt={''} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.quantityTypes && (
          <div className="text-sm">
            Size: <span>{product.quantityTypes.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} ₹{extra.prices}</div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
      ₹{cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}