"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Table, Calculator } from "lucide-react";
import "katex/dist/katex.min.css";

// Sample lesson content showcasing various markdown features
const sampleLessons = {
  physics: `# Physics: Understanding Motion and Forces

## Introduction to Kinematics

Motion is one of the fundamental concepts in physics. In this lesson, we'll explore the basic principles of kinematics and how objects move through space and time.

### Key Concepts

- **Displacement**: The change in position of an object
- **Velocity**: The rate of change of displacement
- **Acceleration**: The rate of change of velocity

## Mathematical Foundations

The relationship between position, velocity, and acceleration can be expressed through calculus:

$$v = \\frac{dx}{dt}$$

$$a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}$$

### Kinematic Equations

For constant acceleration, we have the following equations:

| Equation | Variables | Use Case |
|----------|-----------|----------|
| $v = v_0 + at$ | Initial velocity, acceleration, time | Finding final velocity |
| $x = x_0 + v_0t + \\frac{1}{2}at^2$ | Position, initial velocity, acceleration | Finding displacement |
| $v^2 = v_0^2 + 2a(x - x_0)$ | Velocities, acceleration, displacement | When time is unknown |

## Example Problem

> **Problem**: A car accelerates from rest at 2 m/s² for 5 seconds. What is its final velocity and displacement?

**Solution:**

Given:
- Initial velocity: $v_0 = 0$ m/s
- Acceleration: $a = 2$ m/s²
- Time: $t = 5$ s

Using the kinematic equations:

Final velocity: $v = v_0 + at = 0 + (2)(5) = 10$ m/s

Displacement: $x = v_0t + \\frac{1}{2}at^2 = 0 + \\frac{1}{2}(2)(5^2) = 25$ m

## Code Simulation

Here's a simple Python simulation of the motion:

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Parameters
v0 = 0  # Initial velocity (m/s)
a = 2   # Acceleration (m/s²)
t_max = 5  # Maximum time (s)

# Time array
t = np.linspace(0, t_max, 100)

# Calculate position and velocity
x = v0 * t + 0.5 * a * t**2
v = v0 + a * t

# Plot results
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(t, x, 'b-', linewidth=2)
plt.xlabel('Time (s)')
plt.ylabel('Position (m)')
plt.title('Position vs Time')
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(t, v, 'r-', linewidth=2)
plt.xlabel('Time (s)')
plt.ylabel('Velocity (m/s)')
plt.title('Velocity vs Time')
plt.grid(True)

plt.tight_layout()
plt.show()
\`\`\`

## Summary

In this lesson, we covered:

1. Basic definitions of displacement, velocity, and acceleration
2. Mathematical relationships using calculus
3. Kinematic equations for constant acceleration
4. Practical problem-solving techniques

### Next Steps

- Practice more kinematic problems
- Explore motion in two dimensions
- Study forces and Newton's laws

---

*Remember: Physics is about understanding the world around us through mathematical models and experimental observation.*`,

  programming: `# Data Structures: Understanding Arrays and Linked Lists

## Introduction

Data structures are fundamental building blocks in computer science. They determine how we organize and store data to enable efficient access and modification.

### Learning Objectives

By the end of this lesson, you will:
- Understand the difference between arrays and linked lists
- Know when to use each data structure
- Implement basic operations for both structures

## Arrays

Arrays are contiguous blocks of memory that store elements of the same type.

### Characteristics

| Property | Value | Description |
|----------|-------|-------------|
| **Access Time** | O(1) | Direct access using index |
| **Search Time** | O(n) | Linear search required |
| **Insertion** | O(n) | May require shifting elements |
| **Deletion** | O(n) | May require shifting elements |

### Implementation Example

\`\`\`javascript
class DynamicArray {
    constructor() {
        this.data = [];
        this.size = 0;
    }
    
    // Access element at index
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        return this.data[index];
    }
    
    // Add element to end
    push(element) {
        this.data[this.size] = element;
        this.size++;
        return this.size;
    }
    
    // Remove element at index
    delete(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        
        // Shift elements left
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        
        this.size--;
        return this.data[index];
    }
}
\`\`\`

## Linked Lists

Linked lists consist of nodes where each node contains data and a reference to the next node.

### Node Structure

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def append(self, val):
        """Add element to end of list"""
        new_node = ListNode(val)
        
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        
        self.size += 1
    
    def prepend(self, val):
        """Add element to beginning of list"""
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def delete(self, val):
        """Delete first occurrence of value"""
        if not self.head:
            return False
        
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
\`\`\`

## Comparison

### Time Complexity Analysis

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Search | O(n) | O(n) |
| Insertion at beginning | O(n) | O(1) |
| Insertion at end | O(1)* | O(n) |
| Deletion at beginning | O(n) | O(1) |
| Deletion at end | O(1) | O(n) |

*Amortized time for dynamic arrays

### Memory Usage

Arrays have better **cache locality** due to contiguous memory allocation:

$$\\text{Memory Access Time} = \\text{Base Time} + \\text{Cache Miss Penalty}$$

> **Important**: Choose arrays when you need frequent random access. Choose linked lists when you need frequent insertions/deletions at the beginning.

## Practical Exercise

Try implementing a function that merges two sorted arrays:

\`\`\`java
public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
    int[] result = new int[arr1.length + arr2.length];
    int i = 0, j = 0, k = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result[k++] = arr1[i++];
        } else {
            result[k++] = arr2[j++];
        }
    }
    
    // Copy remaining elements
    while (i < arr1.length) {
        result[k++] = arr1[i++];
    }
    
    while (j < arr2.length) {
        result[k++] = arr2[j++];
    }
    
    return result;
}
\`\`\`

## Key Takeaways

1. **Arrays** excel at random access and have better cache performance
2. **Linked Lists** are efficient for frequent insertions/deletions
3. Consider your use case when choosing between them
4. Both have O(n) search time for unsorted data

### Further Reading

- Hash Tables for O(1) average search time
- Dynamic arrays vs. static arrays
- Doubly linked lists for bidirectional traversal`,

  chemistry: `# Organic Chemistry: Understanding Molecular Structure

## Introduction to Hydrocarbons

Hydrocarbons are organic compounds consisting entirely of hydrogen and carbon atoms. They form the backbone of organic chemistry and are essential in both biological systems and industrial applications.

### Classification of Hydrocarbons

Hydrocarbons can be classified into several categories:

1. **Alkanes** (saturated hydrocarbons)
2. **Alkenes** (unsaturated with double bonds)
3. **Alkynes** (unsaturated with triple bonds)
4. **Aromatic hydrocarbons** (containing benzene rings)

## Alkanes: The Foundation

Alkanes follow the general formula: $C_nH_{2n+2}$

### Common Alkanes

| Name | Formula | Structure | Boiling Point (°C) |
|------|---------|-----------|-------------------|
| Methane | CH₄ | Single carbon | -162 |
| Ethane | C₂H₆ | Two carbons | -89 |
| Propane | C₃H₈ | Three carbons | -42 |
| Butane | C₄H₁₀ | Four carbons | -1 |
| Pentane | C₅H₁₂ | Five carbons | 36 |

### Molecular Geometry

The carbon atoms in alkanes exhibit **tetrahedral geometry** with bond angles of approximately 109.5°.

> **Key Concept**: The tetrahedral arrangement minimizes electron pair repulsion according to VSEPR theory.

## Chemical Bonding

### Hybridization in Carbon

Carbon atoms in alkanes undergo **sp³ hybridization**:

$$\\text{Ground state: } 1s^2 2s^2 2p^2$$
$$\\text{Excited state: } 1s^2 2s^1 2p^3$$
$$\\text{Hybridized: } 1s^2 (sp^3)^4$$

This hybridization allows carbon to form four equivalent bonds.

### Bond Energies

The strength of C-H and C-C bonds affects molecular stability:

- C-H bond energy: ~413 kJ/mol
- C-C bond energy: ~347 kJ/mol

## Isomerism

Structural isomers have the same molecular formula but different arrangements of atoms.

### Example: Butane Isomers

\`\`\`
n-Butane (normal butane):
H₃C-CH₂-CH₂-CH₃

Isobutane (2-methylpropane):
    CH₃
    |
H₃C-CH-CH₃
\`\`\`

### Calculating Isomers

For alkanes, the number of possible isomers grows rapidly:

| Carbon Atoms | Number of Isomers |
|--------------|-------------------|
| 4 | 2 |
| 5 | 3 |
| 6 | 5 |
| 7 | 9 |
| 8 | 18 |
| 10 | 75 |

## Nomenclature Rules (IUPAC)

1. **Find the longest carbon chain** (parent chain)
2. **Number the chain** from the end nearest a substituent
3. **Name substituents** and indicate their positions
4. **List substituents alphabetically**

### Example Naming Process

\`\`\`
    CH₃
    |
CH₃-CH-CH₂-CH₂-CH₃
    |
    CH₃

Step 1: Longest chain = 5 carbons (pentane)
Step 2: Number from left: 1,2,3,4,5
Step 3: Two methyl groups at position 2
Step 4: Name = 2,2-dimethylpentane
\`\`\`

## Physical Properties

### Trends in Alkanes

The physical properties of alkanes show clear trends with molecular size:

$$\\text{Boiling Point} \\propto \\text{Molecular Weight}$$

This relationship exists due to increasing **van der Waals forces** between larger molecules.

### Solubility

Alkanes are **nonpolar** molecules and follow the principle:

> "Like dissolves like"

- Soluble in nonpolar solvents (hexane, benzene)
- Insoluble in polar solvents (water, ethanol)

## Chemical Reactions

### Combustion

Complete combustion of alkanes produces CO₂ and H₂O:

$$C_nH_{2n+2} + \\frac{3n+1}{2}O_2 \\rightarrow nCO_2 + (n+1)H_2O$$

**Example for methane:**
$$CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O \\quad \\Delta H = -890 \\text{ kJ/mol}$$

### Halogenation

Free radical substitution with halogens:

\`\`\`
Initiation:   Cl₂ → 2Cl• (under UV light)
Propagation:  CH₄ + Cl• → CH₃• + HCl
              CH₃• + Cl₂ → CH₃Cl + Cl•
Termination:  CH₃• + Cl• → CH₃Cl
\`\`\`

## Laboratory Analysis

### Spectroscopic Methods

1. **IR Spectroscopy**: C-H stretches around 2900-3000 cm⁻¹
2. **¹H NMR**: Chemical shifts for different carbon environments
3. **Mass Spectrometry**: Molecular ion peaks and fragmentation patterns

### Sample Calculation

Calculate the molecular formula for a hydrocarbon with:
- Molecular weight: 72 g/mol
- Contains only C and H

**Solution:**
Let the formula be CₓHᵧ

For alkanes: y = 2x + 2
Molecular weight: 12x + y = 72
Substituting: 12x + (2x + 2) = 72
14x + 2 = 72
14x = 70
x = 5

Therefore: C₅H₁₂ (pentane)

## Summary

Key points covered in this lesson:

- Alkanes are saturated hydrocarbons with sp³ hybridized carbons
- They exhibit tetrahedral geometry and follow CₙH₂ₙ₊₂ formula
- Isomerism increases dramatically with carbon chain length
- Physical properties correlate with molecular size
- Chemical reactions include combustion and halogenation

### Practice Problems

1. Draw all isomers of hexane (C₆H₁₄)
2. Name the compound: (CH₃)₃CCH₂CH(CH₃)₂
3. Calculate the heat released when 10g of propane burns completely

---

*Next lesson: Alkenes and addition reactions*`,
};

