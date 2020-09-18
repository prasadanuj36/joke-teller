
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disabl/Enable 
function toggleButton(){
    button.disabled = !button.disabled;
}

// Using jokes from JokeAPI in VoiceRSS API

const tellJokes = (joke) => {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: '8061df177aab4f0d99fbd22a551f4752',
        src: jokeString,
        hl: 'en-gb',
        v: 'Nancy',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from JokeAPI

async function getJokes() {
    let joke = '';
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious';
    try {
        const response = await fetch(apiURL)
        data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ...${data.delivery}.`;
        }
        else {
            joke = data.joke;
        }

        // Text-to-Speech
        tellJokes(joke);

        // Disable button
        toggleButton();
    }
    catch (error) {
        console.log('failed to fetch', error);
    }
    
}

// Event Listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);