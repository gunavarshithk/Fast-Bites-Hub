"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "../../components/useProfile";
import CartProduct from "../../components/menu/CartProduct";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev){
    ev.preventDefault();
    const promise=new Promise((resolve,reject)=>{
      fetch('/api/checkout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          address,
          cartProducts
        }),
      }).then(async response=>{
        if(response.ok){
          resolve();
          window.location=await response.json();
        }else{
          reject();
        }
      });
      
    }
  )
  await toast.promise(promise, {
    loading: 'Preparing your order...',
    success: 'Redirecting to payment...',
    error: 'Something went wrong... Please try again later',
  })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 gap-8 grid grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products In Your Shopping Cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
              key={index}
              index={index}
              product={product} onRemove={removeCartProduct}/>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
            SubTotal:<br/>
            Delivery:<br/>
            Total:<br/>
            </div>
            <span className="font-semibold pl-2 text-right">₹{subtotal}<br/>
            ₹50<br/>
            ₹{subtotal+50}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="mb-2">Checkout</h2>
          <label className="text-gray-900">Delivery Address</label>
          <form className="mt-2" onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ₹{subtotal+50}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
