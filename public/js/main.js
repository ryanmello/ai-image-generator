function onSubmit(e){
    e.preventDefault();

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add text');
        return;
    }

    console.log(prompt, size);

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size){
    try {
        showSpinner();

        console.log('got here 3')

        // issue here -->
        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size,
            })
        });
        // <--

        console.log('got here 1');

        if(!reponse.ok){
            removeSpinner();
            throw new Error('image could not be generated');
        }

        console.log('got here 2');

        const data = await response.json();
        console.log(data);

        removeSpinner();
    } catch(error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
