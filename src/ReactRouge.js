import React, {useRef, useEffect } from 'react';
import InputManager from './InputManager';

const ReactRouge = ({width, height, tilesize}) => {
  //hook canvasef
  const canvasRef = useRef();

  let inputManager = new InputManager();
  const handleInput = (action,data) => {
    console.log(`handle input: ${action}: ${JSON.stringify(data)}`)
  }
  //hook para loguear cada input de teclado
  useEffect(()=> {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKey();
      inputManager.unsubscribe(handleInput);
    };
  });
  //hook useEffect para crear el escenario.
  useEffect( () => {
    console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0,0,width*tilesize,height*tilesize);
    ctx.fillStyle='#000';
    ctx.fillRect(12,12,16,16);
  });

  return (
    <canvas 
      ref={canvasRef}
      width={width * tilesize}
      height={height * tilesize} 
      style={{ 
        border: '1px solid black'
      }}
    ></canvas>
  );
};
export default ReactRouge;