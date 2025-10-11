import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils"; // merge Tailwind classes


const markdownContent = `
# The Landscape of Choice

*A practical map for navigating the illusion that you actually have any agency at all.*

[▶️ Lesson video — Landscape of Choice](https://assets.tailwindcss.com/templates/compass/landscape-of-choice.mp4)

---

## Dismantling The Illusion

You wake up each morning under the charming delusion that you're about to make a series of choices. What to wear, what to eat, whether to call in sick or drag yourself to work. But you don't actually make choices — you merely observe the outcomes of a series of predetermined processes that have been set in motion long before you even opened your eyes.

What if I told you that this comforting notion that you're the author of your life story is an elaborate fiction your consciousness tells itself? Not in some abstract philosophical sense, but in a very literal, neurologically demonstrable way.

![Perceived Options — light](https://assets.tailwindcss.com/templates/compass/perceived-options.light.png)  
![Perceived Options — dark](https://assets.tailwindcss.com/templates/compass/perceived-options.dark.png)

---

### The Deterministic Reality

Consider a simple function that doubles a number:

\`\`\`js
function double(x) {
  return x * 2;
}
\`\`\`

This function is deterministic which means it will always return the same output for the same input. If you pass in \`2\`, it will always return \`4\`. The output is entirely *determined* by the input.

You are the same way. Your choices are simply the outputs of a complex function that takes in your genetic makeup, past experiences, and current circumstances as inputs. You will always produce the same output for the same input.

The only reason you think you have a choice is because the function is so complex that you can't see all the inputs. In reality, it's many functions chained together, each one feeding into the next.

\`\`\`js
function processA(input) {
  return input * 3 + 2;
}

function processB(input) {
  return input / 2 - 1;
}

function processC(input) {
  return Math.pow(input, 2);
}

function calculateResult(startingValue) {
  const resultA = processA(startingValue);
  const resultB = processB(resultA);
  const resultC = processC(resultB);
  return resultC;
}

console.log(calculateResult(4)); // Always 100
\`\`\`

If you could run your life again from the beginning, every single thing would happen the same way.

---

## Understanding Your Decision Space

![Decision Landscape — light](https://assets.tailwindcss.com/templates/compass/maze.light.png)  
![Decision Landscape — dark](https://assets.tailwindcss.com/templates/compass/maze.dark.png)

Your decisions are shaped by:

1. **Biological Imperatives** — genetic algorithms quietly deciding your preferences.
2. **Environmental Conditioning** — upbringing steering you to certain outcomes.
3. **Psychological Patterns** — recurring mental loops mistaken for choice.
4. **Social Pressures** — influence from other predetermined beings.
5. **Resource Constraints** — limits narrowing "choices" to inevitability.

---

Here’s a beginner-friendly guide to the major parts of the human body and what they do. Think of the body as a team of specialized parts that work together to keep you alive, moving, and feeling well.

Skeletal System
- What it includes: Bones, joints, cartilage.
- What it does: Provides shape and support, protects organs (skull for brain, rib cage for heart and lungs), helps you move with joints, stores minerals (like calcium), and makes blood cells in bone marrow.
- Why it matters: Without bones to hold you up and protect organs, you couldn’t stand, walk, or stay healthy.

Muscular System
- What it includes: Muscles (skeletal muscles you control, plus smooth muscles in organs and the heart).
- What it does: Lets you move, stand upright, and keep your posture. Muscles also generate heat to keep you warm.
- Why it matters: Muscles power nearly every movement you make, from walking to smiling.

Nervous System
- What it includes: Brain, spinal cord, and peripheral nerves.
- What it does: Controls and coordinates everything you do—thinking, sensing, moving, breathing, and reacting to your environment.
- Why it matters: This system acts like the body’s command center and communication network.

Circulatory System
- What it includes: Heart, blood vessels (arteries, veins, capillaries), and blood.
- What it does: Pumps blood to all parts of the body, delivering oxygen and nutrients and carrying away waste.
- Why it matters: Your organs need oxygen and nutrients to work, and waste removal keeps you healthy.

Respiratory System
- What it includes: Lungs, airways (trachea, bronchi), diaphragm.
- What it does: Brings oxygen into the body and removes carbon dioxide.
- Why it matters: Oxygen is essential for energy; without it, cells can’t do their jobs.

Digestive System
- What it includes: Mouth, esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder.
- What it does: Breaks down food into nutrients the body uses for energy, growth, and repair; waste is eliminated.
- Why it matters: This system turns what you eat into usable fuel and building blocks for your body.

Excretory (Urinary) System
- What it includes: Kidneys, ureters, bladder, urethra.
- What it does: Filters blood to remove waste and extra water; helps balance body fluids and minerals.
- Why it matters: Keeps your internal environment clean and steady.

Integumentary System
- What it includes: Skin, hair, nails, and associated glands.
- What it does: Protects your body from injury and infection, regulates temperature, senses touch, and helps make vitamin D.
- Why it matters: It’s the body's first line of defense with many roles in protection and sensation.

Endocrine System
- What it includes: Glands such as the pituitary, thyroid, adrenal, pancreas, and ovaries/testes.
- What it does: Produces hormones that regulate growth, metabolism, mood, reproduction, and more.
- Why it matters: Hormones act as chemical messengers; they help coordinate long-term processes in the body.

Lymphatic/Immune System
- What it includes: Lymph nodes, spleen, thymus, tonsils, white blood cells.
- What it does: Defends against infection, helps remove excess fluid, and supports overall immune function.
- Why it matters: Keeps you healthy by fighting germs and monitoring for trouble.

Reproductive System
- What it includes: Ovaries, uterus, fallopian tubes, vagina (female); testes, penis, vas deferens, etc. (male); plus related organs and hormones in both.        
- What it does: Produces offspring and hormones that influence development and secondary sexual characteristics.
- Why it matters: Reproduction is a natural part of life, and hormones from this system affect many other body functions.

How the systems fit together
- The systems work as a coordinated team. For example:
  - Lungs bring in oxygen; the circulatory system carries it to every cell; the nervous system helps regulate breathing rate.
  - The digestive system feeds the body with nutrients; the circulatory system transports those nutrients; the endocrine system helps regulate digestion and metabolism.
  - The immune and lymphatic systems defend against invaders while the circulatory system helps distribute immune cells.

Quick wellness reminders for beginners
- Eat a varied diet with fruits, vegetables, whole grains, proteins, and healthy fats.
- Stay hydrated and get enough sleep.
- Move regularly to keep bones, muscles, and the heart healthy.
- Practice good hygiene and regular check-ups.

Visual aid (optional)
- Visual aid: A simple diagram showing the major body systems and some of their key organs can help you see how they connect. Image: https://assets.tailwindcss.com/templates/compass/maze.light.png
- If you’d like, I can tailor a printable one-page diagram or a labeled diagram focusing on just the systems you’re most interested in.

Key takeaways
- The body is made of several major systems, each with specific organs and jobs.
- Systems work together to keep you alive, healthy, and capable of daily activities.
- Understanding the basics helps you appreciate how healthy habits support every part of your body.

## The Myth of Free Will

![Neurological Proof — light](https://assets.tailwindcss.com/templates/compass/libet.light.png)  
![Neurological Proof — dark](https://assets.tailwindcss.com/templates/compass/libet.dark.png)

Your brain makes decisions before you are even aware of them. Neuroscience shows your conscious mind is simply informed afterward.

---

## Practical Implications

### Liberation Through Understanding

1. **Self-Blame Dissolves**
2. **Anxiety Reduces**
3. **Compassion Increases**
4. **Action Simplifies**

### Moving Through the Landscape

- Observe your patterns like an anthropologist.
- Accept tendencies as natural laws.
- Flow forward like water downhill.

---

## The Path Forward

### Embracing Determinism

- Accept your path as carved long ago.
- Release the burden of control.
- Watch your life unfold with curiosity.

### Next Steps

Next: [The Paradox of Agency](./paradox-of-agency)
`;

