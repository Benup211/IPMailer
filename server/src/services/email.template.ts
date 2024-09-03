
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App IPMailer!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Our App, {name}!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>We're thrilled to have you on board! We can't wait for you to start exploring our app and all the features it has to offer.</p>
    <p>As a new user, we'd like to give you a quick tour of the app and highlight some of the key things you can do:</p>
    <ul>
      <li>Create your profile and personalize your experience</li>
      <li>Discover new content and features tailored to your interests</li>
      <li>Connect with other users and engage in discussions</li>
      <li>Receive updates and announcements about new developments</li>
    </ul>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team. We're here to help you every step of the way.</p>
    <p>We hope you enjoy your time with our app, and we look forward to seeing you around!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;