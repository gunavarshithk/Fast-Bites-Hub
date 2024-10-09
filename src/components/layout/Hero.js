import Image from "next/image";
import Right from "../icons/Right";
export default function Hero() {
  return (
    <section className="hero mt-4" >
      <div className="py-16">
        <h1 className="text-4xl font-semibold">Savor Speed,<br></br>Taste<br></br> <span 
          className="text-primary">Instant Happiness
          </span></h1>
        <p className="my-6 text-gray-500 text-sm">
        Crunchy tacos, spicy salsa - a taste of Mexico, right at your fingertips.
        </p>
        {/* https://heroicons.com/ */}
        <div className="flex gap-4  text-sm">
          <button className="bg-primary flex justify-center items-center flex gap-2 uppercase text-white px-4 py-2 rounded-full">
            Order Now
            <Right/>
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">Learn More
          <Right/>
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/food_1.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
