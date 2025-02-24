/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of services",
};

const page = () => {
  const { name, link, desc, mail } = {
    name: "Customail",
    link: "https://customail.com",
    desc: "Cusomail, is a software that lets you make personailed email that you can use for your startup",
    mail: "customail.contacts@gmail.com",
  };
  return (
    <div className=" text-base flex flex-col gap-4">
      <h3 className="text-3xl font-semibold">Terms of services</h3>

      <span className="text-base opacity-70">Last Updated: May 15, 2024</span>

      <p className="text-lg">Welcome to {name}!</p>

      <p>
        These Terms of Service ("Terms") govern your use of the {name} website
        at {link} ("Website") and the services provided by PoopUp. By using our
        Website and services, you agree to these Terms.
      </p>

      <h4>1. Description of {name}</h4>

      <p>{desc}</p>

      <h4>2. Ownership and Usage Rights</h4>

      <p>
        When you purchase a package from {name}, you gain the right to download
        and use the code provided for creating applications. You own the code
        you create but do not have the right to resell it. We offer a full
        refund within 7 days of purchase, as specified in our refund policy.
      </p>

      <h4>3. User Data and Privacy</h4>

      <p>
        We collect and store user data, including name, email, and payment
        information, as necessary to provide our services. For details on how we
        handle your data, please refer to our Privacy Policy at {link}/privacy.
      </p>

      <h4>4. Non-Personal Data Collection</h4>

      <p>
        We use web cookies to collect non-personal data for the purpose of
        improving our services and user experience.
      </p>

      <h4>5. Governing Law</h4>

      <p>These Terms are governed by the laws of France.</p>

      <h4>6. Updates to the Terms</h4>

      <p>
        We may update these Terms from time to time. Users will be notified of
        any changes via email.
      </p>

      <p>
        For any questions or concerns regarding these Terms of Service, please
        contact us at {mail}.
      </p>

      <h4 className="text-lg opacity-80">Thank you for using PoopUp!</h4>
    </div>
  );
};
export default page;
