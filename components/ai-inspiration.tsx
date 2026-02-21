'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Loader2,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Gauge,
  Weight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/lib/products'

interface Suggestion {
  title: string
  description: string
  difficulty: string
  estimatedFabric: string
  imagePrompt: string
}

export function AIInspiration({ product }: { product: Product }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({})
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({})
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  async function handleGenerateSuggestions() {
    setLoading(true)
    setHasGenerated(true)

    try {
      const res = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fabricName: product.name,
          fabricDescription: product.description,
          fabricComposition: product.composition,
          fabricColors: product.colors.join(', '),
        }),
      })

      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateImage(index: number, prompt: string) {
    setLoadingImages((prev) => ({ ...prev, [index]: true }))

    try {
      /**
       * 1) Baixa a foto do tecido/produto exibida no card
       * 2) Converte para File
       * 3) Envia via FormData para /api/ai-image
       */
      const imageRes = await fetch(product.image)
      if (!imageRes.ok) throw new Error('Falha ao baixar imagem do produto')

      const blob = await imageRes.blob()
      const extension =
        blob.type === 'image/png'
          ? 'png'
          : blob.type === 'image/webp'
            ? 'webp'
            : 'jpg'

      const file = new File([blob], `fabric.${extension}`, {
        type: blob.type || 'image/jpeg',
      })

      const formData = new FormData()
      formData.append('fabricImage', file)
      formData.append('productPrompt', prompt)

      const res = await fetch('/api/ai-image', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Erro ao gerar imagem')
      }

      if (data.imageUrl) {
        setGeneratedImages((prev) => ({
          ...prev,
          [index]: data.imageUrl, // ✅ já vem em data:image/png;base64,...
        }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingImages((prev) => ({ ...prev, [index]: false }))
    }
  }

  const difficultyColor = (d: string) => {
    if (d.toLowerCase().includes('facil')) return 'bg-green-100 text-green-800'
    if (d.toLowerCase().includes('medio')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondary/10 shrink-0">
          <Sparkles className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            O que posso criar com esse tecido?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Nossa IA analisa o tecido e sugere projetos criativos com imagens
            geradas.
          </p>
        </div>
      </div>

      {!hasGenerated && (
        <Button
          onClick={handleGenerateSuggestions}
          disabled={loading}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Gerar Sugestoes com IA
        </Button>
      )}

      {loading && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-border p-5">
              <Skeleton className="h-5 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-base font-bold text-foreground">{s.title}</h4>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${difficultyColor(
                    s.difficulty
                  )}`}
                >
                  {s.difficulty}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Weight className="w-3 h-3" />
                  {s.estimatedFabric}
                </span>
                <span className="flex items-center gap-1">
                  <Gauge className="w-3 h-3" />
                  {s.difficulty}
                </span>
              </div>

              <div className="mt-4">
                {!generatedImages[i] && !loadingImages[i] && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGenerateImage(i, s.imagePrompt)}
                    className="gap-2 text-xs"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Gerar Imagem
                  </Button>
                )}

                {loadingImages[i] && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gerando imagem com IA...
                  </div>
                )}

                {generatedImages[i] && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={generatedImages[i]}
                      alt={s.title}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                className="mt-3 flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {expandedCard === i ? (
                  <>
                    Menos detalhes <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Mais detalhes <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>

              {expandedCard === i && (
                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground animate-in slide-in-from-top-1 duration-200">
                  <p>
                    <strong className="text-foreground">Tecido ideal:</strong>{' '}
                    {product.name}
                  </p>
                  <p className="mt-1">
                    <strong className="text-foreground">Composicao:</strong>{' '}
                    {product.composition}
                  </p>
                  <p className="mt-1">
                    <strong className="text-foreground">Cores disponiveis:</strong>{' '}
                    {product.colors.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasGenerated && !loading && suggestions.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            onClick={handleGenerateSuggestions}
            className="text-primary gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Gerar novas sugestoes
          </Button>
        </div>
      )}
    </div>
  )
}