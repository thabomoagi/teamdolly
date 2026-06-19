'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = 'https://idxscsrkxxbopxjkgisb.supabase.co/storage/v1/object/public/product-images/'

const COLORS = [
  { name: 'Pink',   hex: '#ff69b4', img: 'shirt-pink.JPG' },
  { name: 'Black',  hex: '#1a1a1a', img: 'shirt-black.JPG' },
  { name: 'White',  hex: '#f0f0f0', img: 'shirt-white.jpeg' },
  { name: 'Yellow', hex: '#f5d000', img: 'shirt-yellow.JPG' },
  { name: 'Blue',   hex: '#3a7bd5', img: 'shirt-blue.JPG' },
  { name: 'Orange', hex: '#ff6b35', img: 'shirt-orange.JPG' },
]

const SIZES = ['S', 'M', 'L', 'XL']

const TICKER_ITEMS = ['TEAM DOLLY', 'OFFICIAL MERCH', 'PRETORIA', 'LEKOMPO', 'AMAPIANO', 'AFROBEATS']

export default function Home() {
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartMsg, setCartMsg] = useState('')
  const [showMsg, setShowMsg] = useState(false)
  const [imgKey, setImgKey] = useState(0)
  const [sizeError, setSizeError] = useState(false)

  const handleColor = (c: typeof COLORS[0]) => {
    setColor(c)
    setImgKey(k => k + 1)
  }

  const addToCart = () => {
    if (!size) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 800)
      return
    }
    setCartCount(n => n + 1)
    setCartMsg(`${color.name} / ${size} added`)
    setShowMsg(true)
    setTimeout(() => setShowMsg(false), 2500)
  }

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans overflow-x-hidden">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#2a2a2a]">
        <a href="#hero" className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">
          TEAM <span className="text-[#ff2d78]">DOLLY</span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {['Shop', 'Book'].map(label => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                className="text-[#888] text-xs tracking-[0.15em] uppercase hover:text-[#ff2d78] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase border border-[#2a2a2a] rounded-full hover:border-[#ff2d78] hover:text-[#ff2d78] transition-colors bg-transparent text-[#e8e8e8]"
        >
          Cart
          {cartCount > 0 && (
            <span className="bg-[#ff2d78] text-white text-[10px] px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <section id="hero" className="relative h-screen flex flex-col items-center justify-end pb-20 overflow-hidden">
        <img
          src={`${BASE}shirt-all.jpeg`}
          alt="Team Dolly crew"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-[#0a0a0a]" />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-['Bebas_Neue'] text-[clamp(6rem,20vw,14rem)] leading-[0.85] tracking-wide text-white drop-shadow-2xl"
          >
            TEAM<br />
            <span className="text-[#ff2d78]">DOLLY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#888] text-sm tracking-[0.12em] uppercase mt-4 mb-8"
          >
            Official Merch
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <a
              href="#shop"
              className="bg-[#ff2d78] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors"
            >
              Shop now
            </a>
            <a
              href="https://open.spotify.com/artist/2Ot5RNeKB99oO2qp51ImHd"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#444] text-[#e8e8e8] px-7 py-3 rounded-full text-sm font-medium tracking-widest uppercase hover:border-white hover:text-white transition-colors"
            >
              Listen on Spotify
            </a>
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#ff2d78] py-2.5">
        <div className="flex animate-[ticker_22s_linear_infinite] whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-white px-6">
              {item}
              <span className="text-white/30 ml-6">·</span>
            </span>
          ))}
        </div>
      </div>

      <section id="shop" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <span className="block font-mono text-[11px] tracking-[0.25em] uppercase text-[#ff2d78] mb-2">
            
          </span>
          <h2 className="font-['Bebas_Neue'] text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-14">
            The Merch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="relative aspect-[3/4] bg-[#171717] rounded overflow-hidden border border-[#2a2a2a]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgKey}
                  src={BASE + color.img}
                  alt={`TeamDolly tee in ${color.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>
              <span className="absolute top-3 left-3 bg-[#f5d000] text-black text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">
                New drop
              </span>
            </div>

            <div className="pt-1 space-y-7">
              <div>
                <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide">TeamDolly Tee</h3>
                <p className="text-[#888] mt-1">
                  <span className="text-white text-2xl font-semibold">ZAR 400</span>
                  &nbsp;&nbsp;incl. delivery
                </p>
              </div>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#888] mb-3">
                  Colour — {color.name}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button
                      key={c.name}
                      onClick={() => handleColor(c)}
                      title={c.name}
                      className="w-9 h-9 rounded-sm transition-transform hover:scale-110"
                      style={{
                        background: c.hex,
                        border: color.name === c.name
                          ? '2px solid #fff'
                          : c.name === 'White'
                          ? '2px solid #444'
                          : '2px solid transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#888] mb-3">
                  Size
                </span>
                <div className="flex gap-2">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className="min-w-[48px] h-10 text-sm tracking-wide rounded-sm transition-all"
                      style={{
                        background: size === s ? '#fff' : 'transparent',
                        color: size === s ? '#000' : '#888',
                        border: sizeError && size !== s
                          ? '1px solid #ff2d78'
                          : size === s
                          ? '1px solid #fff'
                          : '1px solid #2a2a2a',
                        fontWeight: size === s ? 700 : 400,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full py-4 bg-[#ff2d78] text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-[#e0135f] active:scale-[0.99] transition-all"
              >
                Add to cart
              </button>

              <div
                className="text-center text-sm text-[#1db954] transition-opacity duration-300"
                style={{ opacity: showMsg ? 1 : 0, minHeight: '1.25rem' }}
              >
                {cartMsg}
              </div>

              <div className="flex gap-3 bg-[#171717] border border-[#2a2a2a] rounded p-3 text-[13px] text-[#888] leading-relaxed">
                <span>📦</span>
                <span>Delivered within South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="relative h-screen flex flex-col items-center justify-end pb-20 overflow-hidden">
        <img
          src={`${BASE}dolly.JPG`}
          alt="Dolly Ditebogo"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-[#0a0a0a]" />

        <div className="relative z-10 text-center px-4 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Bebas_Neue'] text-[clamp(4rem,12vw,10rem)] leading-[0.85] text-white drop-shadow-2xl"
          >
            BOOK<br />
            <span className="text-[#ff2d78]">DOLLY</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <a
              href="https://wa.me/27662317303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#128c7e] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book Dolly
            </a>
            <a
              href="https://open.spotify.com/artist/2Ot5RNeKB99oO2qp51ImHd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1db954] text-black px-7 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#1ed760] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>
            <a
              href="https://www.youtube.com/@dollyditebogo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#ff0000] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#cc0000] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center pt-4"
          >
            <a href="https://www.instagram.com/dollyditebogo" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/tag/teamdolly" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center border-t border-[#2a2a2a]">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#444]">
          Daflame &copy; 2026
        </p>
      </footer>
    </main>
  )
}