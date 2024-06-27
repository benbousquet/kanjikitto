import { X } from "lucide-react"
import { ZodIssue } from "zod";

export default function FormError({ error }: { error: ZodIssue }) {
  return (
    <div role="alert" className="alert alert-error flex my-2">
      <X />
      <span>{error.message}</span>
    </div>
  );
}
