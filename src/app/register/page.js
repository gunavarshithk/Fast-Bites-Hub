"use client";
import {signIn} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error,setError]=useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    if (!isEmailValid(email) || password.length < 6) {
      setError(true);
      return;
    }
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response=await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated &&
      (<div className="my-4 text-center">
        User Created<br></br> Now You Can {' '} <Link className="underline" href={'/login'}>Login &raquo;</Link>
      </div>)}
      {error && (
        <div className="my-4 text-center">
        An Error has occured <br></br> Please Try again later
      </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        {/* <div className="my-4 text-gray-500 text-center">
          Or Login with Provided
        </div>
        <button className="flex gap-4 justify-center">
          <Image src="/google.png" alt={""} width={24} height={24} />
          Login with Google
        </button> */}
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing Account ?{' '}<Link className="underline " href={'/login'}>Login Here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}
