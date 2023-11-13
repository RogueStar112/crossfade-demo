import React, { useEffect, useRef } from 'react';

const AudioComponent = () => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Create an AudioContext when the component mounts
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Clean up the audio context when the component unmounts
    return () => {
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleClick = async () => {
    // Check if the AudioContext is in a suspended state and resume it
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // Fetch and decode an audio file
    const response1 = await fetch('./src/assets/music/chainsmokers_thisfeeling.mp3');
    const arrayBuffer1 = await response1.arrayBuffer();
    const audioBuffer1 = await audioContextRef.current.decodeAudioData(arrayBuffer1);

    // Fetch and decode the second audio file
    const response2 = await fetch('./src/assets/music/kygo_stargazing.mp3');
    const arrayBuffer2 = await response2.arrayBuffer();
    const audioBuffer2 = await audioContextRef.current.decodeAudioData(arrayBuffer2);

    // Create BufferSourceNodes for each audio file
    const source1 = audioContextRef.current.createBufferSource();
    source1.buffer = audioBuffer1;

    const source2 = audioContextRef.current.createBufferSource();
    source2.buffer = audioBuffer2;

    // Connect sources to the destination (speakers)
    source1.connect(audioContextRef.current.destination);
    source2.connect(audioContextRef.current.destination);

    // Start both sources simultaneously
    source1.start();
    source2.start();
  };

  return (
    <div>
      <button onClick={handleClick}>Play Audio</button>
    </div>
  );
};

export default AudioComponent;


// import { useEffect, useRef } from 'react';

// const AudioComponent = () => {
  
//   let audioContext;
//   let bufferLoader;

//   const audioContextRef = useRef(null);

  
//   const handleClick = () => {

//     if (audioContextRef.current) {


//         audioContextRef.current.resume().then(() => {

//         });
//     }

//   }

//   useEffect(() => {

//     const init = async () => {
//       const audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

//       bufferLoader = new BufferLoader(
//         audioContext, ['./src/assets/music/chainsmokers_thisfeeling.mp3', '.src/assets/music/kygo_stargazing.mp3'],
//         finishedLoading
//       );

//       bufferLoader.load();
//     }

//     const finishedLoading = async (bufferList) => {

//       // create two sources and play them together

//       var source1 = audioContext.createBufferSource();
//       var source2 = audioContext.createBufferSource();
//       source1.buffer = bufferList[0];
//       source2.buffer = bufferList[1];

//       source1.connect(audioContext.destination);
//       source2.connect(audioContext.destination);
//       source1.start(0);
//       source2.start(0);



//     }

//     init()

//     return () => {
//       if (audioContext && audioContext.state === 'running') {
//         audioContext.close();
//       }
//     };
//   }, []);


//   return <button onClick={handleClick}>Start Audio</button>;
  

// }

// export default AudioComponent;