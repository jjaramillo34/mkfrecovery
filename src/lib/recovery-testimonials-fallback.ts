import type { RecoveryTestimonial } from "@/lib/recovery-testimonial-types";

/** Shown when no published testimonials exist in the database yet. */
export const recoveryTestimonialsFallback: RecoveryTestimonial[] = [
  {
    id: "annie-g",
    heading: "A voice from recovery",
    paragraphs: [
      "Working with MKF was truly life-changing. From the start, I experienced compassion, professionalism, and genuine care unlike anywhere else in my recovery journey.",
      "The facility was calm, clean, and welcoming, creating a safe space where I could focus and open up. The staff took the time to understand my personal struggles and tailored my treatment to meet my needs. Their programs addressed both addiction and its underlying causes, helping me build healthier habits and long-term coping strategies.",
      "MKF gave me hope when I had none and helped me rebuild my confidence. I am in a much better place today because of their support. I highly recommend MKF—especially the Florida facility—to anyone seeking real, lasting recovery.",
    ],
    name: "Annie G",
    location: "Queens, NY",
  },
  {
    id: "kerrie-mchugh",
    heading: "From struggle to strength",
    paragraphs: [
      "My struggle with drug and alcohol addiction began at a young age. From the very first time I used, it became clear that substances would have a powerful hold on my life.",
      "Over the years, I tried again and again to change, only to fall back into the same destructive patterns. The pain of wanting so badly to get better—but feeling completely unable to do it on my own—was unbearable. Eventually, I felt stuck and started to believe this was simply how my life would always be.",
      "MKF never let me give up on myself. They saw something in me that I could not see, and at first, all they asked was that I show up. Reluctantly, I did. They listened, educated me about addiction, and stood by me even on the days I resisted help. Because of their guidance, honesty, and persistence, I began to believe that a different life was possible. MKF did not just help me survive my hardest moments—they helped me rebuild who I am.",
    ],
    name: "Kerrie McHugh",
    location: "Queens, NY",
  },
  {
    id: "daniel-r",
    heading: "A fresh start I never thought possible",
    paragraphs: [
      "Before MKF, I had reached a point where I felt exhausted, defeated, and disconnected from the person I used to be. I knew I needed help, but I was terrified of starting over.",
      "From the moment I arrived, the team treated me with dignity and respect. They created an environment where I felt safe enough to be honest about my addiction, my fears, and the damage I had caused in my life. The support I received was not one-size-fits-all—it was personal, consistent, and focused on helping me understand the deeper issues behind my substance use.",
      "Because of MKF, I have tools, structure, and hope for the future. Recovery is still a journey, but today I face it with clarity and confidence. I am deeply grateful for the care I received and would recommend MKF to anyone ready to take the first step toward lasting change.",
    ],
    name: "Daniel R",
    location: "Brooklyn, NY",
  },
  {
    id: "marisol-t",
    heading: "Real support when I needed it most",
    paragraphs: [
      "I came to MKF feeling broken, ashamed, and unsure whether recovery was even possible for me. I had been through difficult experiences before, but this was the first place where I truly felt seen as a person and not just my addiction.",
      "The staff brought compassion, patience, and accountability to every part of my treatment. They helped me slow down, face the underlying causes of my addiction, and begin building healthier patterns one day at a time. The environment was welcoming and structured, which gave me the stability I needed to start trusting the process.",
      "MKF helped me find hope again. I left stronger, more grounded, and better prepared for the challenges ahead. What I found there was more than treatment—it was a foundation for a new life.",
    ],
    name: "Marisol T",
    location: "Bronx, NY",
  },
];