export default function MarkdownRenderer() {
  const [selectedLesson, setSelectedLesson] = useState("physics");

  const customComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    table({ children }: any) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300">
            {children}
          </table>
        </div>
      );
    },
    th({ children }: any) {
      return (
        <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
          {children}
        </th>
      );
    },
    td({ children }: any) {
      return <td className="border border-gray-300 px-4 py-2">{children}</td>;
    },
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic">
          {children}
        </blockquote>
      );
    },
    h1({ children }: any) {
      return (
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">
          {children}
        </h1>
      );
    },
    h2({ children }: any) {
      return (
        <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800">
          {children}
        </h2>
      );
    },
    h3({ children }: any) {
      return (
        <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-700">
          {children}
        </h3>
      );
    },
    p({ children }: any) {
      return <p className="mb-4 leading-relaxed text-gray-700">{children}</p>;
    },
    ul({ children }: any) {
      return (
        <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
          {children}
        </ul>
      );
    },
    ol({ children }: any) {
      return (
        <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">
          {children}
        </ol>
      );
    },
    li({ children }: any) {
      return <li className="mb-1">{children}</li>;
    },
    strong({ children }: any) {
      return (
        <strong className="font-semibold text-gray-900">{children}</strong>
      );
    },
    em({ children }: any) {
      return <em className="italic text-gray-800">{children}</em>;
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Interactive Lesson Renderer
            </CardTitle>
            <p className="text-gray-600">
              A comprehensive markdown renderer for educational content
              supporting code, mathematics, tables, and more.
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lesson Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedLesson === "physics" ? "primary" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedLesson("physics")}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Physics
                </Button>
                <Button
                  variant={
                    selectedLesson === "programming" ? "primary" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedLesson("programming")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Programming
                </Button>
                <Button
                  variant={
                    selectedLesson === "chemistry" ? "primary" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedLesson("chemistry")}
                >
                  <Table className="h-4 w-4 mr-2" />
                  Chemistry
                </Button>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Supported Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>✓ Syntax highlighted code blocks</li>
                  <li>✓ Mathematical equations (LaTeX)</li>
                  <li>✓ Tables with styling</li>
                  <li>✓ Blockquotes and callouts</li>
                  <li>✓ Lists and formatting</li>
                  <li>✓ Responsive design</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={customComponents}
                  >
                    {
                      sampleLessons[
                        selectedLesson as keyof typeof sampleLessons
                      ]
                    }
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
