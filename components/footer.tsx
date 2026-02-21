import Link from 'next/link'
import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary">
                <Leaf className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary-foreground">
                RetalhoVerde
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Transformando residuos texteis em materia-prima criativa e sustentavel.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Navegacao
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Catalogo
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Como Funciona
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Categorias
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/catalogo?cat=industrial" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Fardas Industriais
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=carnaval" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Carnaval
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=eventos" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Eventos Sazonais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Contato
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-primary-foreground/60">
                contato@retalhoverde.com.br
              </li>
              <li className="text-sm text-primary-foreground/60">
                (11) 99999-0000
              </li>
              <li className="text-sm text-primary-foreground/60">
                Sao Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            2026 RetalhoVerde. Todos os direitos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Feito com cuidado pelo planeta.
          </p>
        </div>
      </div>
    </footer>
  )
}
