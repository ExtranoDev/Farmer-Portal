import { Button, Link } from "@payloadcms/ui";
import { HomeIcon } from "lucide-react";

export const StripeVerify = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/stripe-verify">
        <Button>Verify account</Button>
      </Link>
      <Link href="/">
        <HomeIcon size={4} />
      </Link>
    </div>
  );
};
