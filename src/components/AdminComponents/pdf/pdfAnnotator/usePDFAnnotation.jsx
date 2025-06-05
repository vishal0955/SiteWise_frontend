import { useRef, useState } from 'react';
import { fabric } from 'fabric';

const TOOLS = {
  PEN: 'pen',
  TEXT: 'text',
  HIGHLIGHT: 'highlight',
};

export const usePDFAnnotation = () => {
  const [tool, setTool] = useState(TOOLS.PEN);
  const canvases = useRef({});
  const undoStacks = useRef({});
  const redoStacks = useRef({});

  const setupCanvas = (pageId, width, height) => {
    const id = `canvas-page-${pageId}`;
    if (document.getElementById(id)) return;

    const canvasElem = document.createElement('canvas');
    Object.assign(canvasElem, { id, width, height });
    Object.assign(canvasElem.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
    });

    const container = document.querySelector(`#${pageId} .pdf-page`);
    if (!container) return;
    container.style.position = 'relative';
    container.appendChild(canvasElem);

    const fabricCanvas = new fabric.Canvas(id, {
      isDrawingMode: tool !== TOOLS.TEXT,
      selection: true,
    });

    updateBrush(fabricCanvas, tool);

    fabricCanvas.on('object:added', () => saveState(pageId));
    fabricCanvas.on('object:modified', () => saveState(pageId));
    fabricCanvas.on('object:removed', () => saveState(pageId));

    canvases.current[pageId] = fabricCanvas;
    undoStacks.current[pageId] = [];
    redoStacks.current[pageId] = [];
    saveState(pageId);
  };

  const updateBrush = (canvas, currentTool) => {
    canvas.isDrawingMode = currentTool !== TOOLS.TEXT;
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color =
      currentTool === TOOLS.HIGHLIGHT ? 'rgba(255,255,0,0.3)' : '#000';
  };

  const changeTool = (newTool) => {
    setTool(newTool);
    Object.values(canvases.current).forEach((canvas) => updateBrush(canvas, newTool));
  };

  const addText = (pageId) => {
    const canvas = canvases.current[pageId];
    if (!canvas) return;
    const text = new fabric.IText('Text', { left: 100, top: 100, fill: '#000' });
    canvas.add(text);
  };

  const saveState = (pageId) => {
    const canvas = canvases.current[pageId];
    if (!canvas) return;
    undoStacks.current[pageId].push(canvas.toJSON());
    redoStacks.current[pageId] = [];
  };

  const undo = (pageId) => {
    const canvas = canvases.current[pageId];
    const stack = undoStacks.current[pageId];
    if (!canvas || stack.length < 2) return;
    redoStacks.current[pageId].push(stack.pop());
    canvas.loadFromJSON(stack[stack.length - 1], canvas.renderAll.bind(canvas));
  };

  const redo = (pageId) => {
    const canvas = canvases.current[pageId];
    const redoStack = redoStacks.current[pageId];
    if (!canvas || !redoStack.length) return;
    const next = redoStack.pop();
    undoStacks.current[pageId].push(next);
    canvas.loadFromJSON(next, canvas.renderAll.bind(canvas));
  };

  const exportAnnotations = () => {
    const data = {};
    for (const [pageId, canvas] of Object.entries(canvases.current)) {
      data[pageId] = canvas.toJSON();
    }
    return data;
  };

  const importAnnotations = (data) => {
    for (const [pageId, json] of Object.entries(data)) {
      const canvas = canvases.current[pageId];
      if (canvas) {
        canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
      }
    }
  };

  return {
    TOOLS,
    tool,
    canvases: canvases.current,
    setupCanvas,
    changeTool,
    addText,
    undo,
    redo,
    exportAnnotations,
    importAnnotations,
  };
};
