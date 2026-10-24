# Form setup guide

The site has two forms, both handled by `js/forms.js`:

| Form | Page | Name | Sends |
|---|---|---|---|
| Project inquiry | `index.html` | `contact` | name, email, type, message |
| Academy application | `academy.html` | `academy` | name, email, phone, country, city, track, cohort, mode, level, hours, motivation, experience, link, source, scholarship, adult, consent |

Until you add a form endpoint, both fall back to opening the visitor's email app. Follow one option below to receive submissions directly.

## Option A: Formspree (works on any host)

1. Create a free account at https://formspree.io.
2. Create two forms: "DDGs Project Inquiries" and "DDG Academy Applications". Set the recipient to `dataanddesigngeeks@gmail.com` and copy each form URL (it looks like `https://formspree.io/f/abcdwxyz`).
3. In `js/forms.js`, replace the two placeholder URLs in the `CONFIG` block:
   ```js
   contactEndpoint: 'https://formspree.io/f/abcdwxyz',
   academyEndpoint: 'https://formspree.io/f/wxyzabcd',
   ```
4. In each Formspree form's settings, add `designanddatageeks.com` as an allowed domain, and turn on spam protection.
5. Deploy, send a test from the live site, and confirm the first email when Formspree asks.

## Option B: Netlify Forms (built in, no separate service)

1. In `js/forms.js`, set both endpoints to the word `'netlify'`:
   ```js
   contactEndpoint: 'netlify',
   academyEndpoint: 'netlify',
   ```
2. Deploy to Netlify (steps below). Netlify finds the forms `contact` and `academy` from the HTML.
3. Open the **Forms** tab in your Netlify dashboard and check that both forms appear.
4. Turn on email alerts: in your project's **Notifications** settings, find **Form submission notifications** and add an **Email notification** to `dataanddesigngeeks@gmail.com`. Add one for each form, or choose "any form". Menu names change slightly between Netlify versions.
5. Send a test from the live Netlify URL. Netlify Forms does not work on `localhost` or when you open the file from your computer.

On Netlify's current credit-based plans, form submissions are free and unlimited. Older legacy accounts are limited to 100 submissions a month. A free-plan project that runs out of credits is paused and does not receive submissions.

## Option C: Your own API

Any URL that accepts a JSON `POST` works. Return a `2xx` status on success. Validate and rate-limit on the server too, because browser checks can be bypassed.

## Updating a site that is already live on Netlify

If you deployed before the Academy page existed, you need to redeploy. Your old `waitlist` form stays in the Netlify dashboard with its past submissions, and the new `academy` form appears after the next deploy.

**If the site is connected to GitHub (recommended):**
1. Copy the new and changed files into your project folder (list in `README.md`).
2. Run `npm run build` once to refresh `css/style.css`.
3. Commit and push to GitHub. Netlify rebuilds automatically.
4. After the deploy finishes, open **Forms** in Netlify, confirm `academy` is listed, and add an email notification for it.
5. If you want, delete the old `waitlist` form in **Forms**. Export its submissions first if you need them.
6. Submit a test application on the live site.

**If you uploaded the folder by drag and drop:**
1. Run `npm run build` on your computer so `css/style.css` is up to date. Netlify does not run it for drag-and-drop deploys.
2. In Netlify, open your project's **Deploys** tab and drag the whole project folder into the upload area. It creates a new deploy and replaces the old one.
3. Then follow steps 4 to 6 above.

## What the form code already does
- Checks every field before sending, and shows a clear message for the first problem.
- Blocks spam bots with a hidden field and a 30-second wait between sends.
- Shows "Sending..." and disables the button while the request runs.
- If sending fails, shows a message with your email as a backup.

You can change the wait time and timeout in the `CONFIG` block.

## Testing checklist
- [ ] Contact form: empty submit shows an error, a valid one shows the thank-you message, and the email arrives.
- [ ] Academy form: try to continue with empty fields on each step, and check the error message appears.
- [ ] Academy form: submit a full application and check the success panel and the email.
- [ ] Turn off your internet and submit: you see the error message with the backup email.
- [ ] Test both forms on a phone.

## Keep in mind
- Submissions are stored by your form provider as well as in your inbox. The Privacy Policy mentions "form processing providers". Update it if you change providers.
- Delete old applications after the retention period in the Privacy Policy (12 months after the decision).
