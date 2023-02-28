## Auth service features 

### Feature 24/02 - Setup custom update password logic and integrate with custom email service
Reason for feature

A custom email confirmation code service has been created which is used to confirm the signup of the user. The service has also been made to be reusable for other logic, such as a forgot password flow or confirm a sensitive user action (e.g deleting high value information). This portion will focus on updating a user's password by consuming the email service. 

1. Setup express service to update a password by email Complete 27/02
2. Ensure that the update password function/logic can only be accessed if the validated code is correct. If not, then throw error *Combine with email service on client side*
3. Limit the request to update password to 3 tries per 24 hour cycle *Implement later*
4. If limit reached return warning *Implement later*
5. Make sure that this route can only be accessed via specific domains 
- Localhost - checklist implemented Complete 27/02
- Bookworks domain - *Implement later*
6. Deploy to render for testing 
- Test secret files specifically <==== 27/02
7. Later, deploy as serverless function 

NOTE: According to render docs, all secret files are available at the root of project. Explanation fr where to locate files when using docker as well. More information [`here`](https://render.com/docs/configure-environment-variables#secret-and-environment-configuration-files)