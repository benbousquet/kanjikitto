"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className="btn btn-outline hover:bg-red-500 hover:text-white"
      disabled={isLoading}
      onClick={async (_e) => {
        setIsLoading(true);
        const res = await fetch("/api/deck/delete", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        setIsLoading(false);
        router.push("/dashboard")
        router.refresh()
      }}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : "Delete"}
    </button>
  );
}
