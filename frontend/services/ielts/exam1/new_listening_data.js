// ==============================================
// ORIGINAL GLOBAL EDTECH LISTENING DATA - EXAM 1
// ==============================================

const newListeningQuestions = {
    // SECTION 1
    section1: {
        title: "Weekend Creative Writing Workshop Enquiry",
        instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
        audio: "section1.mp3",
        questions: [
            { id: 1, type: "note", label: "Workshop date:", answer: "14 March", placeholder: "______" },
            { id: 2, type: "note", label: "Location:", answer: "Riverside Centre", placeholder: "______" },
            { id: 3, type: "note", label: "Maximum participants:", answer: "20", placeholder: "______" },
            { id: 4, type: "note", label: "Fee includes a printed handbook and a free writing:", answer: "journal", placeholder: "______" },
            { id: 5, type: "note", label: "Participants must bring their own:", answer: "laptop", placeholder: "______" },
            { id: 6, type: "note", label: "Workshop starts at: ______ a.m.", answer: "9:30", placeholder: "______" },
            { id: 7, type: "note", label: "Break time is at:", answer: "11:15", placeholder: "______" },
            { id: 8, type: "note", label: "Outdoor activity takes place in the ______ Garden", answer: "Maple", placeholder: "______" },
            { id: 9, type: "note", label: "Instructor's surname:", answer: "Kingsley", placeholder: "______" },
            { id: 10, type: "note", label: "Certificates sent within: ______ days", answer: "seven", placeholder: "______" }
        ]
    },

    // SECTION 2 (Part 1 - Multiple Choice)
    section2_part1: {
        title: "Innovation Hub Orientation",
        instruction: "Choose the correct letter A, B or C.",
        audio: "section2.mp3",
        questions: [
            { id: 11, type: "mc", q: "The newest study area is located on the", options: ["Ground floor", "First floor", "Second floor"], answer: "C" },
            { id: 12, type: "mc", q: "Students can borrow laptops for", options: ["4 hours", "6 hours", "8 hours"], answer: "B" },
            { id: 13, type: "mc", q: "The quiet zone is mainly used by", options: ["Postgraduate students", "International students", "Group project teams"], answer: "A" },
            { id: 14, type: "mc", q: "Printing services are available", options: ["Only during weekdays", "24 hours a day", "Until 10 p.m."], answer: "B" },
            { id: 15, type: "mc", q: "The library mobile app allows students to", options: ["Renew books", "Reserve study rooms", "Both A and B"], answer: "C" }
        ]
    },

    // SECTION 2 (Part 2 - Map Labeling)
    section2_part2: {
        title: "Innovation Hub - Map Overview",
        instruction: "Label the map. Choose the correct letter A-H.",
        audio: "section2.mp3",
        image: "https://res.cloudinary.com/elyetdsl/image/upload/v1788591241/ielts1_section2_part2_hubfloor_map.jpg",
        questions: [
            { id: 16, label: "Multimedia Room", answer: "D" },
            { id: 17, label: "Help Desk", answer: "A" },
            { id: 18, label: "Journals Section", answer: "F" },
            { id: 19, label: "Computer Lab", answer: "C" },
            { id: 20, label: "Reading Lounge", answer: "H" }
        ]
    },

    // SECTION 3 (Part 1 - Multiple Choice)
    section3_part1: {
        title: "Academic Consultation About a Research Project",
        instruction: "Choose the correct letter A, B or C.",
        audio: "section3.mp3",
        questions: [
            { id: 21, type: "mc", q: "The students chose their topic because it is", options: ["Easy to collect data for", "Relevant to current technology trends", "Recommended by their professor"], answer: "B" },
            { id: 22, type: "mc", q: "Their biggest challenge so far is", options: ["Scheduling interviews", "Finding reliable sources", "Designing the survey"], answer: "A" },
            { id: 23, type: "mc", q: "The professor advised them to", options: ["Reduce the number of participants", "Expand their literature review", "Change their research method"], answer: "B" },
            { id: 24, type: "mc", q: "The students plan to finish data collection by", options: ["Friday", "Sunday", "Next Wednesday"], answer: "C" },
            { id: 25, type: "mc", q: "They will present their findings using", options: ["A poster", "A slideshow", "A video"], answer: "B" },
            { id: 26, type: "mc", q: "The group decided that editing will be done by", options: ["Maya", "Leon", "Both of them"], answer: "C" }
        ]
    },

    // SECTION 3 (Part 2 - Completion)
    section3_part2: {
        title: "Research Project Findings and Requirements",
        instruction: "Complete the sentences. Write NO MORE THAN TWO WORDS.",
        audio: "section3.mp3",
        questions: [
            { id: 27, label: "The research topic focuses on student use of ______ tools.", answer: "digital" },
            { id: 28, label: "The group wants to compare habits between local and ______ students.", answer: "exchange" },
            { id: 29, label: "Their survey will include both multiple-choice and ______ questions.", answer: "open-ended" },
            { id: 30, label: "They expect their final report to be around ______ words.", answer: "3,000" }
        ]
    },

    // SECTION 4 (Part 1 - Multiple Choice)
    section4_part1: {
        title: "Lecture on Memory Formation",
        instruction: "Choose the correct letter A, B, or C.",
        audio: "section4.mp3",
        questions: [
            { id: 31, type: "mc", q: "Short-term memory typically lasts", options: ["A few seconds", "Several minutes", "About an hour"], answer: "A" },
            { id: 32, type: "mc", q: "Long-term memory formation depends heavily on", options: ["Sleep", "Diet", "Physical exercise"], answer: "A" },
            { id: 33, type: "mc", q: "Memory improves when information is", options: ["Repeated frequently", "Connected to emotions", "Written down"], answer: "B" },
            { id: 34, type: "mc", q: "The hippocampus is responsible for", options: ["Storing motor skills", "Processing new memories", "Managing language"], answer: "B" },
            { id: 35, type: "mc", q: "Memory loss can be accelerated by", options: ["Stress", "Meditation", "Social interaction"], answer: "A" }
        ]
    },

    // SECTION 4 (Part 2 - Completion)
    section4_part2: {
        title: "Summary of Key Memory Processes",
        instruction: "Complete the summary. Write NO MORE THAN TWO WORDS.",
        audio: "section4.mp3",
        questions: [
            { id: 36, label: "Memory is strengthened through repeated ______.", answer: "practice" },
            { id: 37, label: "Visual associations help the brain build stronger ______.", answer: "links" },
            { id: 38, label: "Sleep allows the brain to ______ information.", answer: "process" },
            { id: 39, label: "Physical activity increases blood flow to the ______.", answer: "brain" },
            { id: 40, label: "Memory can be improved with consistent ______.", answer: "training" }
        ]
    }
};

// Expose the data globally so the exam HTML can find it
window.newListeningQuestions = newListeningQuestions;