import { useParams } from "next/navigation";

export const useProductId = () => {
  const params = useParams();
  console.log(params);
  // const params = useParams<{ slug: string }>();
  return { id: params.slug };
};
