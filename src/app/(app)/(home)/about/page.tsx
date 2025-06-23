import Image from "next/image";

const aboutFeatures = [
  {
    title: "Empowering Farmers",
    description:
      "FarmersHub connects local farmers to a wider market, providing tools and resources to grow their business and reach new customers.",
    icon: "/empower-empowerment.svg",
  },
  {
    title: "Seamless Transactions",
    description:
      "Our platform ensures secure and easy payments, making buying and selling agricultural products hassle-free.",
    icon: "/transaction.svg",
  },
  {
    title: "Community Support",
    description:
      "Join a thriving community of over 1000 farmers, share knowledge, and access exclusive resources to boost your productivity.",
    icon: "/community-manager.svg",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] py-16 px-4 lg:px-0 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black">About FarmersHub</h1>
        <p className="text-lg text-gray-700 mb-6">
          FarmersHub is dedicated to empowering local farmers by providing a
          modern, easy-to-use platform for selling produce, managing orders, and
          connecting with buyers nationwide.
        </p>
        <Image
          src="/auth-bg.png"
          alt="FarmersHub"
          width={600}
          height={300}
          className="rounded-xl shadow-lg mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {aboutFeatures.map((feature) => (
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
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
              }}
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
