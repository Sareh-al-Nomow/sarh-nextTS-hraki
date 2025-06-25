"use client";

import Link from "next/link";

export default function ShippingPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Shipping Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Processing Time
              </h2>
              <p className="text-gray-600">
                All orders are processed within 1-3 business days (excluding
                weekends and holidays) after receiving your order confirmation
                email. You will receive another notification when your order has
                shipped.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Domestic Shipping Options & Rates
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border-b text-left">
                        Shipping Method
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Delivery Time
                      </th>
                      <th className="py-3 px-4 border-b text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b">Standard Shipping</td>
                      <td className="py-3 px-4 border-b">3-5 business days</td>
                      <td className="py-3 px-4 border-b">$5.99</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">Expedited Shipping</td>
                      <td className="py-3 px-4 border-b">2-3 business days</td>
                      <td className="py-3 px-4 border-b">$12.99</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">Free Shipping</td>
                      <td className="py-3 px-4 border-b">5-7 business days</td>
                      <td className="py-3 px-4 border-b">
                        Free on orders over $50
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 text-sm">
                *Delivery times are estimates and not guaranteed. Actual
                delivery time may vary.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. International Shipping
              </h2>
              <p className="text-gray-600 mb-4">
                We currently ship to the following countries: [List countries
                you ship to]. International delivery times vary by destination:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Canada: 7-14 business days</li>
                <li>Europe: 10-18 business days</li>
                <li>Australia/NZ: 12-20 business days</li>
                <li>Other countries: 14-21 business days</li>
              </ul>
              <p className="text-gray-600">
                International customers are responsible for any customs fees,
                import duties, or taxes that may apply. These charges are not
                included in the item price or shipping cost.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Order Tracking
              </h2>
              <p className="text-gray-600 mb-4">
                Once your order has shipped, you will receive an email with a
                tracking number and a link to track your package. You can also
                track your order by logging into your account on our website.
              </p>
              <p className="text-gray-600">
                If you&#39;re having trouble tracking your package or haven&#39;t
                received your tracking information within 5 business days,
                please contact us at support@sarah.com.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Shipping Restrictions
              </h2>
              <p className="text-gray-600 mb-4">
                We cannot ship to PO boxes or APO/FPO addresses. Some items may
                have additional shipping restrictions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Fragile items may require special handling</li>
                <li>Certain products cannot be shipped internationally</li>
                <li>Oversized items may incur additional shipping fees</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Delayed Orders
              </h2>
              <p className="text-gray-600 mb-4">
                While we make every effort to deliver your order on time, there
                may be circumstances beyond our control that could result in
                delays:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Severe weather conditions</li>
                <li>Carrier delays</li>
                <li>Customs hold for international orders</li>
                <li>Incorrect shipping address</li>
              </ul>
              <p className="text-gray-600">
                If your order is significantly delayed, we will notify you via
                email with updated delivery information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Incorrect Shipping Address
              </h2>
              <p className="text-gray-600">
                Please double-check your shipping address when placing your
                order. We are not responsible for orders shipped to incorrect
                addresses provided by the customer. If your package is returned
                to us due to an incorrect address, you will be responsible for
                the cost of reshipping the order.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Lost or Stolen Packages
              </h2>
              <p className="text-gray-600 mb-4">
                SARAH is not responsible for lost or stolen packages confirmed
                to be delivered by the carrier. If your tracking information
                shows your package was delivered but you can&#39;t find it:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Check with neighbors or your building manager</li>
                <li>Look around your property (porch, garage, etc.)</li>
                <li>Contact your local post office with the tracking number</li>
              </ul>
              <p className="text-gray-600">
                If you&#39;re unable to locate your package, please contact us
                within 14 days of the delivery date and we&#39;ll work with the
                carrier to investigate.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Returns & Exchanges
              </h2>
              <p className="text-gray-600">
                Please see our{" "}
                <Link
                  href="/infoPages/returnPolicy"
                  className="text-blue-600 hover:underline"
                >
                  Return Policy
                </Link>{" "}
                for information about returning or exchanging items. Customers
                are responsible for return shipping costs unless the return is
                due to our error.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-600 mb-2">
                If you have any questions about our shipping policy, please
                contact our customer service team:
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> shipping@sarah.com
                <br />
                <strong>Phone:</strong> (123) 456-7890
                <br />
                <strong>Hours:</strong> Monday-Friday, 9AM-5PM EST
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
