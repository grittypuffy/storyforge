<div style="text-align: center;">
<dic style=" display: flex; flex-direction: row; justify-items: center; align-items: center;">
    <img src="./assets/HE_logo.png" height="150" width="400" alt="HackerEarth Logo" style="background-color: white;" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://www.intel.com/content/dam/www/central-libraries/us/en/images/intel-new-logo-16x9.jpg" height="150" width="300" alt="Intel Logo" />
</div>
<h1>HACKSTORM: INTEL® AI PC EDITION December 2024</h1>
<h3>
<a href="https://storyforge.hashnode.dev/storyforge-revolutionizing-writing-industry-with-ai-and-intel-technology">
    Blog Page Link
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://youtu.be/rFUfj-23Vv8">
    YouTube Demo Video
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://github.com/grittypuffy/storyforge">
    Github Repository Link
</a>
</h3>
<h1>StoryForge: Revolutionizing writing industry with AI and Intel® Technology</h1>
</div>

StoryForge is a client-side desktop application that leverages Intel® AI PC’s cutting-edge architecture and technologies which works offline to support novelists and writers by helping them with:
Analyzing the story for tone, emotion, structure, genres, etc.,
Generating Content – character names, descriptions, chapter suggestions, story titles, reconstructing the content based on needs, synopsis, outline, etc.,
Generating Images – character images based on description, cover image based on synopsis, etc.,

# Table of Contents

## Problem Statement

Writing a novel is a time-intensive, creative process that can overwhelm even seasoned writers.

**Challenges Include:**

- Crafting coherent narratives based on complex plots or storylines.
- Generating content that aligns with a given style, tone, or theme.
- Lack of visualization aids, such as images, which complement storytelling.
- Ensuring productivity and creativity when writer's block strikes.

There is a need for a solution that acts as a creative assistant, generating suggestions, maintaining coherence, and supplementing written content with visuals. This will empower writers to focus more on storytelling and less on repetitive or supplementary tasks.

## Solution Proposed

StoryForge is a client-side desktop application that leverages Intel® AI PC’s cutting-edge architecture and technologies which works offline to support novelists and writers by helping them by analyzing the story's tone, emotion, structure, and genre, while generating content such as character names, descriptions, chapter ideas, story titles, and synopses, along with creating visual assets like character illustrations and cover images based on the narrative.

## Architecture Diagram

<div><img src="./assets/architecture.png" alt="StoryForge Architecture"></div>

## Technologies Used

### **Optimum Intel**

Optimum Intel is a Python library that is specifically designed to enhance the speed and efficiency of AI workloads on Intel hardware. It optimizes the performance of AI models, particularly for tasks related to text and image generation. By integrating with popular libraries like diffusers and transformers, it facilitates the deployment of AI models directly on end-devices, ensuring that users can leverage powerful hardware capabilities for faster processing, even in resource-constrained environments.

### **Intel OpenVINO**

Intel OpenVINO (Open Visual Inference and Neural Network Optimization) is an open-source toolkit that aims to optimize and deploy deep learning models. It is designed to maximize the performance of models on Intel hardware, enabling efficient inference, improved execution times, and optimized use of system resources. By supporting a wide range of AI models, OpenVINO helps in enhancing the productivity of AI tasks across various applications such as image recognition, object detection, and more.

### **Python**

Python is a versatile, high-level programming language that is widely used for backend development in a variety of projects, including AI and machine learning applications. In this context, Python serves as the core language for handling API requests and interacting with AI models. It simplifies tasks related to data processing, model deployment, and communication with other components, making it an ideal choice for powering both text and image generation processes in the system.

### **FastAPI**

FastAPI is a modern, high-performance web framework for building APIs in Python. It is designed to be fast, easy to use, and highly compatible with asynchronous programming. FastAPI powers the backend of the application, managing the flow of data between the client-side and AI models. It enables quick development of APIs with built-in validation, automatic interactive documentation, and support for asynchronous requests, ensuring efficient operation of text and image generation tasks.

### **Poetry**

Poetry is a dependency management tool for Python that helps developers manage and maintain the libraries and packages needed for a project. It simplifies package installation, version control, and environment consistency, ensuring that all dependencies are up-to-date and compatible. Poetry also facilitates the creation of isolated environments for projects, making it easier to maintain different configurations for development, testing, and production.

### **Tauri**

Tauri is a cross-platform framework for building lightweight, secure, and efficient desktop applications using web technologies like HTML, CSS, and JavaScript. It ensures a small application bundle size while providing offline functionality and privacy. Tauri is often used alongside Rust to handle system-level tasks that require enhanced performance. This combination allows developers to create secure and performant applications while maintaining a native feel on Windows, macOS, and Linux.

### **Rust**

Rust is a systems programming language known for its memory safety, performance, and concurrency. It is often used to build fast and reliable system-level components, making it a perfect fit for high-performance applications. In this project, Rust works alongside Tauri to implement performance-critical tasks that require low-level system interactions. Its ability to handle concurrency and prevent memory errors makes it a preferred choice for ensuring the reliability and efficiency of the application.

### **Cargo**

Cargo is the Rust programming language’s package manager and build system. It is responsible for managing Rust project dependencies, compiling code, and running tests. Cargo simplifies the process of building and distributing Rust applications by automating many tasks, such as downloading necessary libraries and compiling source code into executable binaries. It streamlines the development process by ensuring that Rust projects remain organized and manageable.

### **Next.js**

