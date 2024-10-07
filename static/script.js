async function makePrediction(event) {
    event.preventDefault(); 

    // Get input values
    const feature_1 = document.getElementById('feature_1').value;
    const feature_2 = document.getElementById('feature_2').value;
    const feature_3 = document.getElementById('feature_3').value;
    const feature_4 = document.getElementById('feature_4').value;
    const feature_5 = document.getElementById('feature_5').value;
    const feature_6 = document.getElementById('feature_6').value;
    const feature_7 = document.getElementById('feature_7').value;
    const feature_8 = document.getElementById('feature_8').value;
    const feature_9 = document.getElementById('feature_9').value;
    const feature_10 = document.getElementById('feature_10').value;
    const feature_11 = document.getElementById('feature_11').value;

    const data = {
        feature_1: parseFloat(feature_1),
        feature_2: parseFloat(feature_2),
        feature_3: parseFloat(feature_3),
        feature_4: parseFloat(feature_4),
        feature_5: parseFloat(feature_5),
        feature_6: parseFloat(feature_6),
        feature_7: parseFloat(feature_7),
        feature_8: parseFloat(feature_8),
        feature_9: parseFloat(feature_9),
        feature_10: parseFloat(feature_10),
        feature_11: parseFloat(feature_11)
    };

    // Make the POST request to FastAPI
    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // Check if the response is okay
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData); // Log the error data
        document.getElementById('result').textContent = `Error: ${errorData.detail}`;
        return; // Stop execution if there's an error
    }

    // Parse the JSON response
    const result = await response.json();
    
    // Display the prediction result
    document.getElementById('result').textContent = `Predicted Wine Quality: ${result.prediction}`;
}
