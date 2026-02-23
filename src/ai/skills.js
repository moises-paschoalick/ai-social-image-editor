const generateForProductLaunch = () => {
  return [
    {
      id: 1,
      text: "New Product Launch!",
      fontSize: 80,
      fontFamily: "Impact",
      textColor: "#ff0000",
      position: { x: 540, y: 300, scaleX: 1, scaleY: 1 },
    },
    {
      id: 2,
      text: "Get yours now!",
      fontSize: 50,
      fontFamily: "Arial",
      textColor: "#000000",
      position: { x: 540, y: 700, scaleX: 1, scaleY: 1 },
    },
  ];
};

const generateForSale = () => {
  return [
    {
      id: 1,
      text: "Big Sale!",
      fontSize: 100,
      fontFamily: "Impact",
      textColor: "#00ff00",
      position: { x: 540, y: 300, scaleX: 1, scaleY: 1 },
    },
    {
      id: 2,
      text: "50% off on all items",
      fontSize: 40,
      fontFamily: "Arial",
      textColor: "#000000",
      position: { x: 540, y: 700, scaleX: 1, scaleY: 1 },
    },
  ];
};

export const generateTextElements = (prompt) => {
  const lowerCasePrompt = prompt.toLowerCase();

  if (lowerCasePrompt.includes("product launch")) {
    return generateForProductLaunch();
  }

  if (lowerCasePrompt.includes("sale")) {
    return generateForSale();
  }

  // Default response
  return [
    {
      id: 1,
      text: "Your Text Here",
      fontSize: 60,
      fontFamily: "Arial",
      textColor: "#000000",
      position: { x: 540, y: 540, scaleX: 1, scaleY: 1 },
    },
  ];
};
