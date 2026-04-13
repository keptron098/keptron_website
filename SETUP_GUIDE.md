# Keptron Website — Setup Guide

This guide covers the two Google Sheets backends you need to wire up:

1. **Quote form** → saves to a Sheet + emails `info@keptronelectronics.com`
2. **Blogs CMS** → admin can publish posts, visitors see them

Both use free Google Apps Script. No servers, no hosting costs.

---

## Part 1 — Quote Form (Google Sheet + Email)

### Step 1. Create the Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet.
2. Name it **Keptron Quote Requests**.

### Step 2. Add the Apps Script
1. In the sheet, click **Extensions → Apps Script**.
2. Delete the default code.
3. Open the file `google-sheets-quote-apps-script.gs` (in this repo) and paste its contents.
4. If you want notifications to a different email, update `NOTIFY_EMAIL` at the top.
5. Save (Ctrl+S), name the project **Keptron Quote Backend**.

### Step 3. Initialise the sheet
1. In the Apps Script editor, choose the function **`initSheet`** from the dropdown.
2. Click **Run**. Authorize when prompted (Advanced → Go to ... → Allow).
3. Return to your sheet; you should see a `quotes` tab with column headers.

### Step 4. Deploy as Web App
1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon and pick **Web app**.
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, authorize, and copy the **Web App URL**.

### Step 5. Paste URL into the website
1. Open `app.js`.
2. Find this line near the bottom:
   ```js
   const QUOTE_ENDPOINT = '';
   ```
3. Paste the URL between the quotes:
   ```js
   const QUOTE_ENDPOINT = 'https://script.google.com/macros/s/AKfy.../exec';
   ```
4. Save.

Now, when someone submits the quote form on the website:
- The data is appended to your Google Sheet.
- You get an email notification at `info@keptronelectronics.com`.

---

## Part 2 — Blogs (Google Sheet + Admin Panel)

### Step 1. Create the Google Sheet
1. Create a new Google Sheet named **Keptron Blog CMS**.

### Step 2. Add the Apps Script
1. Extensions → Apps Script.
2. Paste the contents of `google-sheets-blog-apps-script.gs`.
3. Save as **Keptron Blog Backend**.

### Step 3. Initialise
1. Run **`initSheet`** once, authorize.

### Step 4. Deploy
Same as Quote form — deploy as Web app, Execute as Me, Access: Anyone.
Copy the Web App URL.

### Step 5. Paste URL into blogs.js
1. Open `blogs.js`.
2. Find:
   ```js
   const SHEET_ENDPOINT = '';
   ```
3. Paste your URL.

### Step 6. First-time admin setup
1. Open `blogs.html` in a browser.
2. Scroll to the bottom and click **Admin**.
3. Enter email `info@keptronelectronics.com` and choose a password.
4. Click **First-time Setup** (only works once).
5. Then click **Sign In** with the same credentials.
6. Create & publish posts from the editor.

### Writing posts
- The content field accepts HTML. You can use:
  - `<h2>` / `<h3>` for headings
  - `<p>` for paragraphs
  - `<ul>` / `<li>` for bullet lists
  - `<strong>` / `<em>` for formatting
  - `<a href="...">` for links
- Uncheck "Publish" to save as draft.

---

## Notes

- If you forget to paste either `QUOTE_ENDPOINT` or `SHEET_ENDPOINT`, the site still works but:
  - The quote form falls back to downloading a CSV locally.
  - Blogs fall back to `localStorage` (only visible in one browser).
- If you redeploy the Apps Script, you'll get a new URL — update the file accordingly.
- Both scripts are free. Google limits: ~20,000 emails/day, ~6 min script execution — far more than you'll ever need.