export default function LessonMarkdown() {
  return (
    <div className="max-w-5xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, children, className, ...props }) => (
            <h1
              className={cn("mt-6 mb-2 font-semibold text-3xl", className)}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ node, children, className, ...props }) => (
            <h2
              className={cn("mt-6 mb-2 font-semibold text-2xl", className)}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ node, children, className, ...props }) => (
            <h3
              className={cn("mt-4 mb-2 font-semibold text-xl", className)}
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ node, children, className, ...props }) => (
            <p className={cn("mb-4 leading-7", className)} {...props}>
              {children}
            </p>
          ),
          strong: ({ node, children, className, ...props }) => (
            <span className={cn("font-semibold", className)} {...props}>
              {children}
            </span>
          ),
          a: ({ node, children, className, ...props }) => (
            <a
              className={cn("font-medium text-primary underline", className)}
              rel="noreferrer"
              target="_blank"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ node, children, className, ...props }) => (
            <ul
              className={cn("list-disc list-inside mb-4", className)}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ node, children, className, ...props }) => (
            <ol
              className={cn("list-decimal list-inside mb-4", className)}
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ node, children, className, ...props }) => (
            <li className={cn("mb-1", className)} {...props}>
              {children}
            </li>
          ),
          img: ({ node, ...props }) => (
            <img
              className="my-4 rounded-lg border border-gray-200"
              alt=""
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            return (
              <code
                className={cn("bg-gray-100 px-1 rounded", className)}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
