### Features - Setup cloud function for node mailer with custom email
Spark plan (Firebase) no longer offers cloud functions as a service. However, stick to microservice architecture, create this service and deploy with render. Only issue os that you will not have auto scalling and all the great features that come with serverless functions.

Update: 10/02 - Vercel offers FaaS (Functions as a Service) - Use

- Setting up Nodemailer for with secure password - More info available [`here`](https://stackoverflow.com/questions/72470777/nodemailer-response-535-5-7-8-username-and-password-not-accepted)

1. Setup Nodemailer for custom signup email with auth code to email
- Error handling 'error-back' pattern - Done 10/02
- Use this function in SignUp flow. When user inputs code and verifyActionCode returns data=true then set user emailVerified attribute to true in Firebase

2. Setup Nodemailer for custom forgot password with authcode to verify email reset (Update this feature progress in client side .md as well)
- Error handling 'error-back' pattern - Done 10/02
- Use this function in SignUp flow. When user inputs code and verifyActionCode returns data=true then redirect user to Forgot Password Confirm => Enter code and use Firebase's reset password API to update the password => Make sure this password is encrypted. 

3. Test functions locally before deploy
- Note "https://bookworks-4fa23.firebaseapp.com" has not been deployed on Firebase just yet. Must still be done when testing functions on client side

4. Ensure that this function can only be called from whitelisted domains 
- The Bookworks client side domain 
- Local 

5. May need to set CORS 
- More info [`here`](https://vercel.com/knowledge/how-to-enable-cors?query=cors#understanding-cors)



<!-- DELETE THIS 10/02
    - Refactor code to use import statements 
    - Test if they work by running through node 
    - Then deploy
    - Follow this structure https://blog.logrocket.com/serverless-deployments-vercel-node-js/

 -->




