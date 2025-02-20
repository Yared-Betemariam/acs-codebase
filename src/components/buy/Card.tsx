import { CardInfo } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

type Props = {
  cardInfo: CardInfo;
};

const CardComponent = ({ cardInfo }: Props) => {
  return (
    <Card className="bg-[#7300FF]/5 flex flex-col gap-4 min-w-[18rem] max-w-[18rem] rounded-xl">
      <Image
        src={cardInfo.images[0]}
        alt="images"
        width={500}
        height={500}
        className="w-full"
      />
      <CardContent className="text-white">
        <div className="flex flex-col gap-4">
          <p className="flex flex-col">
            <span className="text-sm opacity-50">Genre</span>
            <span className="text-xl leading-[1]">{cardInfo.genre}</span>
          </p>
          <p className="flex flex-col">
            <span className="text-sm opacity-50">Price</span>
            <span className="text-xl leading-[1]">
              {cardInfo.price.toLocaleString()}birr
            </span>
          </p>
        </div>
        <Link href={`/buy/${cardInfo.id}`}>
          <Button variant={"outline"} className="bg-transparent w-full">
            Purchase
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
export default CardComponent;
