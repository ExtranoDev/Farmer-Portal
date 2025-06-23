import { ICONFILTER } from "@/constant";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] py-16 px-4 lg:px-0 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-6">
          Have questions, feedback, or need support? Reach out to the FarmersHub
          team and we’ll get back to you as soon as possible.
        </p>
        <Image
          src="/farmer-icon.svg"
          alt="Contact FarmersHub"
          width={80}
          height={80}
          className="mx-auto mb-4"
          style={{ filter: ICONFILTER }}
        />
      </div>
      <form className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg flex flex-col gap-6">
        <div>
          <label className="block text-left text-base font-medium mb-2 text-black">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block text-left text-base font-medium mb-2 text-black">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            placeholder="you@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-left text-base font-medium mb-2 text-black">
            Message
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary min-h-[120px]"
            placeholder="How can we help you?"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white rounded-lg py-3 text-lg font-semibold hover:bg-pink-400 hover:text-black transition-colors"
        >
          Send Message
        </button>
      </form>
      <div className="mt-10 text-center text-gray-600">
        Or email us directly at{" "}
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@farmershub.com"}`}
          className="text-primary underline"
        >
          {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@farmershub.com"}
        </a>
      </div>
    </div>
  );
};

export default Page;
