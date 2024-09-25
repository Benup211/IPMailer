export const WELCOME_EMAIL_AND_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App IPMailer!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Our App IPMailer!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>We're thrilled to have you on board! To get started, please verify your account by clicking the button below:</p>
    <p style="text-align: center;">
      <a href="{verification_link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify My Account</a>
    </p>
    <p>Once your account is verified, you can explore all the features we offer:</p>
    <ul style="list-style-type: disc; margin-left: 20px;">
      <li>SMTP IP Rotation for enhanced email deliverability</li>
      <li>User Management for team collaboration</li>
      <li>Subscriber Tracking for monitoring engagement</li>
      <li>Rich Text Email Customization for visually appealing emails</li>
      <li>Detailed Analytics on email performance</li>
      <li>Segmentation for targeted campaigns</li>
      <li>A/B Testing to optimize email content</li>
      <li>Templates Library for quick email creation</li>
      <li>API Integration for seamless workflows</li>
      <li>Compliance Management to ensure regulatory adherence</li>
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
export const TWO_FA_CODE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 2FA Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #f44336, #d32f2f); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Your 2FA Code</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi there!</p>
    <p>To complete your login, please use the following 2FA code:</p>
    <h2 style="text-align: center; font-size: 24px; font-weight: bold; color: #f44336;">{2fa_code}</h2>
    <p>This code is valid for the next 10 minutes. If you did not request this code, please disregard this email.</p>
    <p>If you have any questions or require assistance, feel free to reach out to our support team. We're here to help!</p>
    <p>Thank you for using our app!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ADMIN_REGISTER_WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App IPMailer!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Our App IPMailer!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>We're excited to have you join us! Your account has been created successfully. Below are your login details:</p>
    <p><strong>Email:</strong> {user_email}</p>
    <p><strong>Password:</strong> {user_password}</p>
    <p>Please keep this information secure. You can log in to your account and start enjoying our features.</p>
    <p style="text-align: center;">
      <a href="{login_link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to My Account</a>
    </p>
    <p>Once logged in, you can explore all the features we offer:</p>
    <ul style="list-style-type: disc; margin-left: 20px;">
      <li>SMTP IP Rotation for enhanced email deliverability</li>
      <li>User Management for team collaboration</li>
      <li>Subscriber Tracking for monitoring engagement</li>
      <li>Rich Text Email Customization for visually appealing emails</li>
      <li>Detailed Analytics on email performance</li>
      <li>Segmentation for targeted campaigns</li>
      <li>A/B Testing to optimize email content</li>
      <li>Templates Library for quick email creation</li>
      <li>API Integration for seamless workflows</li>
      <li>Compliance Management to ensure regulatory adherence</li>
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

export const RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #f44336, #d32f2f); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>We received a request to reset your password. To proceed, please click the button below:</p>
    <p style="text-align: center;">
      <a href="{reset_password_link}" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset My Password</a>
    </p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team. We're here to help you every step of the way.</p>
    <p>Thank you,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;