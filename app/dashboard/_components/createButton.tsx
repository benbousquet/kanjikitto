"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className={"btn btn-primary " + (isLoading && "loading loading-spinner")}
      onClick={async (_e) => {
        setIsLoading(true);
        const res = await fetch("/api/deck/create", { method: "POST" });
        const { deck } = await res.json();
        router.push(`/deck/edit/${deck.id}`);
      }}
    >
      Create
    </button>
  );
}
