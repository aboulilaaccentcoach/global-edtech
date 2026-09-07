// ==========================================
// GLOBAL FEEDBACK & DATA ANALYSIS ENGINE
// ==========================================

// Helper: Convert SAT Raw (0-54) to Scaled (200-400)
function calculateSATScore(raw) {
    if (raw >= 54) return 400;
    if (raw >= 50) return 390;
    if (raw >= 47) return 380;
    if (raw >= 43) return 360;
    if (raw >= 38) return 340;
    if (raw >= 33) return 320;
    if (raw >= 28) return 300;
    if (raw >= 23) return 280;
    if (raw >= 18) return 260;
    if (raw >= 12) return 240;
    if (raw >= 6) return 220;
    return 200;
}

// Helper: Convert IELTS Raw (0-40) to Bands (5.0 - 9.0)
function calculateIELTSBand(raw) {
    if (raw >= 39) return 9.0;
    if (raw >= 37) return 8.5;
    if (raw >= 35) return 8.0;
    if (raw >= 32) return 7.5;
    if (raw >= 30) return 7.0;
    if (raw >= 26) return 6.5;
    if (raw >= 23) return 6.0;
    if (raw >= 19) return 5.5;
    if (raw >= 15) return 5.0;
    return 4.5;
}

// MAIN: Generate Professional Feedback based on Data
function generateProfessionalFeedback(data) {
    let feedback = "";
    
    if (data.examType === 'SAT') {
        const score = data.scaledScore;
        if (score >= 360) feedback = `<div style="background:#d4edda; padding:15px; border-radius:10px; color:#155724;"><h4>🏆 Advanced & Ready</h4><p>Excellent performance! Focus on speed and endurance. Try completing with 5 minutes left to simulate test-day pressure.</p></div>`;
        else if (score >= 300) feedback = `<div style="background:#fff3cd; padding:15px; border-radius:10px; color:#856404;"><h4>📊 Proficient</h4><p>Solid grasp, but consistency gaps. Focus on Rhetoric and eliminating silly mistakes on Reading Comprehension.</p></div>`;
        else if (score >= 240) feedback = `<div style="background:#f8d7da; padding:15px; border-radius:10px; color:#721c24;"><h4>📈 Foundation Building</h4><p>Master core grammar rules and basic reading comprehension. Drill the Grammar and Vocabulary modules before retaking.</p></div>`;
        else feedback = `<div style="background:#f8d7da; padding:15px; border-radius:10px; color:#721c24;"><h4>📉 Critical Stage</h4><p>Focus on the absolute fundamentals. Review the answers step-by-step. Start with the Grammar module.</p></div>`;
    } 
    else if (data.examType === 'IELTS') {
        const band = data.bandScore;
        if (band >= 8.0) feedback = `<div style="background:#d4edda; padding:15px; border-radius:10px; color:#155724;"><h4>🌍 Global Ready</h4><p>Excellent! Your English is university-level. Focus on fine-tuning your accent and tone for the Speaking section.</p></div>`;
        else if (band >= 6.5) feedback = `<div style="background:#fff3cd; padding:15px; border-radius:10px; color:#856404;"><h4>📊 Strong Upper-Intermediate</h4><p>You are close to your target! Focus on complex sentence structures and listening for specific details in Sections 3 & 4.</p></div>`;
        else if (band >= 5.5) feedback = `<div style="background:#f8d7da; padding:15px; border-radius:10px; color:#721c24;"><h4>📈 Intermediate Stage</h4><p>Good foundational skills. Focus on common vocabulary and listening for main ideas in Sections 1 & 2.</p></div>`;
        else feedback = `<div style="background:#f8d7da; padding:15px; border-radius:10px; color:#721c24;"><h4>📉 Foundation Stage</h4><p>Start with daily listening practice and basic grammar drills. Consistency is key.</p></div>`;
    }
    
    return feedback;
}

// MAIN: Generate Charts based on Data
function generateDataCharts(canvasId, chartType, labels, dataValues) {
    if (!canvasId) return;
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Destroy existing chart to prevent stacking bugs
    if (window.myChart) window.myChart.destroy();
    
    window.myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance',
                data: dataValues,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.6)',
                    'rgba(118, 100, 162, 0.6)',
                    'rgba(255, 165, 0, 0.6)',
                    'rgba(46, 204, 113, 0.6)'
                ],
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Expose functions to global scope
window.calculateSATScore = calculateSATScore;
window.calculateIELTSBand = calculateIELTSBand;
window.generateProfessionalFeedback = generateProfessionalFeedback;
window.generateDataCharts = generateDataCharts;
console.log("✅ Feedback Engine Loaded Successfully!");