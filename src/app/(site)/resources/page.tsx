import { redirect } from "next/navigation";

/** Resource hub was folded into Programs; old links still work. */
export default function ResourcesPage() {
  redirect("/programs#how-mkf-cares");
}
