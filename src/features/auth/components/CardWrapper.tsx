import {
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import BackButton from "./BackButton";
import Heading from "./Heading";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonHref?: string;
  backButtonLabel?: string;
  showSocial?: boolean;
  hideChildren?: boolean;
  center?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  center,
  backButtonHref,
  backButtonLabel,
  hideChildren,
}: CardWrapperProps) => {
  return (
    <div className={"flex-col"}>
      <CardHeader className="px-0">
        <Heading center={center} label={headerLabel} />
      </CardHeader>
      {!hideChildren && (
        <CardContent className="flex-1 h-full px-0">{children}</CardContent>
      )}
      {!hideChildren && backButtonHref && backButtonLabel && (
        <CardFooter className="px-0">
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      )}
    </div>
  );
};
export default CardWrapper;
