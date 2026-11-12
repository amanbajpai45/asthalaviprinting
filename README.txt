ASTHA & LAVI PRINTING PRESS — ONLINE BUSINESS SYSTEM
====================================================

WHAT IS INCLUDED
----------------
- Existing public website and pages retained.
- Cloud-ready Admin / Staff portal: portal.html (admin.html redirects here).
- Customer email/password registration and login using Firebase Authentication.
- Online order creation, order status tracking and quotation requests.
- Quotation management and quote records.
- Rate management (add/update/delete rates).
- Online gallery uploads to Firebase Storage; public gallery page reads uploaded images.
- Offers management; public Offers page reads published offers.
- Staff records and role-based access rules.
- Sales dashboard based on orders marked Paid.
- WhatsApp hand-off to the shop owner.
- UPI payment intent and manual UTR submission / owner verification.

IMPORTANT: THIS IS FIREBASE-READY, NOT LIVE UNTIL CONFIGURED
-----------------------------------------------------------
The Firebase Web App configuration has been added to firebase-config.js using the project details supplied by you. The website is connected to that project in its code, but cloud features will work only after you enable the required Firebase services and publish the security rules below. Do not publish the site until you have reviewed the rules.

1) CREATE FIREBASE PROJECT
   - Visit https://console.firebase.google.com/ and create a project.
   - Add a Web App and copy its Firebase config.
   - Your supplied project configuration is already saved in firebase-config.js. Confirm that the project ID is `asthalaviprinting`. The measurementId is included for Analytics; the current site does not require Analytics for orders, login, gallery or quotations.
   - Set ASTHA_BUSINESS.upiId to the shop's actual UPI ID. Keep it unchanged until the owner confirms the correct ID.

2) ENABLE AUTHENTICATION
   - Firebase Console > Authentication > Get started > Sign-in method.
   - Enable Email/Password.

3) ENABLE FIRESTORE DATABASE
   - Firebase Console > Firestore Database > Create database.
   - Open Rules / Rules editor and publish the contents of firestore.rules.

4) CREATE THE FIRST ADMIN ACCOUNT
   - Authentication > Users > Add user. Use the owner's admin email and a strong password.
   - Copy that account's UID.
   - Firestore > Data > Start collection `users` (if needed), document ID = the exact admin UID.
   - Add fields:
       email: (admin email, string)
       role: admin (string)
       name: Subhodh Bajpai (string)
   - This initial role assignment must be done by the project owner in Firebase Console.
   - Never make public sign-up grant admin privileges. Customer sign-up creates only a customer role.

5) ENABLE STORAGE FOR ONLINE GALLERY
   - Firebase Console > Storage > Get started.
   - Publish the contents of storage.rules in Storage > Rules.
   - Storage usage/billing requirements depend on Firebase's current plan and project settings; check the Console before uploading many photos.

6) ADD STAFF
   - Create each staff login in Authentication > Users (email/password).
   - In Firestore `users`, create a document whose ID is that staff member's Auth UID, with fields email, name and role = staff (or manager).
   - Then an admin/manager can maintain the staff directory in the portal.
   - Roles: admin (full access), manager (business management), staff (orders/gallery operational access), customer (own account/orders only).

7) HOST THE WEBSITE
   - Upload the complete folder contents to your HTTPS host (Firebase Hosting recommended; GitHub Pages can host the static pages too).
   - For Firebase Hosting, install Firebase CLI, run `firebase login`, `firebase init hosting`, choose this folder as public directory, then `firebase deploy`.
   - If using GitHub Pages, upload the full folder to the repository root and enable Pages. Firebase services still need the separate setup above.

HOW TO USE
----------
- Owner/Admin: open /portal.html and sign in with the admin account.
- Customer: open /portal.html, create a customer account, then submit orders or quotation requests.
- Orders: Admin/Staff can update status (Received, Designing, Printing, Ready, Delivered, Cancelled), amount and payment status.
- Quotes: customer requests appear in the Quotes collection; staff can prepare a quote in the portal.
- Rates: manage service prices in the Rate Management tab.
- Gallery: upload image files in Online Gallery; uploaded images are publicly visible on Gallery page.
- Offers: publish offers in Offers Management; public Offers page reads active offers.
- Sales: dashboard counts orders marked Paid; verify actual payment before marking Paid.
- Payments: currently UPI deep-link + customer-entered UTR + manual owner verification. It is NOT an automatic payment gateway. Never mark Paid based only on an unverified screenshot or customer-entered UTR.
- WhatsApp: order / quote requests open WhatsApp to the owner number already configured in firebase-config.js.

SECURITY / OPERATIONS NOTES
---------------------------
- Keep Firestore and Storage rules deployed. Never replace them with public read/write rules.
- Use strong passwords and do not share the admin login.
- Customer accounts cannot grant themselves admin roles.
- Use HTTPS hosting.
- The dashboard is a basic operational dashboard, not accounting/tax software.
- Online payment gateway integration (Razorpay/Cashfree etc.) needs the business's own merchant account, keys, webhook verification and a secure backend. Do not put secret keys in browser JavaScript.
- Before taking live orders, test customer signup, admin login, order creation, tracking, rate/offer edits, gallery upload and UPI flow using test accounts.

BUSINESS CONTACTS ALREADY IN WEBSITE
------------------------------------
Owner: Subhodh Bajpai — 7985803315
Work Assistance: Rajat Mishra — 8738893388
Designer: Monaj Kanojiya — 9696549118
Store Email: asthalavifdr@gmail.com
Website Creator: Aman Bajpai — ab9738136@gmail.com
