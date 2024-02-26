import { useState, useEffect, useMemo } from 'react';

function App() {
  // State to store the audio buffer and audio source
  const [audio, setAudio] = useState(null);

  // Create an audio context
  const audioContext = useMemo(() => new window.AudioContext(), []);
  const source = audioContext.createBufferSource();

  // Use useEffect to fetch the audio file and store it in the audio buffer
  useEffect(() => {

    fetch('https://cdn.freesound.org/previews/723/723864_1648170-lq.mp3')
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        // Decode the audio buffer
        const decoded = audioContext.decodeAudioData(arrayBuffer);
        return decoded;
      }).then((decodedAudio) => {
        // Set the audio buffer in the state
        setAudio(decodedAudio);
      })
      .catch((error) => console.error('Error fetching audio file:', error));;
  }, [audioContext]);

  const playAudio = () => {
    if (audio) {
      if (!source.buffer) {
        source.buffer = audio;
      }
      source.connect(audioContext.destination);
      source.start(audioContext.currentTime);
    }
  };

  const stopAudio = () => {
    if (audio) {
      source.disconnect(audioContext.destination);
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play</button>
      <button onClick={stopAudio}>Stop</button>
    </div>
  );
}


export default App;
