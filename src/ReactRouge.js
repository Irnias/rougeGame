import React, {useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';
import World from './World';

const ReactRouge = ({width, height, tilesize}) => {
  //hook canvasef
  const canvasRef = useRef();

  const [world, setWorld] = useState( new World(width,height,tilesize));

  let inputManager = new InputManager();
  const handleInput = (action,data) => {
    console.log(`handle input: ${action}: ${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  // Hook para crear el mapa
  useEffect(() => {
    console.log('Map')
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    setWorld(newWorld);
    // eslint-disable-next-line
  },[]);


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
    world.draw(ctx);
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