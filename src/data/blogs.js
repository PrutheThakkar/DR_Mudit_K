import totalKneeImage from "../images/blog-1.webp";
import waitingImage from "../images/blog-2.webp";
import youngPatientImage from "../images/blog-3.webp";

export const blogs = [
  {
    slug: "do-you-really-need-a-total-knee-replacement",
    title: "Do You Really Need a Total Knee Replacement or Is a Partial Knee Enough?",
    shortTitle: "Do You Really Need A Total Knee Replacement Or Is A Partial Knee Enough?",
    image: totalKneeImage,
    category: "Knee Replacement",
    readTime: "6 min read",
    intro:
      "Not every worn knee needs to be completely replaced. The right operation depends on where the arthritis is, how stable the knee remains, and what you want to return to doing.",
    sections: [
      {
        heading: "The difference is how much of the knee is affected",
        paragraphs: [
          "A total knee replacement resurfaces all of the knee's main compartments. A partial knee replacement treats only the damaged compartment and preserves more of your natural bone, ligaments and movement.",
          "Partial replacement can feel more natural and may allow a quicker recovery, but it is suitable only when arthritis is truly limited to one area of the joint.",
        ],
      },
      {
        heading: "When a partial knee may be considered",
        bullets: [
          "Pain and cartilage loss are confined to one knee compartment.",
          "The major knee ligaments are healthy and the knee remains stable.",
          "The deformity can be corrected and movement is reasonably well preserved.",
          "Symptoms have not improved enough with appropriate non-surgical care.",
        ],
      },
      {
        heading: "Why the decision should be personalised",
        paragraphs: [
          "Symptoms, examination findings and weight-bearing X-rays all matter. Age alone does not decide the operation, and an MRI is not always required. Your surgeon should explain why the pattern of arthritis makes one option more predictable than the other.",
          "The goal is not to choose the smallest or largest procedure. It is to choose the treatment most likely to relieve pain, restore confidence and last well for your particular knee.",
        ],
      },
    ],
  },
  {
    slug: "hidden-cost-of-waiting-too-long-for-knee-replacement",
    title: "The Hidden Cost of Waiting Too Long for Knee Replacement",
    shortTitle: "The Hidden Cost Of Waiting Too Long For Knee Replacement",
    image: waitingImage,
    category: "Joint Health",
    readTime: "5 min read",
    intro:
      "Knee replacement is rarely an emergency, and thoughtful non-surgical treatment is worthwhile. But once severe arthritis steadily restricts life, waiting indefinitely can carry costs of its own.",
    sections: [
      {
        heading: "What can change while you wait",
        paragraphs: [
          "Persistent pain often leads people to walk less. Over time, the muscles supporting the knee weaken, stiffness increases and general fitness declines. Sleep, mood, work and independence can also be affected.",
          "A knee that becomes very stiff or deformed can make rehabilitation more demanding. Surgery can still be successful, but regaining strength and movement may take longer.",
        ],
      },
      {
        heading: "Signs that it is time to review your plan",
        bullets: [
          "Pain is present most days or regularly disturbs sleep.",
          "Walking, stairs and everyday tasks are becoming progressively harder.",
          "Medication, physiotherapy, activity changes or injections no longer provide useful relief.",
          "Your world is shrinking because you plan daily life around your knee.",
        ],
      },
      {
        heading: "There is no single perfect date",
        paragraphs: [
          "The best timing balances symptom severity, X-ray findings, overall health and personal readiness. A consultation does not commit you to surgery; it gives you a clearer picture of your options and helps you plan ahead.",
        ],
      },
    ],
  },
  {
    slug: "too-young-for-knee-replacement",
    title: "Too Young for Knee Replacement? What Surgeons Actually Consider",
    shortTitle: "Too Young For Knee Replacement? What Surgeons Actually Consider",
    image: youngPatientImage,
    category: "Patient Guidance",
    readTime: "6 min read",
    intro:
      "There is no universal minimum age for knee replacement. Surgeons look beyond the number on a birth certificate to understand the joint damage, the impact on your life and the likely long-term trade-offs.",
    sections: [
      {
        heading: "Why age still matters",
        paragraphs: [
          "Modern knee replacements are durable, but no implant can be promised to last forever. A younger patient has more years of activity ahead and therefore a greater lifetime chance of needing revision surgery.",
          "That is why specialists first make sure the diagnosis is correct and that suitable joint-preserving treatments have been explored.",
        ],
      },
      {
        heading: "What matters alongside age",
        bullets: [
          "The severity and location of arthritis on weight-bearing X-rays.",
          "How pain and stiffness affect work, sleep, mobility and family life.",
          "Whether non-surgical treatment has been given a fair trial.",
          "Overall health, expectations, activity goals and willingness to complete rehabilitation.",
        ],
      },
      {
        heading: "A decision based on quality of life",
        paragraphs: [
          "For some younger adults, delaying surgery is sensible and manageable. For others with advanced disease, years of severe limitation may be a larger cost than the future possibility of revision. The decision should follow an open discussion of both paths.",
        ],
      },
    ],
  },
];

export const blogPath = slug => `/insights/${slug}/`;
