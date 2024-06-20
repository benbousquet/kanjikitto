"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className="btn btn-success"
      disabled={isLoading}
      onClick={async (_e) => {
        setIsLoading(true);
        const res = await fetch("/api/deck/create", { method: "POST" });
        const { deck } = await res.json();
        router.push(`/deck/edit/${deck.id}`);
      }}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : "Create"}
    </button>
  );
}
