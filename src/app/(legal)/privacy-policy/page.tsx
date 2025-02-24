/* eslint-disable react/no-unescaped-entities */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
};
const page = () => {
  const { name, link, mail } = {
    name: "Customail",
    link: "https://customail.com",
    mail: "customail.contacts@gmail.com",
  };
  return (
    <div className=" text-base flex flex-col gap-4">
      <h3 className="text-3xl font-semibold">Privacy Policy</h3>

      <span className="text-base opacity-70">Last Updated: May 15, 2024</span>

      <p className="text-lg">Welcome to {name}!</p>

      <p>
        Thank you for visiting {name} ("we," "us," or "our"). This Privacy
        Policy outlines how we collect, use, and protect your personal and
        non-personal information when you use our website located at {link} (the
        "Website").
      </p>

      <p>
        By accessing or using the Website, you agree to the terms of this
        Privacy Policy. If you do not agree with the practices described in this
        policy, please do not use the Website.
      </p>

      <h4>1. Information We Collect</h4>

      <h4>1.1. Personal Data</h4>

      <p>We collect the following personal information from you:</p>
      <p>
        Name: We collect your name to personalize your experience and
        communicate with you effectively. Email: We collect your email address
        to send you important information regarding your orders, updates, and
        communication. Payment Information: We collect payment details to
        process your orders securely. However, we do not store your payment
        information on our servers. Payments are processed by trusted
        third-party payment processors.
      </p>

      <h4>1.2. Non-Personal Data</h4>

      <p>
        We may use web cookies and similar technologies to collect non-personal
        information such as your IP address, browser type, device information,
        and browsing patterns. This information helps us to enhance your
        browsing experience, analyze trends, and improve our services.
      </p>

      <h4>2. Purpose of Data Collection</h4>

      <p>
        We collect and use your personal data for the sole purpose of order
        processing. This includes processing your orders, sending order
        confirmations, providing customer support, and keeping you updated about
        the status of your orders.
      </p>

      <h4>3. Data Sharing</h4>

      <p>
        We do not share your personal data with any third parties except as
        required for order processing (e.g., sharing your information with
        payment processors). We do not sell, trade, or rent your personal
        information to others.
      </p>

      <h4>4. Children's Privacy</h4>

      <p>
        PoopUp is not intended for children under the age of 13. We do not
        knowingly collect personal information from children. If you are a
        parent or guardian and believe that your child has provided us with
        personal information, please contact us at the email address provided
        below.
      </p>

      <h4>5. Updates to the Privacy Policy</h4>

      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        Any updates will be posted on this page, and we may notify you via email
        about significant changes.
      </p>
      <h4>6. Contact Information</h4>

      <p>
        If you have any questions, concerns, or requests related to this Privacy
        Policy, you can contact us at:
      </p>

      <p>Email: {mail}</p>
      <p>
        For all other inquiries, please visit our Contact Us page on the
        Website.
      </p>

      <h4 className="text-lg opacity-80">
        By using PoopUp, you consent to the terms of this Privacy Policy.
      </h4>
    </div>
  );
};
export default page;
