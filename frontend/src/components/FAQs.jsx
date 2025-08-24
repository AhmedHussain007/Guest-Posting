import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <div className="w-full px-4 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-white">FAQs</h2>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto text-white"
        defaultValue="item-1"
      >
        {/* FAQ 1 */}
        <AccordionItem value="item-1" className="border-b border-gray-700">
          <AccordionTrigger className="text-lg font-semibold cursor-pointer text-white">
            What Is Guest Posting, And How Does It Work?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-gray-300">
            <p>
              Guest posting is when you write an article and publish it on someone else’s website.
              It’s a way to share your knowledge, reach more people, and get backlinks.
            </p>
            <p><strong>How do we do this:</strong></p>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Find Websites</strong>: We look for blogs in your field that accept guest posts.</li>
              <li><strong>Create Content</strong>: We write articles that will be helpful and interesting
                to their readers adding your SEO keywords and link to your website/service pages.</li>
              <li><strong>Reach Out</strong>: We contact the blog owners to ask if you can submit your guest
                post and we get them published with dofollow links to your website.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="item-2" className="border-b border-gray-700">
          <AccordionTrigger className="text-lg cursor-pointer font-semibold text-white">
            Is Guest Posting Beneficial For My Business?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <p>
              Yes, you will get high quality dofollow backlinks, which will help improve your
              ranking on search engines. This will also help build reputation, branding, and
              increase traffic.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="item-3" className="border-b border-gray-700">
          <AccordionTrigger className="text-lg cursor-pointer font-semibold text-white">
            What Is Domain Authority (DA)?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <p>
              A Moz score that goes from 1 to 100 is called Domain Authority (DA). In search engine
              results, it forecasts a website’s likelihood of ranking. The score helps you
              understand how well your website might do in search rankings. We make guest post on
              high DA blogs for a reason.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="item-4" className="border-b border-gray-700">
          <AccordionTrigger className="text-lg cursor-pointer font-semibold text-white">
            How Do You Choose The Blogs For Guest Posts?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            <p>
              We check for high DA, indexed blogs while selecting them for publication. We can also
              send you the blog list and you decide where your guest posts go. We also consider your
              target audience, keywords, competition, and the spam score of the blogs.
            </p>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
