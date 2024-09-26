import React from "react";

const Privacy = () => {
  return (
    <div className="mx-auto px-6 sm:px-12 py-20 sm:py-24 text-white">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="mb-6 text-red-200">Effective Date: 25th September</p>
      <p className="mb-6">
        Blank Canvas Design Co. (“Blank Canvas,” “we,” “us,” or “our”) respects
        your privacy and is committed to protecting the personal information you
        may provide through your use of the cr8r.ai website (the “Website”) and
        related services, software, content, and platforms (collectively, the
        “Services”). This Privacy Policy explains what information we collect,
        how we use and share that information, and your rights with respect to
        your personal information.
      </p>

      <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information when you use our
        Services:
      </p>

      <h3 className="text-xl font-semibold mb-2">
        a. Personal Information You Provide to Us
      </h3>
      <p className="mb-4">
        Since cr8r.ai does not require users to create accounts or log in, we
        typically do not collect personal information directly from users.
        However, you may provide us with personal information in the following
        instances:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>When you contact us directly via email or other means.</li>
        <li>When you submit feedback or participate in surveys.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">b. Usage Data</h3>
      <p className="mb-4">
        We automatically collect certain information about your interaction with
        the Services, including:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>IP address.</li>
        <li>Browser type and version.</li>
        <li>Device type and operating system.</li>
        <li>Pages you visit and the date and time of your visit.</li>
        <li>Referring and exit pages.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">
        c. Cookies and Similar Technologies
      </h3>
      <p className="mb-12">
        We use cookies and similar tracking technologies to collect information
        about your interactions with the Services. This helps us understand user
        behavior and improve the user experience. You can control the use of
        cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        We may use the information we collect for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-12">
        <li>To operate, maintain, and improve the Services.</li>
        <li>To understand and analyze user behavior and preferences.</li>
        <li>To respond to your comments, questions, and requests.</li>
        <li>
          To communicate with you regarding updates, promotions, or changes to
          the Services.
        </li>
        <li>
          To comply with legal obligations and enforce our Terms of Service.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information to third parties. We
        may share your information in the following circumstances:
      </p>

      <h3 className="text-xl font-semibold mb-2">a. Service Providers</h3>
      <p className="mb-4">
        We may share your information with third-party service providers who
        perform services on our behalf, such as hosting, data analysis, and
        customer support. These service providers are bound by confidentiality
        agreements and are prohibited from using your information for any
        purpose other than providing services to us.
      </p>

      <h3 className="text-xl font-semibold mb-2">b. Legal Requirements</h3>
      <p className="mb-4">
        We may disclose your information if required to do so by law or in
        response to valid requests by public authorities (e.g., a court or
        government agency).
      </p>

      <h3 className="text-xl font-semibold mb-2">c. Business Transfers</h3>
      <p className="mb-12">
        In the event of a merger, acquisition, or sale of all or a portion of
        our assets, your information may be transferred as part of that
        transaction.
      </p>

      <h2 className="text-2xl font-bold mb-4">4. Your Choices</h2>

      <h3 className="text-xl font-semibold mb-2">
        a. Cookies and Tracking Technologies
      </h3>
      <p className="mb-4">
        You can set your browser to refuse all or some cookies or to alert you
        when cookies are being sent. If you disable or refuse cookies, some
        parts of the Services may become inaccessible or not function properly.
      </p>

      <h3 className="text-xl font-semibold mb-2">b. Communications</h3>
      <p className="mb-12">
        If you receive any marketing communications from us, you may opt out at
        any time by following the instructions provided in those communications
        or by contacting us directly.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
      <p className="mb-12">
        We take reasonable measures to protect your information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the Internet or method of electronic storage is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        6. International Data Transfers
      </h2>
      <p className="mb-12">
        If you are accessing the Services from outside India, please be aware
        that your information may be transferred to, stored, and processed in
        India or other jurisdictions. By using the Services, you consent to the
        transfer of your information to India and other jurisdictions as
        necessary for the operation of the Services.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. Children’s Privacy</h2>
      <p className="mb-12">
        The Services are not intended for users under the age of 18. We do not
        knowingly collect personal information from children under 18. If we
        become aware that we have inadvertently received personal information
        from a user under the age of 18, we will delete such information from
        our records.
      </p>

      <h2 className="text-2xl font-bold mb-4">
        8. Changes to This Privacy Policy
      </h2>
      <p className="mb-12">
        We may update this Privacy Policy from time to time. If we make any
        material changes, we will post the new policy on this page and update
        the effective date. We encourage you to review this Privacy Policy
        periodically to stay informed about our information practices.
      </p>

      <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at:
      </p>
      <p>
        Email:{" "}
        <a
          href="mailto:admin@blankcanvasdesign.co"
          className="text-blue-500 hover:underline mb-16"
        >
          admin@blankcanvasdesign.co
        </a>
      </p>
    </div>
  );
};

export default Privacy;
