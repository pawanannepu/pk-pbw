// 1. External imports
import Image from "next/image";

// 2. Internal imports
// (None)

// 3. Type definitions
type TestimonialsProps = Record<string, never>;

// 4. Component
export function Testimonials({}: TestimonialsProps) {
  return (
    <section className="w-full bg-surface py-20 lg:py-28 px-6 lg:px-8 border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Category Label */}
        <span className="text-xs font-semibold tracking-widest text-accent uppercase block mb-6">
          SUCCESS STORIES
        </span>

        {/* Testimonial Quote */}
        <blockquote className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-text-primary leading-snug tracking-tight max-w-3xl mx-auto">
          “I used to spend my evenings copy-pasting resumes. Now I open my
          dashboard to see interviews waiting. It feels like cheating. Had 3 offers
          on the table simultaneously.”
        </blockquote>

        {/* Author Details */}
        <div className="mt-8 flex items-center justify-center gap-3.5">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-border shadow-xs">
            <Image
              src="/images/user-icon.png"
              alt="Tom Wilson"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-text-primary">
              Tom Wilson
            </div>
            <div className="text-xs text-text-secondary">Junior Developer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
