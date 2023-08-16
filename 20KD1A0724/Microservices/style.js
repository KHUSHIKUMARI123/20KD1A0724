document.addEventListener("DOMContentLoaded", function() {
    const urlForm = document.getElementById("urlForm");
    const urlList = document.getElementById("urlList");
    const addUrlButton = document.getElementById("addUrlButton");
    const fetchNumbersButton = document.getElementById("fetchNumbersButton");
    const numbersOutput = document.getElementById("numbersOutput");
    
    const urls = [];
    
    addUrlButton.addEventListener("click", function() {
        const urlInput = document.getElementById("url");
        const newUrl = urlInput.value.trim();
        
        if (newUrl !== "") {
            urls.push(newUrl);
            displayUrls();
            urlInput.value = "";
        }
    });
    
    fetchNumbersButton.addEventListener("click", async function() {
        if (urls.length === 0) {
            alert("Please add at least one URL.");
            return;
        }
        
        const fetchedNumbers = await fetchNumbersFromUrls();
        displayFetchedNumbers(fetchedNumbers);
    });
    
    function displayUrls() {
        urlList.innerHTML = "";
        urls.forEach(url => {
            const listItem = document.createElement("li");
            listItem.textContent = url;
            urlList.appendChild(listItem);
        });
    }
    
    async function fetchNumbersFromUrls() {
        const fetchedNumbers = [];
        for (const url of urls) {
            try {
                const response = await fetch(`/numbers?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                if (data && data.Numbers) {
                    fetchedNumbers.push(...data.Numbers);
                }
            } catch (error) {
                console.error("Error fetching numbers:", error);
            }
        }
        return fetchedNumbers;
    }
    
    function displayFetchedNumbers(numbers) {
        numbersOutput.textContent = `Fetched Numbers: [${numbers.join(", ")}]`;
    }
});
