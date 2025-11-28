# 🛍️ Friends Gallery E-Commerce

A modern, full-featured e-commerce platform for selling Islamic clothing and accessories.

## 🚀 Quick Start

### 1. Setup Database (5 minutes)
1. Open: https://gkvzcmhtsbhvydtdapxu.supabase.co/project/gkvzcmhtsbhvydtdapxu/sql/new
2. Copy all content from `supabase-setup.sql`
3. Paste and click **RUN**

### 2. Install & Run
```bash
npm install
npm run dev
```

### 3. Deploy
```bash
npm install -g vercel
vercel --prod
```

**Done! Your site is live!** 🎉

---

## 📁 Project Structure

```
├── components/          # React components
├── pages/              # Page components
├── services/           # Supabase API services
│   ├── supabase.ts    # Supabase client
│   ├── api.ts         # Main API service
│   ├── productService.ts
│   ├── orderService.ts
│   └── customerService.ts
├── types.ts           # TypeScript types
├── constants.ts       # App constants
└── supabase-setup.sql # Database setup
```

---

## ✨ Features

- ✅ Product catalog with categories
- ✅ Shopping cart & checkout
- ✅ Order management
- ✅ Customer accounts
- ✅ Admin dashboard (via Supabase)
- ✅ Cash on Delivery payment
- ✅ Mobile responsive
- ✅ Real-time database

---

## 🔧 Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Backend:** Supabase (PostgreSQL)
- **Hosting:** Vercel (Free)
- **Styling:** Custom CSS

---

## 📊 Manage Your Store

**Supabase Dashboard:** https://gkvzcmhtsbhvydtdapxu.supabase.co

### Add Products:
1. Go to Table Editor → products
2. Click Insert → Add product details

### View Orders:
1. Go to Table Editor → orders
2. See all customer orders

### Update Order Status:
1. Click on order → Edit
2. Change status to: প্রক্রিয়াধীন, শিপিং-এ, পৌঁছে গেছে

---

## 💰 Cost

**100% FREE:**
- Supabase: 500MB database, 50K users/month
- Vercel: Unlimited sites, 100GB bandwidth/month

---

## 📖 Documentation

- **START-HERE.md** - Complete setup guide
- **ADMIN-GUIDE.md** - Store management guide
- **supabase-setup.sql** - Database schema

---

## 🆘 Troubleshooting

**Products not showing?**
→ Run `supabase-setup.sql` in Supabase SQL Editor

**Build errors?**
→ Run `npm install` then `npm run build`

**Deployment issues?**
→ Check Vercel docs: https://vercel.com/docs

---

## 📞 Support

- **Phone:** 01618803154
- **Email:** friendsgallery191@gmail.com

---

## 📄 License

MIT License - Free to use for personal or commercial projects

---

**Built with ❤️ for fast, free e-commerce**
