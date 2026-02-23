# Gemini Instructions

This document provides a summary of the project and instructions for interacting with it.

## Project Summary

This project is a React-based image generator for social media posts. It uses the Fabric.js library to provide a canvas for designing images. Users can add and edit text, change background colors and gradients, and download the final image. The application is component-based, with different components for text editing, background editing, and template selection.

## How to Run the Project

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Key Files

*   `src/InstagramPostGenerator.js`: The main component that manages the canvas and its state.
*   `src/components/`: Directory containing the UI components for editing the image.
*   `src/models/`: Directory containing the JSON files with the templates.
*   `package.json`: Contains the project dependencies and scripts.

## Generating JSON

The application's state for each text element is managed in the `texts` array within the `InstagramPostGenerator.js` component. This array holds objects, where each object represents a text element and contains its properties, such as `text`, `fontSize`, `fontFamily`, `textColor`, and `position` (which includes `x`, `y`, `scaleX`, `scaleY`, and `angle`).

To generate a JSON representation of the current design, you would need to extract the state of the `texts` array and the background properties (`backgroundColor`, `gradientStart`, `gradientEnd`) from the `InstagramPostGenerator.js` component.
