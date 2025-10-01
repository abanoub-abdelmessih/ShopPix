# 🛍️ ShopPix – Advanced E-Commerce App

**Live Demo:** [shop-pix.vercel.app](https://shop-pix.vercel.app/)

**ShopPix** is a full-featured, high-performance E-Commerce web application built using **Next.js 15**, **React**, and **TypeScript**. It’s crafted for real-world business needs with modern design, security-first architecture, seamless user experience, and scalable components.

---

## 🚀 Features

### 🔐 Authentication & Security
- Complete authentication system: **Sign In, Sign Up, Forgot Password, Update Profile & Password**
- **JWT + HTTP-only cookies** for secure, persistent sessions
- **Middleware-based route protection**
- User context is shared globally with real-time edit capabilities

### ✅ Forms & Validation
- Built with **React Hook Form** and **Zod**
- Strong validation logic, clean UX errors, static typing via **TypeScript**

### 🎨 UI & UX
- Built with **Shadcn/ui**, **Tailwind CSS**, and **Lucide Icons**
- Fully responsive for **mobile, tablet, and desktop**
- **Swiper.js** for sleek carousels
- **Dark Mode, Light Mode, and System Theme** support
- Reusable components with clean folder structure and best practices

### 🌍 Internationalization (i18n)
- **Multi-language support**: English 🇬🇧 & Arabic 🇪🇬
- **RTL support** for Arabic users
- JSON-based translation system using **Next Intl**

### 🧭 Routing & Structure
- Uses **Next.js 15 App Router**
- **Dynamic Routes** for:
  - Product details: `/product/[slug]`
  - Categories: `/category/[slug]`
  - Filters & pagination via query params
  - Orders: `/orders`, `/orders/[id]`
- Modular, scalable file architecture

### ⚙️ API & State Management
- API handled with **Axios** + **React Query**
- Smart **caching**, **refetching**, and **pagination**
- Realtime toast notifications across the app with context

### 🛍️ Shopping Experience
- Browse products with **advanced real-time filtering**:
  - By **category**, **price**, and **sort order**
  - **Server-side pagination** (not client-sliced)
- Product details page with related items
- Wishlist functionality with real-time feedback
  - Add/remove items, view details, and toast messages
- Cart features:
  - Add, remove, update quantity
  - Clear cart
  - Cart is secured by middleware

### 💳 Checkout & Orders
- Complete **checkout process**:
  - Manage multiple shipping addresses
  - Select payment method: **Cash on Delivery** or **Stripe Online Payment**
- Stripe integration with redirection flow and secure return
- **Orders Page**:
  - View all previous orders
  - Track payment method and delivery status

---

## 🧰 Tech Stack

| Technology         | Usage                                           |
|--------------------|--------------------------------------------------|
| **Next.js 15**     | App Router, dynamic routing, SSR/SSG             |
| **React**          | UI library                                       |
| **TypeScript**     | Static typing                                    |
| **Tailwind CSS**   | Utility-first CSS framework                      |
| **Shadcn/ui**      | Accessible, modern UI components                 |
| **Zod**            | Schema validation                                |
| **React Query**    | Server state and caching                         |
| **Axios**          | API handling                                     |
| **Stripe**         | Payment gateway                                  |
| **Lucide**         | Icon library                                     |
| **React Hook Form**| Forms + validation                               |
| **Swiper.js**      | Carousel UI                                      |
| **Next-Intl**      | Internationalization + RTL support               |
| **Dynamic Routes** | SEO-friendly and scalable navigation structure   |

---

## 📦 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Abanoub-Abdelmessih/ShopPix

# 2. Navigate to the project directory
cd ShopPix

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
