import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-[#1A1A2E] prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-[#1A3A5C] prose-a:underline-offset-2 prose-strong:text-[#1A1A2E] prose-code:text-[#1A3A5C] prose-code:bg-[#F1F3F5] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-[#1A3A5C] prose-blockquote:bg-[#F8F9FA] prose-blockquote:text-[#555B6E] prose-blockquote:not-italic prose-img:rounded-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
