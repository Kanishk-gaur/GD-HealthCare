import { CheckCircle2 } from 'lucide-react'

// Lightweight formatting for the admin-authored story text — not full
// markdown, just the handful of patterns patient stories actually use:
// **bold**, "- " checklists, and a single line wrapped in quotes as a pull-quote.
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  )
}

function isPullQuote(line: string) {
  const first = line[0]
  const last = line[line.length - 1]
  return (first === '"' || first === '“') && (last === '"' || last === '”')
}

type Segment =
  | { type: 'p'; lines: string[] }
  | { type: 'ul'; lines: string[] }
  | { type: 'quote'; line: string }

// Groups consecutive lines by kind — bullet lines become a list, other
// non-blank lines become a paragraph — so a checklist immediately after an
// intro sentence (no blank line between them) still splits correctly.
function segment(content: string): Segment[] {
  const segments: Segment[] = []
  let current: Segment | null = null

  for (const raw of content.split('\n')) {
    const line = raw.trim()
    if (!line) {
      current = null
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      if (current?.type === 'ul') {
        current.lines.push(line)
      } else {
        current = { type: 'ul', lines: [line] }
        segments.push(current)
      }
    } else if (current?.type === 'p') {
      current.lines.push(line)
    } else {
      current = { type: 'p', lines: [line] }
      segments.push(current)
    }
  }

  return segments.map((seg) =>
    seg.type === 'p' && seg.lines.length === 1 && isPullQuote(seg.lines[0])
      ? { type: 'quote', line: seg.lines[0] }
      : seg
  )
}

export function PatientTestimonialStory({ content }: { content: string }) {
  const segments = segment(content)

  return (
    <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-5">
      {segments.map((seg, i) => {
        if (seg.type === 'ul') {
          return (
            <ul key={i} className="mt-0! pl-0! list-none space-y-2">
              {seg.lines.map((line, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#ff4c88] mt-0.5 shrink-0" />
                  <span>{renderInline(line.replace(/^[-*]\s+/, ''))}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (seg.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="mt-0! border-l-4 border-[#ffa649] pl-4 italic text-foreground/80"
            >
              {renderInline(seg.line)}
            </blockquote>
          )
        }

        return (
          <p key={i} className="mt-0!">
            {renderInline(seg.lines.join(' '))}
          </p>
        )
      })}
    </div>
  )
}
