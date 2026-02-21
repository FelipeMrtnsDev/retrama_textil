'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-retrama.png"
            alt="Retrama Amazonia"
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              RETRAMA
            </span>
            <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Amazonia
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Catalogo
          </Link>
          <Link
            href="/#como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/quem-somos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem Somos
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Buscar">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Carrinho">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Link href="/catalogo">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Comprar Agora
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Catalogo
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/quem-somos"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Quem Somos
            </Link>
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Button variant="ghost" size="icon" aria-label="Buscar">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Carrinho">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              <Link href="/catalogo" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Comprar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
