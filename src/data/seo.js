const seoByPath = {
  "/": {
    title: "Dr. Mudit Khanna | Robotic Hip & Knee Surgeon in Mumbai",
    description:
      "Dr. Mudit Khanna is a senior orthopaedic and joint replacement surgeon in Mumbai specialising in hip and knee replacement, robotic-assisted surgery and arthroscopy.",
    keywords:
      "robotic hip and knee surgeon in Mumbai, hip replacement surgeon Mumbai, knee replacement surgeon Mumbai, joint replacement surgeon Mumbai, orthopaedic surgeon Mumbai",
    schemaType: "Physician",
  },
  "/about/": {
    title: "Dr. Mudit Khanna | Hip & Knee Replacement Surgeon",
    description:
      "Meet Dr. Mudit Khanna, a fellowship-trained hip and knee replacement and arthroscopy specialist with international training and over 18 years of orthopaedic experience.",
    keywords:
      "Dr Mudit Khanna, Mudit Khanna orthopaedic surgeon, hip and knee surgeon Mumbai, joint replacement specialist, arthroscopy specialist",
    schemaType: "Physician",
  },
  "/hip-replacement/": {
    title: "Hip Replacement Surgeon in Mumbai | Dr. Mudit Khanna",
    description:
      "Explore hip replacement options with Dr. Mudit Khanna, including Direct Anterior Approach, robotic-assisted planning and complex or revision hip replacement.",
    keywords:
      "hip replacement surgeon in Mumbai, anterior hip replacement Mumbai, direct anterior approach hip replacement, robotic hip replacement Mumbai, revision hip replacement",
    schemaType: "MedicalWebPage",
  },
  "/knee-replacement/": {
    title: "Knee Replacement Surgeon in Mumbai | Dr. Mudit Khanna",
    description:
      "Learn about total, partial and robotic-assisted knee replacement, minimally invasive techniques and enhanced recovery with Dr. Mudit Khanna.",
    keywords:
      "knee replacement surgeon in Mumbai, robotic knee replacement Mumbai, partial knee replacement Mumbai, total knee replacement Mumbai, knee osteoarthritis treatment",
    schemaType: "MedicalWebPage",
  },
  "/regenerative-treatment/": {
    title: "Regenerative Joint Treatment in Mumbai | Dr. Mudit Khanna",
    description:
      "Explore joint-preserving care, PRP and other regenerative treatment options based on your condition, diagnosis and treatment goals.",
    keywords:
      "regenerative treatment in Mumbai, PRP treatment Mumbai, joint preservation Mumbai, PRP for knee pain, non-surgical joint treatment",
    schemaType: "MedicalWebPage",
  },
  "/pain-management/": {
    title: "Joint Pain Management in Mumbai | Dr. Mudit Khanna",
    description:
      "Understand personalised options for joint pain, including non-surgical treatment, image-guided injections and enhanced recovery planning.",
    keywords:
      "joint pain treatment in Mumbai, knee pain treatment Mumbai, hip pain treatment Mumbai, non-surgical joint pain treatment, image-guided injections",
    schemaType: "MedicalWebPage",
  },
  "/insights/": {
    title: "Hip & Knee Replacement Insights | Dr. Mudit Khanna",
    description:
      "Practical guidance on hip and knee replacement, recovery, treatment choices and common patient questions from Dr. Mudit Khanna.",
    keywords:
      "hip and knee replacement insights, knee replacement advice, hip replacement advice, robotic knee replacement, joint replacement recovery",
    schemaType: "CollectionPage",
  },
  "/patient-stories/": {
    title: "Patient Stories | Dr. Mudit Khanna",
    description:
      "Read patient experiences of hip and knee replacement care, including patients who travelled to Mumbai from New Zealand and Myanmar.",
    keywords:
      "Dr Mudit Khanna patient stories, hip replacement patient stories, knee replacement patient stories, medical travel to India, international patients Mumbai",
    schemaType: "CollectionPage",
  },
  "/contact/": {
    title: "Contact Dr. Mudit Khanna | Joint Replacement Surgeon Mumbai",
    description:
      "Book a consultation with Dr. Mudit Khanna at Wockhardt Hospital, Mumbai Central for hip, knee and joint replacement care or a second opinion.",
    keywords:
      "Dr Mudit Khanna appointment Mumbai, joint replacement consultation Mumbai, knee replacement consultation, hip replacement consultation, second opinion orthopaedic Mumbai",
    schemaType: "ContactPage",
  },
  "/insights/too-young-for-knee-replacementwhat-surgeons-actually-consider/": {
    title: "Too Young for Knee Replacement? What Surgeons Consider",
    description:
      "Understand how surgeons assess whether knee replacement is appropriate when age, symptoms, joint damage and treatment goals all matter.",
    keywords:
      "knee replacement age, too young for knee replacement, knee replacement in younger patients, knee replacement eligibility",
    schemaType: "Article",
  },
  "/insights/the-hidden-cost-of-waitingtoo-long-for-knee-replacement/": {
    title: "When Should You Consider Knee Replacement? | Dr. Mudit Khanna",
    description:
      "Learn what may happen when severe knee symptoms persist and when it may be time to discuss knee replacement with a specialist.",
    keywords:
      "when to consider knee replacement, when is knee replacement needed, knee replacement symptoms, delaying knee replacement",
    schemaType: "Article",
  },
  "/insights/hello-world/": {
    title: "Partial vs Total Knee Replacement: Which Is Right for You?",
    description:
      "Understand the difference between partial and total knee replacement and how surgeons decide which option may suit an individual knee.",
    keywords:
      "partial vs total knee replacement, partial knee replacement Mumbai, total knee replacement Mumbai, unicondylar knee replacement",
    schemaType: "Article",
  },
};

export const getStaticSeo = pathname => {
  const normalizedPath = pathname?.endsWith("/")
    ? pathname
    : `${pathname || "/"}/`;

  return seoByPath[normalizedPath];
};

