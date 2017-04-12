import Display from './display';
import $ from 'jquery';

let mainViewer;
const defaultRoom = '{"floorplan":{"corners":{"d5dd62c8-2422-0675-9cb0-42551b07c26d":{"x":286.6389999999999,"y":-200.65999999999997},"bd64fa0b-1925-b4e3-6141-9594cf0d8e6b":{"x":286.6389999999999,"y":205.74},"3c977fa2-6b16-e3c3-c500-8b22b8b9a9af":{"x":286.6389999999999,"y":502.41199999999986},"500eae15-6c6e-4de7-72dd-6075d7035582":{"x":693.0390000000014,"y":502.41199999999986},"fddc037c-27bb-0f73-fabc-407eac61267f":{"x":693.0390000000014,"y":205.74},"c3cacdb0-0787-1df9-29a5-35ee84252682":{"x":1143.1270000000004,"y":205.74},"033a0ea1-0eed-b5ca-90d9-53576fe92e59":{"x":1143.1270000000004,"y":-200.65999999999997},"e72128ff-94c5-a976-3462-33a8df009188":{"x":693.0390000000014,"y":-200.65999999999997}},"walls":[{"corner1":"d5dd62c8-2422-0675-9cb0-42551b07c26d","corner2":"bd64fa0b-1925-b4e3-6141-9594cf0d8e6b","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"bd64fa0b-1925-b4e3-6141-9594cf0d8e6b","corner2":"fddc037c-27bb-0f73-fabc-407eac61267f","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"fddc037c-27bb-0f73-fabc-407eac61267f","corner2":"e72128ff-94c5-a976-3462-33a8df009188","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e72128ff-94c5-a976-3462-33a8df009188","corner2":"d5dd62c8-2422-0675-9cb0-42551b07c26d","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"bd64fa0b-1925-b4e3-6141-9594cf0d8e6b","corner2":"3c977fa2-6b16-e3c3-c500-8b22b8b9a9af","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"3c977fa2-6b16-e3c3-c500-8b22b8b9a9af","corner2":"500eae15-6c6e-4de7-72dd-6075d7035582","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"500eae15-6c6e-4de7-72dd-6075d7035582","corner2":"fddc037c-27bb-0f73-fabc-407eac61267f","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"fddc037c-27bb-0f73-fabc-407eac61267f","corner2":"c3cacdb0-0787-1df9-29a5-35ee84252682","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3cacdb0-0787-1df9-29a5-35ee84252682","corner2":"033a0ea1-0eed-b5ca-90d9-53576fe92e59","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"033a0ea1-0eed-b5ca-90d9-53576fe92e59","corner2":"e72128ff-94c5-a976-3462-33a8df009188","frontTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[{"item_name":"Open Door","item_type":7,"model_url":"static/models/js/open_door.js","xpos":693.5390014648438,"ypos":110.800000297771,"zpos":9.594767194308133,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Open Door","item_type":7,"model_url":"static/models/js/open_door.js","xpos":461.93459267574985,"ypos":110.800000297771,"zpos":206.24000549316406,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Closed Door","item_type":7,"model_url":"static/models/js/closed-door28x80_baked.js","xpos":287.1390075683594,"ypos":110.80000022010701,"zpos":4.0006201599196345,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"static/models/js/whitewindow.js","xpos":918.3613333673159,"ypos":163.7635217948718,"zpos":-200.16000366210938,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"static/models/js/whitewindow.js","xpos":490.2757995243781,"ypos":151.85339063480177,"zpos":501.9119873046875,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"static/models/js/whitewindow.js","xpos":1142.626953125,"ypos":163.7635217948718,"zpos":1.669481743356215,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"static/models/js/whitewindow.js","xpos":931.5034540606323,"ypos":144.02628587991285,"zpos":205.2400054931641,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}]}';

export function initViewer() {
  const viewer = new Display.Blueprint3d({
    floorplannerElement: 'floorplanner-canvas',
    threeElement: '#viewer',
    threeCanvasElement: 'three-canvas',
    textureDir: 'models/textures/',
    widget: false
  });

  document.getElementById('floorplanner-canvas').style.display = 'none';

  viewer.model.loadSerialized(defaultRoom);

  mainViewer = viewer;
}

export function getViewer() {
  return mainViewer;
}

export function addSceneItem(furniture) {
  getViewer().model.scene.addItem(
    furniture.type,
    furniture.modelUrl,
    {
      itemFurnitureId: furniture.id,
      itemName: furniture.name,
      resizable: true,
      itemType: furniture.type,
      modelUrl: furniture.modelUrl
    }
  );
}

export function removeSceneItem(furnitureId) {
  const scene = getViewer().model.scene;
  const res = scene.items.find((item) => {
    return item.metadata &&
      item.metadata.itemFurnitureId &&
      item.metadata.itemFurnitureId === furnitureId;
  });

  res.remove();
  scene.needsUpdate = true;
}
