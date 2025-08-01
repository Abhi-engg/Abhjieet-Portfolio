# Web3Forms Integration Guide

This guide explains how to set up and configure Web3Forms for the contact form in your portfolio website.

## What is Web3Forms?

Web3Forms is a simple form backend service that allows you to receive form submissions directly in your email inbox without any server or backend code. It's perfect for static websites and JAMstack applications.

## Getting Started

### 1. Create an Access Key

1. Visit [Web3Forms.com](https://web3forms.com/)
2. Enter your email address to create an access key
3. Check your email for the access key

### 2. Configure the Contact Form

The contact form has already been integrated with Web3Forms in the `Contact.tsx` component. You just need to replace the placeholder access key with your actual key:

```typescript
// In src/components/Contact.tsx
const { submit } = useWeb3Forms({
  access_key: 'YOUR_ACCESS_KEY_HERE', // Replace with your actual access key from web3forms.com
  // ... other settings
});
```

### 3. Testing the Form

After replacing the access key:

1. Run your development server with `npm run dev`
2. Navigate to the contact form section
3. Fill out the form and submit it
4. You should receive the submission in the email you used to create the access key

## Features

- **No Backend Required**: Form submissions go directly to your email
- **Spam Protection**: Includes honeypot protection
- **Customizable**: You can customize the subject, from name, and other settings
- **Error Handling**: Built-in error handling and success messages

## Troubleshooting

If you're not receiving form submissions:

1. Check that you've replaced the placeholder access key with your actual key
2. Verify that the email address you used to create the key is correct
3. Check your spam/junk folder
4. Ensure your form has the required fields (name, email, message)

## Additional Resources

- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Web3Forms React Plugin](https://www.npmjs.com/package/@web3forms/react)