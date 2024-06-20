"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className={"btn btn-error " + (isLoading && "loading loading-spinner")}
      onClick={async (_e) => {
        setIsLoading(true);
        console.log(id);

        const res = await fetch("/api/deck/delete", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        console.log(await res.json());
        setIsLoading(false);
        router.refresh();
      }}
    >
      <Trash />
    </button>
  );
}
