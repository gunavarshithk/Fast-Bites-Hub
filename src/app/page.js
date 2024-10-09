import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <> 
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about" >
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p className="mt-4">
            At Fast Bites Hub, we are passionate about making food ordering fast,
            easy, and enjoyable for everyone. Our platform was founded with the
            vision of revolutionizing the way people order their favorite meals
            online, providing a seamless experience that satisfies cravings and
            simplifies the process of getting delicious food delivered right to
            your doorstep.
          </p>
          <p>
            Our team at Fast Bites Hub is comprised of dedicated individuals who
            are committed to delivering excellence in every aspect of our
            service. From our experienced developers who work tirelessly to
            ensure a smooth and user-friendly ordering interface, to our
            customer support team who is always ready to assist with any
            inquiries or concerns, we are united in our mission to provide the
            best possible experience for our customers.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact" >
        <SectionHeaders
          subHeader={"Don't Hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+91 15163646585">
            +91 15163646585
          </a>
        </div>
      </section>
    </>
  );
}
