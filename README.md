# StoryForge

> Transforming Writing with AI and Intel® Technology

# Technologies Used

1. **Optimum Intel:**
    Python library designed for enabling and acceleration of AI workloads on Intel hardware. This aids in efficient generation of
    text and images for creative writers right from in-editor suggestions to character images. It provides an interface between
    diffusers and transformers for optimized performance on end-devices.

2. **Intel OpenVINO:**
    Open-source software toolkit used for optimization of deep learning models.

3. **Tauri:**
    Cross-platform desktop application framework used for developing StoryForge. It supports usage of existing web frameworks for faster development, without
    sacrificing performance, bundle size and security. This ensures enhanced user experience (UX) and offline operation, without the need for a network, under the privacy
    of theyr own devices.

4. **Next.js:**

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

## Contributing

Fork the project, create a new branch and add your dependencies needed for the project, or make changes to the source file as needed.

1. Add dependencies for the build during development by the following commands:

- For Tauri: `cargo add <dependency-crate-name>`
- For Next.js frontend: `bun add <npm-dependency-name>`
- For Python backend: `poetry add <pypi-dependency-name>`. Ensure that you have the virtual environment activated for this to work. You can use `poetry shell` for activating it.

### **Note:**

SSR (Server-side Rendering) isn't supported in Tauri, so we use SSG (Static-Site Generation). [Check this blog post for more information regarding this](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)