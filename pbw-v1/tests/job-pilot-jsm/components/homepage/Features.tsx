// 1. External imports
import Image from "next/image";

// 2. Internal imports
// (None)

// 3. Type definitions
type FeaturesProps = Record<string, never>;

// 4. Component
export function Features({}: FeaturesProps) {
  return (
    <div className="w-full">
      {/* Feature Section 1: Manage Your Job Search With Ease */}
      <section className="w-full border-b border-border bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="flex flex-col">
            <div className="p-8 lg:p-12 xl:p-14 border-b border-border">
              <h2 className="text-3xl lg:text-[40px] font-bold text-text-primary leading-tight tracking-tight">
                Manage Your Job
                <br />
                Search With Ease
              </h2>
            </div>

            {/* Feature Points */}
            <div className="flex flex-col divide-y divide-border">
              {/* Point 1 (Active/Highlighted with accent left indicator) */}
              <div className="p-8 lg:px-12 lg:py-9 border-l-[3px] border-l-accent bg-surface-secondary/25">
                <h3 className="text-lg font-semibold text-text-primary">
                  Find jobs that actually fit
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Search by title and location or paste a job link. Get matched
                  roles you can quickly scan.
                </p>
              </div>

              {/* Point 2 */}
              <div className="p-8 lg:px-12 lg:py-9">
                <h3 className="text-lg font-semibold text-text-primary">
                  Know the Company Before You Apply
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Stop guessing what a company is about. JobPilot browses their
                  site and gives you everything you need to apply with confidence.
                </p>
              </div>

              {/* Point 3 */}
              <div className="p-8 lg:px-12 lg:py-9">
                <h3 className="text-lg font-semibold text-text-primary">
                  Keep track of every application
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Keep a clear view of every job you’ve found, tailored. Your
                  activity and progress all stay in one simple place.
                </p>
              </div>
            </div>
          </div>

          {/* Right Graphic Column */}
          <div className="border-t lg:border-t-0 lg:border-l border-border bg-surface-secondary/40 p-8 lg:p-12 xl:p-16 flex items-center justify-center">
            <div className="w-full max-w-[540px]">
              <Image
                src="/images/jobs-lists.png"
                alt="Curated Jobs List with AI Match Scores"
                width={680}
                height={510}
                className="w-full h-auto object-contain rounded-xl shadow-md border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Texture Divider */}
      <div className="w-full h-14 bg-diagonal-pattern border-b border-border" />

      {/* Feature Section 2: Apply With More Confidence, Every Time */}
      <section className="w-full border-b border-border bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Graphic Column (Terminal on Diagonal Texture) */}
          <div className="bg-diagonal-pattern p-8 lg:p-12 xl:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
            <div className="w-full max-w-[460px]">
              <Image
                src="/images/agnet-log.png"
                alt="JobPilot Agent Terminal Log"
                width={560}
                height={420}
                className="w-full h-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="flex flex-col">
            <div className="p-8 lg:p-12 xl:p-14 border-b border-border">
              <h2 className="text-3xl lg:text-[40px] font-bold text-text-primary leading-tight tracking-tight">
                Apply With More
                <br />
                Confidence, Every Time
              </h2>
            </div>

            {/* Feature Points */}
            <div className="flex flex-col divide-y divide-border">
              {/* Point 1 */}
              <div className="p-8 lg:px-12 lg:py-9">
                <h3 className="text-lg font-semibold text-text-primary">
                  Understand your match score
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  See how your profile lines up with each role before you apply.
                  Get a clear breakdown of what fits and what’s missing.
                </p>
              </div>

              {/* Point 2 */}
              <div className="p-8 lg:px-12 lg:py-9">
                <h3 className="text-lg font-semibold text-text-primary">
                  AI-Powered Job Matching
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Stop guessing which jobs are worth applying to. JobPilot scores
                  every role against your actual skills so you focus on the ones
                  that matter.
                </p>
              </div>

              {/* Point 3 */}
              <div className="p-8 lg:px-12 lg:py-9">
                <h3 className="text-lg font-semibold text-text-primary">
                  Focus on the right roles
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Filter out low fit jobs and stay on the ones that actually
                  matter. Spend less time sorting and more time applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Texture Divider */}
      <div className="w-full h-14 bg-diagonal-pattern border-b border-border" />
    </div>
  );
}
