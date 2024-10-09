import EditableImage from "../../components/layout/EditableImage";
import { useState, useEffect } from "react";
import { useProfile } from "../../components/useProfile";
import AddressInputs from "../../components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState(false);
  const { data: loggedInUserData } = useProfile();

  // Update state when `user` is available
  useEffect(() => {
    if (user) {
      setUserName(user?.name || "");
      setImage(user?.image || "");
      setPhone(user?.phone || "");
      setStreetAddress(user?.streetAddress || "");
      setPostalCode(user?.postalCode || "");
      setCity(user?.city || "");
      setCountry(user?.country || "");
      setAdmin(user?.admin || false);
    }
  }, [user]);

  function handleAddressChange(propName, value) {
    switch (propName) {
      case 'phone':
        setPhone(value);
        break;
      case 'streetAddress':
        setStreetAddress(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <label>
          First and last name
        </label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        {user && (
          <>
            <label>Email</label>
            <input
              type="email"
              disabled={true}
              value={user?.email || ''}
              placeholder="email"
            />
          </>
        )}
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb"
                type="checkbox"
                value={'1'}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