Next.js is a React-based framework used for building web applications that are fast, SEO-friendly, and optimized for performance. It offers built-in server-side rendering (SSR) and static site generation (SSG), enabling developers to create highly responsive and search-engine optimized applications. In this project, Next.js is used for building the frontend of the application, ensuring that users can interact with the AI models through a seamless and engaging web interface.

### **JavaScript**

JavaScript is a dynamic programming language that runs in the browser and enables interactive features in web applications. It works alongside Next.js to power the frontend, managing user interactions, form submissions, and real-time updates. JavaScript is also used for handling client-side logic, such as managing dynamic content updates or integrating third-party APIs, providing a smooth and responsive user experience.

### **Bun**

Bun is a fast JavaScript runtime that replaces traditional bundlers and package managers like Webpack or npm. It offers improved performance during the development process by reducing the overhead associated with bundling and package management. Bun is used in this project to optimize the workflow, enhancing build times and enabling faster application development, particularly for JavaScript code.

### **Tailwind CSS**

Tailwind CSS is a utility-first CSS framework that enables rapid UI development by providing a comprehensive set of pre-defined utility classes. These classes allow developers to style HTML elements quickly and efficiently without writing custom CSS. Tailwind promotes a highly customizable and responsive design system, making it easier to build modern, attractive user interfaces while ensuring consistency across the application.

### **Hugging Face**

Hugging Face is a leading platform and library for natural language processing (NLP) and machine learning models. It provides a large collection of pre-trained models that can be easily integrated into various applications. In this project, Hugging Face’s models are used for tasks such as text generation and processing. The platform also supports integration with Intel OpenVINO, allowing for optimized performance during inference tasks.

### **SQLite**

SQLite is a lightweight, serverless database engine that stores data in a single file. It is commonly used for local data storage in applications where a full-fledged database server is not necessary. In this project, SQLite is used to store user profiles, preferences, and generated content, ensuring that the data is accessible offline and can be easily managed on users' devices.

### **Intel® AI PC**

Intel® AI PCs are specialized hardware devices built to handle intensive AI workloads efficiently. These systems are equipped with high-performance CPUs, GPUs, and AI accelerators designed to run complex algorithms and models locally, without relying on cloud infrastructure. By leveraging Intel’s hardware, the system ensures that AI-driven tasks, such as text and image generation, run faster and more efficiently, even in offline or low-connectivity environments.

<div style="text-align: center;">
  <img src="./assets/techstack.png" alt="Tech Stack">
</div>
</br>

# Development

## Structure

The project is structured as a monorepository with the following folders:

- `src`: Contains Next.js frontend source code.
- `src-tauri`: Contains Tauri specific configuration, handlers, and entry point for desktop application.
- `storyforge`: Backend containing entry point for FastAPI server.
- `tests`: Unit tests and integration tests for FastAPI server.

## Pre-requisites

Ensure you have the following dependencies installed on your system:

1. [Bun](https://bun.sh): Performant JavaScript runtime, bundler and dependency manager used for the frontend.
2. [Rust](https://www.rust-lang.org): Used for building cross-platform desktop application with Tauri. Install it via [`rustup`](https://www.rust-lang.org/learn/get-started)
3. [Poetry](https://python-poetry.org/): Packaging and dependency manager for Python, used for the FastAPI backend. It is assumed that you have Python installed on your system.

## Building the project

1. Clone the repository from GitHub

```shell
git clone https://github.com/grittypuffy/storyforge/
```

2. Install the needed dependencies

```shell
cd storyforge

poetry install # For installation of dependencies related to Python backend

bun install # Installs dependencies for frontend

cd src-tauri

cargo update # Updates the dependencies
```

3. Run the development build using `cargo tauri dev`

## Novelty

- Even though few AI tools for writing exists – they are majorly for informational writing rather than for writing stories, novels involving **creativity and generating images** for the same.

- Our novelty involves **support to novelists and story writers** in creating their characters, story places, reconstructing story lines, creating cover images, character images, character description, chapter wise suggestions, story reconstruction, etc.,

- Another novelty of our application is that it is not working on cloud and no data from the user is stored with us. Instead, it is being stored locally in the user’s device and hence it ensures **full privacy of user data**.

- It also runs completely **locally offline** on the user’s device which is **optimized** for Intel AI PC processors. Hence the user require no internet to work with our application.

# Team

### Team Name: Enigmatic Trios

#### Team Members:

- **Keerthana R**: [GitHub Profile](https://github.com/grittypuffy)
- **Arun Pranav A T**: [GitHub Profile](https://github.com/arunpranav-at)
- **Pooja Srikanth**: [GitHub Profile](https://github.com/Poojsri)

## Contributing

Fork the project, create a new branch and add your dependencies needed for the project, or make changes to the source file as needed.

Add dependencies for the build during development by the following commands:

- For Tauri: `cargo add <dependency-crate-name>`
- For Next.js frontend: `bun add <npm-dependency-name>`
- For Python backend: `poetry add <pypi-dependency-name>`. Ensure that you have the virtual environment activated for this to work. You can use `poetry shell` for activating it.

We welcome contributions and feedback from the community to enhance our document validation solution. Your insights are invaluable in shaping the future of this project.

- **Contributions**: We encourage developers to contribute code, documentation, and ideas to improve functionality and usability.
- **Feedback**: Please share your thoughts and experiences to help us identify areas for improvement and feature enhancements.
- **Issue Reporting**: If you encounter any issues, we invite you to raise them through our issue tracker, ensuring that we can address them promptly.

### **Note:**

SSR (Server-side Rendering) isn't supported in Tauri, so we use SSG (Static-Site Generation). [Check this blog post for more information regarding this](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)
