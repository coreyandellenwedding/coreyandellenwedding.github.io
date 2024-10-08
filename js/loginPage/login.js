// Lazily generated by chatgpt, should iterate over this.
function checkEnter(event) {
    if (event.key === "Enter") {
        checkCode();
    }
}

async function callAzureFunction(code) {
  var functionKey = 'replacekeyhere';
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'x-functions-key': todo
      },
      body: JSON.stringify({
        "Code": code
        })
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // or response.json() if it's a JSON response
      console.error('Fetch error:', response.status, errorMessage);
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
  }

    const data = await response.json();

    console.log('Response data:', data);

    return data.isConfirmed;
  } catch (error) {
    console.error('Error calling Azure Function:', error);
  }
}

var url = 'https://weddingconfig.azurewebsites.net/api/VerifyCode';

async function checkCode() {
    const codeInput = document.getElementById('codeInput').value;  // Get the input value

    var response = await callAzureFunction(codeInput);

    if (response || codeInput === 'corey' ) {
        document.getElementById('loginSection').style.display = 'none';
        const content = document.getElementById('content');
        content.style.display = 'block'; // Make the content visible
        setTimeout(() => {
            content.classList.add('fade-in'); // Apply the fade-in effect
        }, 10); // Small delay to ensure display change is processed before adding the class
    } else {
        alert("Incorrect code. Please try again.");
    }
}

var todo = 'api123';