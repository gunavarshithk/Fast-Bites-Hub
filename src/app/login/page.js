"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress,setLoginInProgress]=useState(false);
    const [error, setError] = useState(null);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        if (!email || !password) {
          setError("Please enter your email and password.");
          return;
        }
        setError(null); 
        setLoginInProgress(true);
        await signIn('credentials',{email,password,callbackUrl:'/'});
        setLoginInProgress(false);
    }
return (
    <section className="mt-8">
    <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
    <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
    type="email"
    placeholder="email"
    name="email"
        value={email}
        disabled={loginInProgress}    
        onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        {/* <div className="my-4 text-gray-500 text-center">
          Or Login with Provided
        </div>
        <button  className="flex gap-4 justify-center">
          <Image src="/google.png" alt={""} width={24} height={24} />
          Login with Google
        </button> */}

      </form>
    </section>
  );
}
