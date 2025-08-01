 // Validate user input for weight and height
function validateInputs(weight, height) {
  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    alert("Please enter valid numerical values for weight and height.");
    return false;
  }
  return true;
}

let bmiChartInstance = null;

// BMI Calculation and Chart Display
function calculateBMI() {
  var weight = parseFloat(document.getElementById('weight').value);
  var height = parseFloat(document.getElementById('height').value) / 100; // Convert height to meters

  if (!validateInputs(weight, height)) {
    return;
  }

  var bmi = weight / (height * height);
  document.getElementById('bmiResult').innerHTML = "Your BMI is " + bmi.toFixed(2);

  displayFitnessTips(bmi);
  generateChart(bmi);
  displayDietSuggestions(bmi);
  displayExerciseSuggestions(bmi);
}

// Display fitness tips based on BMI
function displayFitnessTips(bmi) {
  var tipsContainer = document.getElementById('fitnessTips');
  if (bmi < 18.5) {
    tipsContainer.innerHTML = "Underweight - You should consume more calories and work on building muscle.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    tipsContainer.innerHTML = "Normal weight - Keep up the good work! Stay active and maintain a balanced diet.";
  } else if (bmi >= 25 && bmi < 29.9) {
    tipsContainer.innerHTML = "Overweight - Consider losing some weight through a combination of healthy eating and exercise.";
  } else {
    tipsContainer.innerHTML = "Obese - It's highly recommended to consult a healthcare provider for a proper weight loss plan.";
  }
}

// Generate BMI Chart
function generateChart(bmi) {
  if (bmiChartInstance) {
    bmiChartInstance.destroy();
  }

  var ctx = document.getElementById('bmiChart').getContext('2d');
  var chartData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [{
      label: 'BMI Categories',
      data: [18.5, 24.9, 29.9, 40],
      backgroundColor: ['#ff9999', '#99ff99', '#ffcc00', '#ff3333'],
      borderColor: ['#ff6666', '#66ff66', '#ff9900', '#ff6666'],
      borderWidth: 1
    }]
  };

  var chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 40
      }
    }
  };

  bmiChartInstance = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions
  });
}

// Display Diet Suggestions based on BMI + Goal
function displayDietSuggestions(bmi) {
  const dietContainer = document.getElementById('dietList');
  dietContainer.innerHTML = ''; // Clear old content

  const goal = document.getElementById('goal').value;

  if (goal === 'gain') {
    if (bmi < 18.5) {
      dietContainer.innerHTML = `
        <li>Eat 5-6 meals a day with calorie-dense foods.</li>
        <li>Include ghee, peanut butter, cheese, and milkshakes.</li>
        <li>Focus on high-protein sources like paneer, chicken, and lentils.</li>
      `;
    } else {
      dietContainer.innerHTML = `
        <li>Increase protein and complex carb intake for lean muscle gain.</li>
        <li>Eat pre- and post-workout meals with banana, oats, or whey protein.</li>
        <li>Include eggs, nuts, Greek yogurt, quinoa, and legumes.</li>
      `;
    }
  }

  else if (goal === 'lose') {
    if (bmi >= 25 && bmi < 30) {
      dietContainer.innerHTML = `
        <li>Opt for a high-fiber, low-carb diet: green veggies, dal, sprouts.</li>
        <li>Avoid sugar, white bread, fried foods, and sugary drinks.</li>
        <li>Drink 2.5–3L water daily and practice portion control.</li>
      `;
    } else if (bmi >= 30) {
      dietContainer.innerHTML = `
        <li>Strict calorie deficit plan: replace rice with oats or millets.</li>
        <li>Follow a high-protein, low-fat meal plan (boiled eggs, grilled veggies).</li>
        <li>Consult a dietitian for tailored macros and meal tracking.</li>
      `;
    } else {
      dietContainer.innerHTML = `
        <li>Maintain a balanced low-calorie diet with veggies, fruits, and proteins.</li>
        <li>Avoid snacks and eat dinner early (before 8pm).</li>
        <li>Track your calories using apps like MyFitnessPal.</li>
      `;
    }
  }

  else if (goal === 'maintain') {
    if (bmi >= 18.5 && bmi < 25) {
      dietContainer.innerHTML = `
        <li>Maintain a balanced diet with whole grains, vegetables, and proteins.</li>
        <li>Hydrate regularly and avoid excessive sugar/fats.</li>
        <li>Follow a consistent meal schedule and avoid skipping meals.</li>
      `;
    } else if (bmi < 18.5) {
      dietContainer.innerHTML = `
        <li>Eat a little more than your usual daily intake to reach normal BMI.</li>
        <li>Add smoothies, protein shakes, and dry fruits between meals.</li>
        <li>Don't skip breakfast — make it your most calorie-dense meal.</li>
      `;
    } else {
      dietContainer.innerHTML = `
        <li>Reduce simple carbs and avoid late-night snacking.</li>
        <li>Fill half your plate with vegetables at every meal.</li>
        <li>Eat slowly and mindfully to prevent overeating.</li>
      `;
    }
  }
}

// Display Exercise Suggestions based on BMI
function displayExerciseSuggestions(bmi) {
  var exerciseContainer = document.getElementById('exerciseList');
  exerciseContainer.innerHTML = ''; // Clear existing suggestions

  if (bmi < 18.5) {
    exerciseContainer.innerHTML = `
      <li>Focus on strength training exercises like weight lifting to build muscle mass.</li>
      <li>Incorporate bodyweight exercises such as push-ups, squats, and lunges.</li>
      <li>Include moderate aerobic exercises like walking, cycling, and swimming to improve endurance.</li>
    `;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    exerciseContainer.innerHTML = `
      <li>Maintain an active lifestyle with regular cardio exercises like running, swimming, or cycling.</li>
      <li>Strength training should be continued to maintain muscle tone.</li>
      <li>Include flexibility and balance exercises like yoga or Pilates.</li>
    `;
  } else if (bmi >= 25 && bmi < 29.9) {
    exerciseContainer.innerHTML = `
      <li>Focus on fat-burning exercises like brisk walking, jogging, cycling, and swimming.</li>
      <li>Incorporate strength training to help reduce fat and maintain muscle mass.</li>
      <li>Start with moderate-intensity workouts and gradually increase intensity.</li>
    `;
  } else {
    exerciseContainer.innerHTML = `
      <li>Consult a trainer or healthcare professional to design a personalized workout plan.</li>
      <li>Low-impact exercises like walking, water aerobics, and cycling are recommended.</li>
      <li>Focus on gradual weight loss through consistent exercise and a balanced diet.</li>
    `;
  }
}

// Download the BMI report as PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("BMI Report", 20, 20);
  doc.text("BMI: " + document.getElementById('bmiResult').innerText, 20, 30);
  doc.text("Diet Suggestions: ", 20, 40);
  doc.text(document.getElementById('dietList').innerText, 20, 50);
  doc.text("Exercise Suggestions: ", 20, 70);
  doc.text(document.getElementById('exerciseList').innerText, 20, 80);

  doc.save('bmi_report.pdf');
}
function resetForm() {
  document.getElementById('weight').value = '';
  document.getElementById('height').value = '';
  document.getElementById('goal').value = 'maintain';
  document.getElementById('bmiResult').innerHTML = '';
  document.getElementById('fitnessTips').innerHTML = '';
  document.getElementById('dietList').innerHTML = '';
  document.getElementById('exerciseList').innerHTML = '';

  if (bmiChartInstance) {
    bmiChartInstance.destroy();
    bmiChartInstance = null;
  }
}
