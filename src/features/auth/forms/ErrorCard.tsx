import CardWrapper from "../components/CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to Sign in"
      center
    >
      <p className="text-center text-2xl mb-2 font-bold"></p>
      <p className="text-center opacity-50">Refresh the page and try again!</p>
    </CardWrapper>
  );
};
export default ErrorCard;
