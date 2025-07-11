"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  LinkIcon,
  ImageIcon,
  List,
  ListOrdered,
  Heading,
  Code,
  Quote,
  Eye,
  Edit3,
  Upload,
  Paperclip,
  Maximize2,
  Minimize2,
} from "lucide-react"

interface MarkdownTextareaProps {
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  contentType?: "markdown" | "html" | "text" // Nouvelle prop
  className?: string
  onChange?: (value: string) => void
  onFileUpload?: (file: File) => Promise<string>
  disabled?: boolean
  maxLength?: number
}

// Fonction simple pour convertir Markdown en HTML
const parseMarkdown = (text: string): string => {
  if (!text) return ""

  return (
    text
      // Échapper les caractères HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')

      // Bold et Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Code inline
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-muted p-3 rounded-md overflow-x-auto my-3"><code class="text-sm font-mono">$1</code></pre>',
      )

      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )

      // Images
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-2" />')

      // Blockquotes
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-2">$1</blockquote>',
      )

      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')

      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-2">')
      .replace(/\n/g, "<br>")

      // Wrap in paragraphs
      .replace(/^(.+)/, '<p class="mb-2">$1')
      .replace(/(.+)$/, "$1</p>")
  )
}

// Fonction pour convertir HTML basique en Markdown
const convertHtmlToMarkdown = (html: string): string => {
  if (!html || typeof html !== "string") return ""

  return (
    html
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")

      // Bold et Italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")

      // Links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

      // Images
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")

      // Code
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, "```\n$1\n```")

      // Lists
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<ul[^>]*>(.*?)<\/ul>/gi, "$1\n")
      .replace(/<ol[^>]*>(.*?)<\/ol>/gi, "$1\n")

      // Blockquotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n")

      // Paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")

      // Line breaks
      .replace(/<br\s*\/?>/gi, "\n")

      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, "")

      // Clean up extra whitespace
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

