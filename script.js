// Fill all dropdowns with grade options automatically
window.onload = () => {
  const gradeOptions = [
    { text: "Select Grade", value: "" },
    { text: "A+ / A (85-100 / 70-84)", value: 4.0 },
    { text: "A- (65-69)", value: 3.7 },
    { text: "B+ (60-64)", value: 3.3 },
    { text: "B (55-59)", value: 3.0 },
    { text: "B- (50-54)", value: 2.7 },
    { text: "C+ (45-49)", value: 2.3 },
    { text: "C (40-44)", value: 2.0 },
    { text: "C- (35-39)", value: 1.7 },
    { text: "D+ (30-34)", value: 1.3 },
    { text: "D (25-29)", value: 1.0 },
    { text: "E (0-24)", value: 0.0 }
  ];

  document.querySelectorAll(".grade-select").forEach(select => {
    gradeOptions.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.text;
      select.appendChild(option);
    });
  });
};

function calculateGPA() {
  const selects = document.querySelectorAll(".grade-select");
  let totalCredits = 0;
  let totalPoints = 0;

  selects.forEach(select => {
    const gradePoint = parseFloat(select.value);
    const credits = parseInt(select.getAttribute("data-credits"));

    if (!isNaN(gradePoint)) {
      totalCredits += credits;
      totalPoints += gradePoint * credits;
    }
  });

  if (totalCredits === 0) {
    document.getElementById("result").innerText = "⚠️ Please select grades for at least one subject.";
    return;
  }

  const gpa = (totalPoints / totalCredits).toFixed(2);
  let remark = "";

  if (gpa >= 3.8) remark = "🎉 Distinction!";
  else if (gpa >= 3.3) remark = "✅ Pass";
  else remark = "⚠️ Below Pass";

  document.getElementById("result").innerText = `Your GPA is: ${gpa} (${remark})`;
}
