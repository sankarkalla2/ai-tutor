"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const UpgradeCard = () => {
  return (
    <div className="bg-accent rounded-2xl py-6 px-4 border w-full max-w-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Upgrade to Pro</h2>
        <p className="text-sm">Go for unlimited access.</p>
      </div>

      <div className="flex flex-col gap-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Advanced analytics
          </li>
        </ul>
        <Button variant={'primary'} className="cursor-pointer" asChild>
          <Link href={"/pricing"}>
            <Sparkles />
            Upgrade
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UpgradeCard;
