// ==============================================
// GLOBAL EDTECH SAT FEEDBACK ENGINE
// ==============================================

function getSATFeedback(rawScore, totalScore) {
    // Calculate percentage
    let percentage = (rawScore / totalScore) * 100;
    let level = '';
    let feedbackData = {};

    // Determine performance level
    if (percentage < 50) {
        level = 'LOW';
        feedbackData = {
            title: "You're Just Getting Started",
            strengths: [
                "You understand some of the main ideas in the passages.",
                "You try to use the text to find answers, even if you miss the right lines.",
                "You recognize basic grammar rules like simple punctuation and subject-verb agreement."
            ],
            improvements: [
                "You often choose evidence that doesn't match the answer.",
                "You struggle with vocabulary in context (words change meaning depending on tone).",
                "Your sentences sometimes feel unclear or confusing.",
                "You guess too quickly instead of slowing down and thinking about the author's purpose."
            ],
            prompts: [
                "Which line in the passage PROVES my answer?",
                "Does this word fit the mood of the sentence?",
                "Is this sentence placed where it makes the most sense?",
                "What is the author trying to do here - explain, argue, or describe?"
            ],
            snapshot: {
                accuracy: "20-45%",
                evidence: "Weak",
                vocabulary: "Weak",
                clarity: "Weak",
                grammar: "Weak"
            },
            recommendations: [
                "Focus on one skill at a time (evidence, tone, transitions, grammar).",
                "Practice short drills instead of full tests.",
                "Keep a 'mistake notebook' to track repeated errors.",
                "Build confidence by mastering small skills before big ones."
            ]
        };
    } else if (percentage < 80) {
        level = 'MID';
        feedbackData = {
            title: "You're On the Right Track",
            strengths: [
                "You understand most main ideas and details.",
                "You handle common grammar rules well.",
                "You choose correct evidence when it's clearly stated."
            ],
            improvements: [
                "You sometimes miss implied meaning (reading between the lines).",
                "Advanced grammar rules (modifiers, parallel structure) still cause mistakes.",
                "You struggle with choosing the BEST transition or sentence placement.",
                "You rush near the end of the test."
            ],
            prompts: [
                "What is the author hinting at?",
                "Does this sentence make the paragraph clearer?",
                "What type of transition fits here — contrast, cause, or addition?",
                "Should I skip this question and come back later?"
            ],
            snapshot: {
                accuracy: "50-75%",
                evidence: "Moderate",
                vocabulary: "Moderate",
                clarity: "Moderate",
                grammar: "Moderate"
            },
            recommendations: [
                "Mix easy and hard questions in practice to build flexibility.",
                "Do timed sections to improve pacing.",
                "Sort mistakes into categories (careless, misunderstood, misread).",
                "Strengthen advanced grammar and transitions."
            ]
        };
    } else {
        level = 'HIGH';
        feedbackData = {
            title: "You're Close to Perfect",
            strengths: [
                "You understand tone, attitude, and deeper meaning in passages.",
                "You use grammar rules accurately and consistently.",
                "You make strong choices with transitions and sentence placement."
            ],
            improvements: [
                "You sometimes rush and make small mistakes.",
                "You occasionally pick evidence that is 'almost right' instead of perfect.",
                "You rarely misread subtle tone shifts - but it still happens."
            ],
            prompts: [
                "Is this the BEST evidence, or just a good one?",
                "Did I double-check every step?",
                "What exact tone is the author using - neutral, critical, or supportive?"
            ],
            snapshot: {
                accuracy: "80-100%",
                evidence: "Strong",
                vocabulary: "Strong",
                clarity: "Strong",
                grammar: "Strong"
            },
            recommendations: [
                "Take full timed practice tests to simulate the real exam.",
                "Focus on eliminating the last few errors.",
                "Practice the hardest passages (science, humanities, paired texts).",
                "Build a test-day strategy: pacing, skipping, confidence control."
            ]
        };
    }

    // Build the HTML for the feedback box
    let html = `
        <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 16px; padding: 24px; margin-top: 30px;">
            <div style="background: #2a7de1; color: white; padding: 10px 20px; border-radius: 50px; display: inline-block; margin-bottom: 20px;">
                <strong>Performance Level: ${feedbackData.title}</strong>
            </div>

            <h3 style="color: #333; margin-bottom: 15px;">Points of Strength</h3>
            <ul style="color: #555; margin-bottom: 20px; padding-left: 20px;">
                ${feedbackData.strengths.map(s => '<li style="margin-bottom: 5px;">' + s + '</li>').join('')}
            </ul>

            <h3 style="color: #333; margin-bottom: 15px;">Points to Improve</h3>
            <ul style="color: #555; margin-bottom: 20px; padding-left: 20px;">
                ${feedbackData.improvements.map(s => '<li style="margin-bottom: 5px;">' + s + '</li>').join('')}
            </ul>

            <h3 style="color: #333; margin-bottom: 15px;">Prompts to Help You Improve</h3>
            <ul style="color: #555; margin-bottom: 20px; padding-left: 20px;">
                ${feedbackData.prompts.map(s => '<li style="margin-bottom: 5px; font-style: italic;">' + s + '</li>').join('')}
            </ul>

            <h3 style="color: #333; margin-bottom: 15px;">Performance Snapshot</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 20px;">
                <div style="background: #f0f4fe; padding: 10px; border-radius: 8px; text-align: center;"><strong>Accuracy:</strong> ${feedbackData.snapshot.accuracy}</div>
                <div style="background: #f0f4fe; padding: 10px; border-radius: 8px; text-align: center;"><strong>Evidence:</strong> ${feedbackData.snapshot.evidence}</div>
                <div style="background: #f0f4fe; padding: 10px; border-radius: 8px; text-align: center;"><strong>Vocabulary:</strong> ${feedbackData.snapshot.vocabulary}</div>
                <div style="background: #f0f4fe; padding: 10px; border-radius: 8px; text-align: center;"><strong>Clarity:</strong> ${feedbackData.snapshot.clarity}</div>
                <div style="background: #f0f4fe; padding: 10px; border-radius: 8px; text-align: center;"><strong>Grammar:</strong> ${feedbackData.snapshot.grammar}</div>
            </div>

            <h3 style="color: #333; margin-bottom: 15px;">Recommendations</h3>
            <ul style="color: #555; padding-left: 20px;">
                ${feedbackData.recommendations.map(s => '<li style="margin-bottom: 5px;">' + s + '</li>').join('')}
            </ul>
        </div>
    `;
    
    return html;
}

// Expose to global scope
window.getSATFeedback = getSATFeedback;