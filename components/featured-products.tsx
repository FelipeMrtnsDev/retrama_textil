'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Weight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/lib/products'

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll('[data-product]')
            cards.forEach((card, i) => {
              const htmlCard = card as HTMLElement
              setTimeout(() => {
                htmlCard.style.transition =
                  'opacity 0.6s ease, transform 0.6s ease'
                htmlCard.style.opacity = '1'
                htmlCard.style.transform = 'translateY(0)'
              }, 120 * i)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featured = products.slice(0, 4)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-muted/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
              Destaques
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Tecidos em destaque
            </h2>
          </div>
          <Link href="/catalogo">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 gap-2"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/produto/${product.slug}`}
              data-product
              className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
                    {product.origin}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      R$ {product.pricePerKg.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Weight className="w-3 h-3" />
                      por quilo
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-secondary-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
