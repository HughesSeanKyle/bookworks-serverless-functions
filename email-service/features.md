### Features - Setup cloud function for node mailer with custom email
Spark plan (Firebase) no longer offers cloud functions as a service. However, stick to microservice architecture, create this service and deploy with render. Only issue os that you will not have auto scalling and all the great features that come with serverless functions.

Update: 10/02 - Vercel offers FaaS (Functions as a Service) - Use

- Setting up Nodemailer for with secure password - More info available [`here`](https://stackoverflow.com/questions/72470777/nodemailer-response-535-5-7-8-username-and-password-not-accepted)

1. Setup Nodemailer for custom signup email with auth code to email
2. Setup Nodemailer for custom forgot password with authcode to verify email reset 
3. Test functions locally before deploy
4. Ensure that this function can only be called from whitelisted domains 
- The Bookworks client side domain 
- Local 




