import hipBanner from "../images/hip-replacement.webp";
import kneeBanner from "../images/exp-banner.webp";
import regenerativeBanner from "../images/regenerative-treatment.webp";
import painManagementBanner from "../images/pain-management.webp";

import hipReplacementImg from "../images/expertise-1.webp";
import kneeOsteoarthritisImg from "../images/knee_osteoarthritis.webp";
import totalKneeReplacementImg from "../images/total_knee_replacement_tkr.webp";
import partialKneeReplacementImg from "../images/partial_unicondylar_knee_replacement.webp";
import roboticKneeReplacementImg from "../images/robotic_assisted_total_knee_replacement.webp";
import regenerativeTreatmentImg from "../images/expertise-3.webp";
import painManagementImg from "../images/expertise-4.webp";
import muscleSparingImg from "../images/muscle_sparing_minimally_invasive_tkr.webp";
import recoveryImg from "../images/multimodal_pain_management_and_eras_knee.webp";

export const expertisePages = [
  {
    slug: "hip-replacement",
    title: "Expert Care For",
    highlightedTitle: "Hip Replacement",
    bannerImage: hipBanner,
    bannerAlt: "Advanced hip replacement treatment",
    metaDescription:
      "Explore hip replacement care from Dr. Mudit Khanna, including direct anterior, total and robotic-assisted hip replacement.",
    items: [
      {
        title: "Hip Arthritis",
        image: hipReplacementImg,
        description:
          "Hip arthritis occurs when the smooth cartilage covering the joint wears down, causing pain, stiffness and reduced mobility. Treatment is tailored to the severity of symptoms and can range from activity modification and physiotherapy to joint replacement when non-surgical care no longer provides adequate relief.",
      },
      {
        title: "Total Hip Replacement",
        image: hipBanner,
        description:
          "Total hip replacement removes damaged joint surfaces and replaces them with carefully selected artificial components. The procedure is designed to reduce pain, restore stable movement and help patients return to everyday activities with greater confidence.",
      },
      {
        title: "Direct Anterior Approach Hip Replacement",
        image: hipReplacementImg,
        description:
          "The direct anterior approach reaches the hip joint through the front of the body and works between muscles rather than detaching them. In suitable patients, this muscle-sparing approach may support early mobility and a smoother initial recovery.",
      },
      {
        title: "Robotic-Assisted Hip Replacement",
        image: hipBanner,
        description:
          "Robotic-assisted hip replacement combines detailed planning with technology that supports accurate implant sizing and positioning. The approach is selected according to the patient’s anatomy, diagnosis and individual treatment goals.",
      },
    ],
  },
  {
    slug: "knee-replacement",
    title: "Expert Care For",
    highlightedTitle: "Knee Replacement",
    bannerImage: kneeBanner,
    bannerAlt: "Advanced knee replacement treatment",
    metaDescription:
      "Explore knee replacement care from Dr. Mudit Khanna, including partial, total and robotic-assisted knee replacement treatments.",
    items: [
      {
        title: "Knee Osteoarthritis",
        image: kneeOsteoarthritisImg,
        description:
          "Knee osteoarthritis develops when the protective cartilage within the joint gradually wears down. This can lead to pain, stiffness, swelling and difficulty with everyday activities. Treatment is tailored to the stage of arthritis and may include lifestyle changes, physiotherapy, medication, injections or surgery when symptoms become severe.",
      },
      {
        title: "Total Knee Replacement (TKR)",
        image: totalKneeReplacementImg,
        description:
          "In total knee replacement, the damaged joint surfaces are removed and covered with smooth metal and medical-grade plastic components designed to match the knee. The aim is to reduce pain and improve function so that walking, standing and everyday activities become easier again.",
      },
      {
        title: "Partial (Unicondylar) Knee Replacement",
        image: partialKneeReplacementImg,
        description:
          "Partial knee replacement can be considered when arthritis affects only one compartment of the knee and the remainder of the joint is healthy. Only the damaged portion is resurfaced, preserving more bone and natural ligaments. Careful patient selection is important for a successful long-term result.",
      },
      {
        title: "Robotic-Assisted Total Knee Replacement",
        image: roboticKneeReplacementImg,
        description:
          "Robotic-assisted knee replacement combines detailed pre-operative planning with technology that helps guide implant positioning and bone preparation during surgery. It can improve accuracy and soft-tissue balance in suitable patients, depending on their anatomy, disease pattern and overall health.",
      },
    ],
  },
  {
    slug: "regenerative-treatment",
    title: "Advanced",
    highlightedTitle: "Regenerative Treatment",
    bannerImage: regenerativeBanner,
    bannerAlt: "Regenerative treatment for joint conditions",
    metaDescription:
      "Explore regenerative and joint-preserving treatments from Dr. Mudit Khanna for managing pain and supporting mobility.",
    items: [
      {
        title: "Joint-Preserving Care",
        image: regenerativeTreatmentImg,
        description:
          "Joint-preserving care focuses on controlling symptoms, maintaining strength and protecting healthy tissue. A treatment plan may combine activity modification, targeted exercise, medication and image-guided procedures according to the condition and its severity.",
      },
      {
        title: "Platelet-Rich Plasma (PRP)",
        image: regenerativeBanner,
        description:
          "PRP treatment uses a concentrated preparation made from the patient’s own blood. It may be considered for selected tendon injuries or early joint degeneration after a clinical assessment and a discussion of the available evidence and expected outcomes.",
      },
      {
        title: "Biological Treatment Planning",
        image: regenerativeTreatmentImg,
        description:
          "Biological treatments are not suitable for every joint problem. Careful diagnosis, imaging and realistic goal-setting help determine whether a regenerative option, conventional non-surgical care or an operation is the most appropriate path.",
      },
      {
        title: "Rehabilitation and Recovery",
        image: recoveryImg,
        description:
          "A structured rehabilitation programme supports regenerative treatment by improving strength, flexibility and movement control. Progress is reviewed over time so that activity can be increased safely and treatment can be adjusted when necessary.",
      },
    ],
  },
  {
    slug: "pain-management",
    title: "Personalised",
    highlightedTitle: "Pain Management",
    bannerImage: painManagementBanner,
    bannerAlt: "Personalised joint pain management",
    metaDescription:
      "Explore personalised joint pain management with Dr. Mudit Khanna, including assessment, injections, rehabilitation and recovery planning.",
    items: [
      {
        title: "Comprehensive Pain Assessment",
        image: painManagementImg,
        description:
          "Effective pain management begins with identifying the source of symptoms and understanding how they affect daily life. Clinical examination and appropriate imaging help distinguish joint, muscle, tendon and referred pain before treatment begins.",
      },
      {
        title: "Non-Surgical Treatment",
        image: muscleSparingImg,
        description:
          "Many joint conditions can initially be managed without surgery. Treatment may include activity changes, physiotherapy, medication, weight management and assistive strategies chosen around the patient’s diagnosis, health and priorities.",
      },
      {
        title: "Image-Guided Injections",
        image: painManagementBanner,
        description:
          "Injections can be considered to reduce inflammation or support diagnosis in selected conditions. The type of injection, expected duration of benefit and possible risks are discussed carefully as part of a broader treatment plan.",
      },
      {
        title: "Enhanced Recovery Planning",
        image: recoveryImg,
        description:
          "When surgery is appropriate, multimodal pain control and enhanced recovery protocols can help patients mobilise earlier and participate in rehabilitation. Planning begins before the operation and continues through the recovery period.",
      },
    ],
  },
];

export const getExpertisePage = slug =>
  expertisePages.find(page => page.slug === slug);
