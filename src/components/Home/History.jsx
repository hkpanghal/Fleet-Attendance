import React from 'react'

function History() {
  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button onClick={toggleFullScreen}>
      {document.fullscreenElement ? 'Exit Full Screen' : 'Full Screen'}
    </button>
  );
}

export default History