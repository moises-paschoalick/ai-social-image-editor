# About This Project

This project is a web-based image generator designed for creating simple and stylish posts for social media, similar to Canva. It provides a user-friendly interface to design images with custom text, colors, and backgrounds.

## Core Features

*   **Template-based Design:** Start your design by choosing from a list of predefined templates.
*   **Text Editing:** Add, edit, and style text elements on your image. You can change the font, size, and color of the text.
*   **Background Customization:** Customize the background of your image with solid colors or gradients.
*   **Object Manipulation:** Move, scale, and rotate text elements on the canvas.
*   **Image Export:** Download your final creation as a high-quality PNG image.

## Technical Overview

The application is built using the following technologies:

*   **React:** A JavaScript library for building user interfaces.
*   **Fabric.js:** A powerful JavaScript library that makes it easy to work with the HTML5 canvas element. It is used for all the canvas-related operations, including text and background manipulation.
*   **JSON:** Templates and styles are defined in JSON files, making it easy to add new templates and styles.

The project is structured into several React components, each responsible for a specific part of the user interface, such as the text editor, background editor, and toolbar. The main `InstagramPostGenerator` component manages the state of the canvas and its elements.
