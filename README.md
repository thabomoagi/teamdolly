# teamdolly.co.za

Official merchandise store and booking platform for Team Dolly (Dolly Ditebogo), a DJ and artist based in Pretoria, South Africa. Built for Daflame (PTY) Ltd.

## Live Site

[https://teamdolly.co.za](https://teamdolly.co.za)

## What I Built

- Product catalog with real-time color/size selection
- Shopping cart with state management
- Order tracking via Supabase database
- PayFast payment integration (South African payment processor)
- Artist booking section with WhatsApp, Spotify, YouTube, Instagram, TikTok links
- Responsive design with Framer Motion animations
- Custom domain deployment

## Stack

| Layer      | Tool                              |
| ---------- | --------------------------------- |
| Framework  | Next.js 15 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS                      |
| Database   | Supabase (PostgreSQL)             |
| Storage    | Supabase Storage (product images) |
| Payments   | PayFast                           |
| Animations | Framer Motion                     |
| Deployment | Vercel                            |
| Domain     | teamdolly.co.za                   |

## Key Features

- **Dynamic product images**: Color selection triggers image swap with smooth transitions
- **Cart persistence**: Local state management with item count
- **Database-driven products**: All SKUs stored in Supabase with Row Level Security
- **Real images**: Product photos hosted on Supabase Storage CDN
- **Mobile-first**: Responsive grid layout, touch-friendly selectors