export const MarkdownTextarea = ({
  id,
  name,
  placeholder = "Écrivez votre contenu...",
  defaultValue = "",
  contentType = "markdown", // Valeur par défaut
  className,
  onChange,
  onFileUpload,
  disabled = false,
  maxLength,
}: MarkdownTextareaProps) => {
  // Traiter le contenu initial selon son type
  const processInitialContent = (value: string, type: string) => {
    if (!value) return ""

    switch (type) {
      case "html":
        return convertHtmlToMarkdown(value)
      case "text":
        return value // Texte brut, pas de traitement
      case "markdown":
      default:
        return value // Déjà en Markdown
    }
  }

  const [content, setContent] = useState(() => processInitialContent(defaultValue, contentType))
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length > maxLength) return

    setContent(newValue)
    onChange?.(newValue)
  }

  const insertText = useCallback(
    (before: string, after = "", placeholder = "") => {
      if (!textareaRef.current || disabled) return

      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)
      const textToInsert = selectedText || placeholder

      const newText = content.substring(0, start) + before + textToInsert + after + content.substring(end)

      if (maxLength && newText.length > maxLength) return

      setContent(newText)
      onChange?.(newText)

      // Repositionner le curseur
      setTimeout(() => {
        textarea.focus()
        if (selectedText) {
          const newCursorPos = start + before.length + selectedText.length + after.length
          textarea.setSelectionRange(newCursorPos, newCursorPos)
        } else {
          const newStart = start + before.length
          const newEnd = newStart + textToInsert.length
          textarea.setSelectionRange(newStart, newEnd)
        }
      }, 0)
    },
    [content, onChange, disabled, maxLength],
  )

  // Raccourcis clavier
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (disabled) return

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            insertText("**", "**", "texte en gras")
            break
          case "i":
            e.preventDefault()
            insertText("*", "*", "texte en italique")
            break
          case "k":
            e.preventDefault()
            insertText("[", "](url)", "texte du lien")
            break
          case "Enter":
            e.preventDefault()
            setActiveTab(activeTab === "write" ? "preview" : "write")
            break
          case "f":
            e.preventDefault()
            setIsFullscreen(!isFullscreen)
            break
        }
      }

      // Tab pour indentation
      if (e.key === "Tab") {
        e.preventDefault()
        insertText("  ")
      }
    },
    [insertText, activeTab, disabled, isFullscreen],
  )

  // Gestion du drag & drop
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    },
    [disabled],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (disabled || !onFileUpload) return

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        await handleFileUpload(files[0])
      }
    },
    [onFileUpload, disabled],
  )

  const handleFileUpload = async (file: File) => {
    if (!onFileUpload || disabled) return

    setIsUploading(true)
    try {
      const url = await onFileUpload(file)
      if (file.type.startsWith("image/")) {
        insertText(`![${file.name}](${url})`)
      } else {
        insertText(`[${file.name}](${url})`)
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const formatActions = [
    {
      icon: Bold,
      title: "Gras",
      action: () => insertText("**", "**", "texte en gras"),
      shortcut: "⌘B",
    },
    {
      icon: Italic,
      title: "Italique",
      action: () => insertText("*", "*", "texte en italique"),
      shortcut: "⌘I",
    },
    {
      icon: LinkIcon,
      title: "Lien",
      action: () => insertText("[", "](url)", "texte du lien"),
      shortcut: "⌘K",
    },
    {
      icon: ImageIcon,
      title: "Image",
      action: () => insertText("![", "](url)", "texte alternatif"),
    },
    {
      icon: Heading,
      title: "Titre",
      action: () => insertText("## ", "", "Titre"),
    },
    {
      icon: List,
      title: "Liste à puces",
      action: () => insertText("- ", "", "élément"),
    },
    {
      icon: ListOrdered,
      title: "Liste numérotée",
      action: () => insertText("1. ", "", "élément"),
    },
    {
      icon: Code,
      title: "Code",
      action: () => insertText("`", "`", "code"),
    },
    {
      icon: Quote,
      title: "Citation",
      action: () => insertText("> ", "", "citation"),
    },
  ]

  // Gérer les changements de defaultValue
  useEffect(() => {
    if (defaultValue !== undefined) {
      const processedContent = processInitialContent(defaultValue, contentType)
      setContent(processedContent)
    }
  }, [defaultValue, contentType])

  // Gérer le mode plein écran
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen])

  const containerClasses = cn(
    "bg-background border rounded-lg overflow-hidden transition-all duration-200",
    isFullscreen && "fixed inset-4 z-50 shadow-2xl",
    className,
  )

  const textareaHeight = isFullscreen ? "calc(100vh - 200px)" : "200px"

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="flex items-center justify-between p-2 sm:p-3">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "write" | "preview")}
            className="flex-1"
          >
            <TabsList className="h-8 bg-transparent p-0 space-x-1">
              <TabsTrigger
                value="write"
                className="h-7 px-2 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-background"
              >
                <Edit3 size={14} className="mr-1" />
                <span className="hidden sm:inline">Écrire</span>
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="h-7 px-2 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-background"
              >
                <Eye size={14} className="mr-1" />
                <span className="hidden sm:inline">Aperçu</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Quitter plein écran" : "Plein écran"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </Button>

            {onFileUpload && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  disabled={disabled}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || disabled}
                  title="Joindre un fichier"
                >
                  {isUploading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Paperclip size={14} />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Barre d'outils */}
        {activeTab === "write" && (
          <div className="flex items-center gap-0.5 px-2 sm:px-3 pb-2 overflow-x-auto">
            {formatActions.map((action, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="sm"
                title={`${action.title} ${action.shortcut || ""}`}
                onClick={action.action}
                disabled={disabled}
                className="h-7 w-7 p-0 flex-shrink-0 hover:bg-muted"
              >
                <action.icon size={14} />
                <span className="sr-only">{action.title}</span>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Contenu */}
      <Tabs value={activeTab} className="w-full">
        <TabsContent value="write" className="m-0">
          <div
            className={cn("relative", isDragging && "bg-primary/5")}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Textarea
              ref={textareaRef}
              id={id}
              name={name}
              placeholder={placeholder}
              value={content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="border-0 shadow-none focus-visible:ring-0 resize-none font-mono text-sm"
              style={{ height: textareaHeight }}
            />

            {/* Overlay drag & drop */}
            {isDragging && (
              <div className="absolute inset-0 bg-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-primary">Déposez votre fichier ici</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="p-3 sm:p-4 overflow-auto" style={{ height: textareaHeight }}>
            {content ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            ) : (
              <p className="text-muted-foreground text-sm">Rien à prévisualiser</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-2 sm:px-3 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2 sm:gap-4">
            <span>Markdown</span>
            <div className="hidden md:flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-muted rounded">⌘B</kbd>
              <span>gras</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded">⌘I</kbd>
              <span>italique</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {maxLength && (
              <span className={content.length > maxLength * 0.9 ? "text-destructive" : ""}>
                {content.length}
                {maxLength && `/${maxLength}`}
              </span>
            )}
            <kbd className="px-1.5 py-0.5 bg-muted rounded hidden sm:inline">⌘⏎</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
