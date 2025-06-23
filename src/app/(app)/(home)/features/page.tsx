import { ICONFILTER } from "@/constant";
import Image from "next/image";

const features = [
  {
    title: "Multi-Tenant Stores",
    description:
      "Each farmer gets a dedicated store page, making it easy to manage products and reach more customers.",
    icon: "/store-open.svg",
  },
  {
    title: "Secure Payments",
    description:
      "Integrated payment solutions ensure fast, safe, and reliable transactions for both buyers and sellers.",
    icon: "/secure-payment.svg",
  },
  {
    title: "Product Reviews",
    description:
      "Customers can leave reviews, helping farmers build trust and improve their offerings.",
    icon: "/comments.svg",
  },
  {
    title: "Order Management",
    description:
      "Track, manage, and fulfill orders with ease using our intuitive dashboard.",
    icon: "/online-delivery.svg",
  },
  {
    title: "Community Support",
    description:
      "Access resources, tips, and a network of fellow farmers to help your business grow.",
    icon: "/community-manager.svg",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] py-16 px-4 lg:px-0 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black">
          Platform Features
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover the tools and features that make FarmersHub the best platform
          for modern farmers and buyers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={48}
              height={48}
              className="mb-4"
              style={{ filter: ICONFILTER }}
            />
            <h2 className="text-2xl font-semibold mb-2 text-black">
              {feature.title}
            </h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
