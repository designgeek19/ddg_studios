# Form setup guide

Both forms (project inquiry and Academy waitlist) are handled by `js/forms.js`.
Until you add a form endpoint, they open the visitor's email app as a fallback. Follow the steps below to receive messages directly in your inbox.

## Option A: Formspree (recommended, works on any host)

1. Create a free account at https://formspree.io.
2. Click **New Form**, name it "DDGs Project Inquiries", and set the recipient to `dataanddesigngeeks@gmail.com`. Copy the form URL, which looks like `https://formspree.io/f/abcdwxyz`.
3. Create a second form called "DDGs Academy Waitlist" and copy its URL.
4. Open `js/forms.js` and replace the two placeholder URLs in the `CONFIG` block:
   ```js
   contactEndpoint:    'https://formspree.io/f/abcdwxyz',
   newsletterEndpoint: 'https://formspree.io/f/wxyzabcd',
   ```
5. In each Formspree form's **Settings**:
   - Under **Domains** (or Allowed origins), add `designanddatageeks.com` so other sites cannot use your form.
   - Turn on **reCAPTCHA** or Formspree's spam filtering for extra protection.
   - Set an auto-reply to confirm receipt, if you want one.
6. Deploy, send a test message from the live site, and confirm it reaches your inbox. Check your spam folder the first time.
7. Confirm the first message when Formspree asks you to verify the recipient address.

The free plan has a monthly submission limit. Check Formspree's current pricing page for the exact number.

## Option B: Netlify Forms (only if you host on Netlify)

1. In `js/forms.js`, set both endpoints to the word `'netlify'`:
   ```js
   contactEndpoint: 'netlify',
   newsletterEndpoint: 'netlify',
   ```
2. Deploy the site. Netlify detects the two forms (`contact` and `waitlist`) automatically.
3. In the Netlify dashboard, go to **Forms** and set up email notifications.

## Option C: Your own API

Any URL that accepts a JSON `POST` works. Each request sends:
- Contact form: `name`, `email`, `type`, `message`, `_subject`
- Waitlist form: `email`, `_subject`

Return a `2xx` status on success. Validate and rate-limit on the server too, because browser checks can be bypassed.

## What the form code already does
- Checks name, email, and message before sending.
- Blocks spam bots with a hidden field and a 30-second wait between sends.
- Shows "Sending..." and disables the button while the request runs.
- Shows a friendly message if the request fails, with your email as a backup.
- Links to the Privacy Policy next to each form.

You can change the wait time and timeout in the `CONFIG` block.

## Testing checklist
- [ ] Submit with empty fields: you see an error and the cursor moves to the first bad field.
- [ ] Submit a valid inquiry: you see the thank-you message and the email arrives.
- [ ] Submit the waitlist form: the email arrives in the waitlist inbox.
- [ ] Turn off your internet and submit: you see the error message with the backup email.
- [ ] Test on a phone.

## Keep in mind
- Messages are stored by your form provider as well as in your inbox. The Privacy Policy lists "form processing providers". Update it if you change providers.
- Delete old inquiries after the retention period stated in the Privacy Policy (24 months).
