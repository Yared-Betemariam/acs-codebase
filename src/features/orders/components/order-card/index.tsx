import { Order } from "@/mongoose/models/order";

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  return <div>{JSON.stringify(order)}</div>;
};
export default OrderCard;
