"use client";

import Link from "next/link";

export default function ReturnPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Return Eligibility
              </h2>
              <p className="text-gray-600 mb-4">
                We accept returns within 30 days of the original purchase date.
                To be eligible for a return:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  Item must be unused, unworn, and in its original condition
                </li>
                <li>
                  Item must be in the original packaging with all tags attached
                </li>
                <li>Proof of purchase or order number is required</li>
              </ul>
              <p className="text-gray-600">
                Certain items cannot be returned for hygiene or safety reasons
                (e.g., earrings, swimwear, personalized items). These will be
                clearly marked on the product page.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. How to Initiate a Return
              </h2>
              <p className="text-gray-600 mb-4">
                To start a return, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-2">
                <li>Log in to your account on our website</li>
                <li>
                  Go to &quot;Order History&quot; and select the order containing the item
                  you wish to return
                </li>
                <li>Click &quot;Request Return&quot; and follow the instructions</li>
                <li>
                  You&#39;ll receive a return authorization and shipping label via
                  email
                </li>
              </ol>
              <p className="text-gray-600">
                If you checked out as a guest, please contact our customer
                service at returns@sarah.com with your order number.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Return Shipping
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border-b text-left">
                        Return Reason
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Shipping Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b">
                        Change of mind / No longer needed
                      </td>
                      <td className="py-3 px-4 border-b">
                        Customer pays return shipping
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">
                        Wrong item received
                      </td>
                      <td className="py-3 px-4 border-b">
                        Free return shipping (prepaid label provided)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">
                        Defective or damaged item
                      </td>
                      <td className="py-3 px-4 border-b">
                        Free return shipping (prepaid label provided)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 text-sm">
                *We recommend using a trackable shipping service as we cannot be
                responsible for lost return packages.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Refund Process
              </h2>
              <p className="text-gray-600 mb-4">
                Once we receive your return, our team will inspect the item(s)
                and process your refund within 5-7 business days. Refunds will
                be issued to the original payment method.
              </p>
              <p className="text-gray-600 mb-4">Please note:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  Shipping costs are non-refundable unless the return is due to
                  our error
                </li>
                <li>
                  Refund processing times vary by payment provider (typically
                  3-10 business days)
                </li>
                <li>Sale items are only eligible for store credit</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Exchanges
              </h2>
              <p className="text-gray-600 mb-4">
                We currently offer exchanges for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Size exchanges (subject to availability)</li>
                <li>Color exchanges (subject to availability)</li>
              </ul>
              <p className="text-gray-600">
                To request an exchange, please follow the same process as
                initiating a return and indicate that you&#39;d like an exchange. If
                the item you want is not available, we&#39;ll issue a refund
                instead.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Damaged or Defective Items
              </h2>
              <p className="text-gray-600 mb-4">
                If you receive a damaged or defective item, please contact us
                within 7 days of delivery at returns@sarah.com with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Your order number</li>
                <li>Photos of the damaged/defective item</li>
                <li>Photos of the packaging (if applicable)</li>
              </ul>
              <p className="text-gray-600">
                We&#39;ll arrange for a free return and send you a replacement if
                available, or issue a full refund.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. International Returns
              </h2>
              <p className="text-gray-600 mb-4">
                International customers are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Return shipping costs</li>
                <li>Any customs fees or import duties for returned items</li>
                <li>
                  Ensuring the package is properly marked as a return to avoid
                  additional customs charges
                </li>
              </ul>
              <p className="text-gray-600">
                Refunds for international returns will not include original
                shipping costs or any customs fees paid.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Store Credit
              </h2>
              <p className="text-gray-600 mb-4">
                In some cases, we may offer store credit instead of a refund:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>For returns outside the 30-day window</li>
                <li>For items returned without original packaging or tags</li>
                <li>For sale or clearance items</li>
              </ul>
              <p className="text-gray-600">
                Store credit never expires and can be used for future purchases
                on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-600 mb-2">
                For any questions about our return policy:
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> returns@sarah.com
                <br />
                <strong>Phone:</strong> (123) 456-7890 (select option 2 for
                returns)
                <br />
                <strong>Hours:</strong> Monday-Friday, 9AM-5PM EST
              </p>
              <p className="text-gray-600 mt-4">
                For shipping-related questions, please see our{" "}
                <Link
                  href="/shipping-policy"
                  className="text-blue-600 hover:underline"
                >
                  Shipping Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
