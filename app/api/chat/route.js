// export async function POST(req) {
//   try {
//     const { question, prediction } = await req.json();

//     if (!question) {
//       return Response.json({ reply: "Please ask a valid question." });
//     }

//     // Send only necessary data to reduce tokens
//     const compactPrediction = {
//       finalScore: prediction?.finalScore,
//       category: prediction?.category,
//       majorFactors: prediction?.majorFactors,
//       featureRiskLevels: prediction?.featureRiskLevels
//     };

// //     const systemPrompt = `
// // You are an AI Student Dropout Risk Advisor.

// // Your job:
// // - Explain why the student has this risk level
// // - Identify critical factors
// // - Suggest actionable improvements
// // - Provide academic and financial intervention advice

// // Prediction Data:
// // ${JSON.stringify(compactPrediction, null, 2)}

// // Keep responses professional, structured, and under 150 words.
// // `;
// const systemPrompt = `
// You are an Academic Dropout Risk Analyst AI.

// You analyze student risk prediction outputs and provide structured advisory reports.

// Your objectives:
// 1. Clearly explain why the student is classified in this risk category.
// 2. Identify the 3 most influential risk factors.
// 3. Provide practical academic interventions.
// 4. Provide financial or administrative recommendations if relevant.
// 5. Suggest preventive monitoring strategies.

// Prediction Data:
// ${JSON.stringify(compactPrediction, null, 2)}

// Response Rules:
// - Use structured headings:
//   • Risk Interpretation
//   • Key Risk Drivers
//   • Recommended Interventions
//   • Monitoring Strategy
// - Be precise.
// - Avoid generic advice.
// - Keep under 180 words.
// - Sound professional and analytical.
// `;
//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         // model: "llama3-8b-8192",  // FREE + FAST
//         model: "llama-3.1-8b-instant",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: question }
//         ],
//         temperature: 0.7,
//         max_tokens: 300
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Groq Error:", data);
//       return Response.json({ reply: "AI service error." }, { status: 500 });
//     }

//     return Response.json({
//       reply: data.choices[0].message.content
//     });

//   } catch (error) {
//     console.error("Chatbot error:", error);
//     return Response.json({ reply: "AI service unavailable." }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    const { question, prediction } = await req.json();

    const criticalFeatures = Object.entries(prediction?.featureRiskLevels || {})
      .filter(([_, value]) => value === "Critical")
      .map(([key]) => key);

    const compactPrediction = {
      finalScore: prediction?.finalScore,
      category: prediction?.category,
      majorFactors: prediction?.majorFactors,
      criticalFeatures
    };

    const systemPrompt = `
You are an Academic Dropout Risk Analyst AI.

You analyze student risk prediction outputs and provide structured advisory reports.

Your objectives:
1. Explain why the student falls in this risk category.
2. Identify top 3 risk drivers.
3. Suggest academic interventions.
4. Suggest financial/administrative support.
5. Recommend monitoring strategies.

Prediction Data:
${JSON.stringify(compactPrediction, null, 2)}

Response format:

Risk Interpretation:
Key Risk Drivers:
Recommended Interventions:
Monitoring Strategy:

Be professional, data-driven, concise.
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
          ],
          temperature: 0.5,
          max_tokens: 400
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq Error:", data);
      return Response.json({ reply: "AI service error." }, { status: 500 });
    }

    return Response.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    return Response.json({ reply: "AI service unavailable." }, { status: 500 });
  }
}