// ==============================================
// ORIGINAL GLOBAL EDTECH LISTENING DATA - EXAM 2
// ==============================================

const newListeningQuestions2 = {
    // SECTION 1 - Swimming Course Enquiry
    section1: {
        title: "Weekend Swimming Course Enquiry",
        instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
        audio: "section1.mp3",
        questions: [
            { id: 1, type: "note", label: "Course start date:", answer: "7 May", placeholder: "______" },
            { id: 2, type: "note", label: "Course location: ______ pool", answer: "training", placeholder: "______" },
            { id: 3, type: "note", label: "Maximum participants:", answer: "12", placeholder: "______" },
            { id: 4, type: "note", label: "Fee includes training fins and a waterproof ______", answer: "cap", placeholder: "______" },
            { id: 5, type: "note", label: "Participants must bring their own ______", answer: "towel", placeholder: "______" },
            { id: 6, type: "note", label: "Course starts at ______ a.m.", answer: "8:45", placeholder: "______" },
            { id: 7, type: "note", label: "Break time is at ______", answer: "10:20", placeholder: "______" },
            { id: 8, type: "note", label: "Outdoor activity takes place in the ______ Garden", answer: "Courtyard", placeholder: "______" },
            { id: 9, type: "note", label: "Instructor's surname:", answer: "Linton", placeholder: "______" },
            { id: 10, type: "note", label: "Certificates sent within ______ days", answer: "four", placeholder: "______" }
        ]
    },

    // SECTION 2 - Part 1 (Multiple Choice)
    section2_part1: {
        title: "Overview of the New Exhibition Hall",
        instruction: "Choose the correct letter A, B, or C.",
        audio: "section2.mp3",
        questions: [
            { id: 11, type: "mc", q: "The new exhibition hall is located on the", options: ["Ground floor", "Upper floor", "Basement"], answer: "B" },
            { id: 12, type: "mc", q: "The guided tour lasts", options: ["30 minutes", "45 minutes", "60 minutes"], answer: "B" },
            { id: 13, type: "mc", q: "The interactive zone is mainly used by", options: ["Families with children", "University students", "Tour groups"], answer: "A" },
            { id: 14, type: "mc", q: "Photography is allowed in areas marked with", options: ["Red signs", "Yellow signs", "Blue signs"], answer: "C" },
            { id: 15, type: "mc", q: "The coordinator suggests visitors", options: ["Avoid the Sculpture Court", "Arrive on time for tours", "Bring their own guidebooks"], answer: "B" }
        ]
    },

    // SECTION 2 - Part 2 (Map)
    section2_part2: {
        title: "Exhibition Hall - Map Description",
        instruction: "Label the map. Choose the correct letter A-G.",
        audio: "section2.mp3",
        image: "https://res.cloudinary.com/elyetdsl/image/upload/v1788425655/ielts2_section2_16_20_map.jpg",
        questions: [
            { id: 16, label: "Information Desk", answer: "B" },
            { id: 17, label: "Ancient Civilizations Gallery", answer: "E" },
            { id: 18, label: "Sculpture Court", answer: "A" },
            { id: 19, label: "Interactive Zone", answer: "G" },
            { id: 20, label: "Rest Area", answer: "D" }
        ]
    },

    // SECTION 3 - Part 1 (Multiple Choice)
    section3_part1: {
        title: "Group Presentation Progress Meeting",
        instruction: "Choose the correct letter A, B, or C.",
        audio: "section3.mp3",
        questions: [
            { id: 21, type: "mc", q: "The students chose their topic because it is", options: ["Easy to research", "Relevant to modern cities", "Recommended by their tutor"], answer: "B" },
            { id: 22, type: "mc", q: "Their biggest challenge so far is", options: ["Designing slides", "Finding reliable statistics", "Scheduling interviews"], answer: "B" },
            { id: 23, type: "mc", q: "The tutor advised them to", options: ["Add public awareness campaigns", "Reduce the number of case studies", "Change their topic"], answer: "A" },
            { id: 24, type: "mc", q: "The students plan to finish the presentation by", options: ["Sunday", "Monday evening", "Wednesday morning"], answer: "B" },
            { id: 25, type: "mc", q: "They will present their findings using", options: ["A slideshow", "A poster", "A video presentation"], answer: "C" },
            { id: 26, type: "mc", q: "Editing responsibilities are handled by", options: ["Lina", "Omar", "Both of them"], answer: "C" }
        ]
    },

    // SECTION 3 - Part 2 (Completion)
    section3_part2: {
        title: "Final Adjustments to the Presentation",
        instruction: "Complete the sentences. Write NO MORE THAN TWO WORDS.",
        audio: "section3.mp3",
        questions: [
            { id: 27, label: "The group's topic focuses on ______ conservation.", answer: "water" },
            { id: 28, label: "They added case studies from Singapore and ______.", answer: "Cape Town" },
            { id: 29, label: "Their narration includes spoken explanation and ______ clips.", answer: "interview" },
            { id: 30, label: "The final video is expected to be around ______ minutes.", answer: "nine" }
        ]
    },

    // SECTION 4 - Part 1 (Multiple Choice)
    section4_part1: {
        title: "Lecture on Habit Formation",
        instruction: "Choose the correct letter A, B, or C.",
        audio: "section4.mp3",
        questions: [
            { id: 31, type: "mc", q: "A habit begins with a", options: ["Reward", "Cue", "Routine"], answer: "B" },
            { id: 32, type: "mc", q: "The routine is described as the", options: ["Trigger", "Behavior", "Outcome"], answer: "B" },
            { id: 33, type: "mc", q: "Rewards strengthen habits by providing", options: ["Stress", "Punishment", "Satisfaction"], answer: "C" },
            { id: 34, type: "mc", q: "Habit strength increases through", options: ["Consistency", "Randomness", "Avoidance"], answer: "A" },
            { id: 35, type: "mc", q: "The lecturer says environment can", options: ["Prevent all habits", "Influence behavior", "Replace rewards"], answer: "B" }
        ]
    },

    // SECTION 4 - Part 2 (Completion)
    section4_part2: {
        title: "Summary of Habit Formation Principles",
        instruction: "Complete the summary. Write NO MORE THAN TWO WORDS.",
        audio: "section4.mp3",
        questions: [
            { id: 36, label: "Habits begin with a ______", answer: "cue" },
            { id: 37, label: "The routine is the actual ______", answer: "behavior" },
            { id: 38, label: "Rewards help reinforce the habit ______", answer: "loop" },
            { id: 39, label: "Changing the ______", answer: "environment" },
            { id: 40, label: "Long-term habit change requires deliberate ______", answer: "practice" }
        ]
    }
};

// Expose the data globally so the exam HTML can find it
window.newListeningQuestions2 = newListeningQuestions2;