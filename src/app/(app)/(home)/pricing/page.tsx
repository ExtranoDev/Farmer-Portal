const plans = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for new farmers getting started.",
    features: [
      "1 Storefront",
      "Unlimited Products",
      "Basic Support",
      "Community Access",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: 4999,
    description: "For growing farms and serious sellers.",
    features: [
      "Up to 3 Storefronts",
      "Priority Support",
      "Product Reviews",
      "Advanced Analytics",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 14999,
    description: "For large farms and cooperatives.",
    features: [
      "Unlimited Storefronts",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Premium Support",
    ],
    highlight: false,
  },
];

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const Page = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] py-16 px-4 lg:px-0 flex flex-col items-center">
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black">Pricing</h1>
        <p className="text-lg text-gray-700 mb-6">
          Simple, transparent pricing for every farmer. Choose the plan that
          fits your needs and grow your business with FarmersHub.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border-2 transition-all ${
              plan.highlight
                ? "border-pink-400 scale-105 z-10"
                : "border-transparent"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2 text-black">
              {plan.name}
            </h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="text-4xl font-bold mb-4 text-black">
              {plan.price === 0 ? "Free" : formatNaira(plan.price) + "/mo"}
            </div>
            <ul className="mb-6 text-gray-700 text-left w-full max-w-xs mx-auto">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center mb-2">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                plan.highlight
                  ? "bg-pink-400 text-black hover:bg-black hover:text-white"
                  : "bg-black text-white hover:bg-pink-400 hover:text-black"
              }`}
            >
              {plan.price === 0 ? "Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
