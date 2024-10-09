import EditableImage from "../layout/EditableImage";
import MenuItemPriceProps from "../layout/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [quantityType, setQuantityType] = useState(
    menuItem?.quantityType || []
  );
  const [extraIngredientPrices, setExtraIngredientsPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [category,setCategory]=useState( menuItem?.category ||[]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);
  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          price,
          quantityType,
          extraIngredientPrices,
          category,
        })
      }
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev=>setCategory(ev.target.value)}>
          <option value="none">Select Category</option>
            {categories?.length > 0 &&
              categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Quantity Type"}
            addLabel={"Add Quantity Type"}
            props={quantityType}
            setProps={setQuantityType}
          />
          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add Ingredient Prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientsPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
