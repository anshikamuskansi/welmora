# Verdant Wellness Supply — B2B Website

A simple wholesale catalog website for health products (protein bars, protein
powder, menstrual cups, etc). Built so a non-technical person can add new
products through a form — no code editing needed after setup.

```
wellness-b2b/
├── backend/           ← the server + database logic
│   ├── models/Product.js
│   ├── routes/products.js
│   ├── uploads/        ← uploaded product photos are saved here
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/           ← the website itself
    ├── index.html       ← product catalog (public page)
    ├── admin.html        ← "Add product" form (admin page)
    ├── css/style.css
    └── js/ (main.js, admin.js)
```

The backend serves the frontend too, so **you only run one server** and only
need **one hosting service** for the whole site.

---

## Part 1 — Install the tools (one-time setup)

1. Install **Node.js** (this runs the backend server): https://nodejs.org
   Choose the "LTS" version. This also installs `npm`, which you'll use below.
2. Create a **free MongoDB Atlas account** (this is the database, hosted in
   the cloud so you don't need to install anything locally):
   https://www.mongodb.com/cloud/atlas/register

---

## Part 2 — Set up MongoDB (the database)

1. In MongoDB Atlas, click **"Build a Database"** → choose the **free (M0)**
   tier → pick a cloud region close to you → click **Create**.
2. When asked to create a database user, set a **username and password**.
   Save these somewhere safe — you'll need them in a moment.
3. Under **Network Access**, click **Add IP Address** → choose
   **"Allow access from anywhere"** (0.0.0.0/0). This is fine for a small
   business site; you can restrict it later if needed.
4. Go to **Database → Connect → Drivers**, choose **Node.js**, and copy the
   connection string. It looks like this:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. Replace `<username>` and `<password>` with the ones you created, and add
   a database name at the end, e.g.:
   ```
   mongodb+srv://verdant_admin:MyPass123@cluster0.xxxxx.mongodb.net/wellnessDB
   ```
   Keep this string — you'll paste it into a file in the next step.

---

## Part 3 — Configure the backend

1. Open the `backend` folder.
2. Make a copy of the file `.env.example` and rename the copy to `.env`.
3. Open `.env` in any text editor and fill in:
   ```
   MONGO_URI=<paste your MongoDB connection string here>
   PORT=5000
   ADMIN_PASSWORD=<choose a password to protect the "Add Product" page>
   ```
4. Save the file. **Never share this `.env` file publicly** — it contains
   your database password.

---

## Part 4 — Install and run

Open a terminal (Command Prompt / Terminal app), navigate into the `backend`
folder, then run:

```bash
cd backend
npm install
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:5000
```

Now open your browser and go to:
- **http://localhost:5000** → the public product catalog
- **http://localhost:5000/admin.html** → the "Add Product" page

That's it — the whole website (frontend + backend + database) is running.

---

## Part 5 — How adding products works (for your client)

1. Go to the **Admin** page (`/admin.html`).
2. Click the photo box and choose a product image.
3. Fill in the name, category, price, description, etc.
4. Enter the **admin password** (the one set in `.env`).
5. Click **"Add product"**.

The product instantly appears on the public catalog page — no code changes,
no developer needed. Photos are saved automatically in `backend/uploads/`,
and the product details are saved in MongoDB.

To remove a product, scroll to the "Existing products" table on the admin
page and click **Delete** (this also asks for the admin password).

---

## Part 6 — Where files are actually stored

- **Product photos** → saved as real files inside `backend/uploads/`. The
  database only stores the *path* to each photo (e.g. `/uploads/172-bar.jpg`),
  not the image itself. This keeps the database small and fast.
- **Product details** (name, price, category, description, stock, etc.) →
  stored as documents in MongoDB, in a collection called `products`.
- **Customer accounts** (from Login/Register) → stored in a `users`
  collection. Passwords are never stored as plain text — only a securely
  hashed version, using the `bcryptjs` library.
- **Contact form messages** → stored in a `contacts` collection.

If you outgrow local storage (e.g. hundreds of products with many photos),
you can later switch `backend/routes/products.js` to upload images to a
cloud storage service (like Cloudinary or AWS S3) instead of the local
`uploads/` folder — the rest of the site won't need to change.

---

## Part 6.5 — One shared header and footer for the whole site

Every page (`index.html`, `about.html`, `contact.html`, `shop.html`,
`info.html`, `admin.html`, `login.html`, `register.html`) uses the exact
same header and footer, loaded from two files:

```
frontend/partials/header.html
frontend/partials/footer.html
```

Each page just has two empty placeholders in its HTML:
```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
```

A small script, `frontend/js/include.js`, fetches those two partial files
and drops them into place when the page loads. **This means if you want to
change the logo, navigation links, contact info, or footer for the entire
site, you only ever need to edit those two partial files** — not every
page individually.

---

## Part 6.6 — Accounts, login, and the contact form (new backend routes)

Three new pieces were added to the backend:

- **`POST /api/auth/register`** — creates a new wholesale account (used by
  `register.html`). Passwords are hashed with `bcryptjs` before saving —
  never stored as plain text.
- **`POST /api/auth/login`** — checks email + password, and returns a
  signed token (used by `login.html`). The browser saves this token and
  uses it to know the person is signed in.
- **`POST /api/contact`** — saves a message from the Contact page form into
  MongoDB. **Note:** this only saves the message to the database — it does
  not send you an email. To view submitted messages right now, you'd query
  the `contacts` collection directly (e.g. via MongoDB Atlas's "Browse
  Collections" screen), or ask a developer to build a small admin view for
  it, similar to the existing product list on `admin.html`.

New signups start with `status: "pending"` in the database — there's no
approval screen built yet, so right now every account can sign in
immediately after registering. If you want new business accounts to be
manually approved before they can see wholesale pricing, that's a
reasonable next step to build.

**New environment variable required:** open `.env` and make sure you have:
```
JWT_SECRET=some-long-random-string-that-is-secret
```
This is used to securely sign login tokens — treat it like a password and
never share it publicly. It can be any long, random text.

---



## Part 7 — Putting the site online (hosting)

When you're ready to make this live on the internet instead of just your
computer:

1. Push this project to a **GitHub** repository.
2. Deploy the `backend` folder to a Node.js hosting service such as
   **Render**, **Railway**, or **Fly.io** (all have free tiers).
3. Add the same environment variables (`MONGO_URI`, `PORT`, `ADMIN_PASSWORD`)
   in that hosting service's dashboard — the same way you filled in `.env`.
4. Once deployed, you'll get a public URL like `https://verdant.onrender.com`
   — the whole site (catalog + admin page) works from that one link.

*Important*: on most free hosting plans, locally-uploaded files (in
`uploads/`) can get wiped when the server restarts. For a live production
site, it's worth switching to cloud image storage (see Part 6) once you're
ready to launch publicly.

---

## Notes on the simple admin password

This project uses one shared password (in `.env`) to protect the "Add /
Delete product" actions — enough to stop random visitors from editing your
catalog. It is **not** a full login system with individual staff accounts.
If your client needs multiple staff logins, audit logs, or roles, that's a
reasonable next upgrade to this codebase.
