---
title: Hardware Requirements
slug: /supplementary/hardware-requirements
---

# Hardware Requirements

This book focuses on the software and conceptual aspects of Physical AI and Humanoid Robotics. While a physical humanoid robot is not strictly required to follow along with the concepts and simulation exercises, having access to certain hardware can significantly enhance your learning experience.

## Minimum Recommended Hardware

To run the simulations and development environments effectively, we recommend the following minimum hardware specifications:

1.  **Processor (CPU)**: Intel Core i7 (8th Gen or newer) or AMD Ryzen 7 (2nd Gen or newer). A processor with a high clock speed and multiple cores is beneficial for simulation environments.
2.  **Memory (RAM)**: 16 GB DDR4 RAM. 32 GB is highly recommended for running multiple simulations simultaneously or for larger, more complex models.
3.  **Graphics Card (GPU)**: NVIDIA GeForce RTX 2060 or AMD Radeon RX 5700. A dedicated GPU is essential for photorealistic simulations (e.g., NVIDIA Isaac Sim), visualization tools (e.g., RViz2), and any AI/ML model training.
    *   **For NVIDIA Isaac Sim**: An NVIDIA RTX series GPU (RTX 2060 or newer) is highly recommended due to its reliance on NVIDIA's CUDA and OptiX technologies.
4.  **Storage**: 512 GB SSD (Solid State Drive). A fast SSD is crucial for quick loading times of large simulation assets and operating systems.
5.  **Operating System**: Ubuntu 20.04 LTS (recommended for ROS 2 development) or Windows 10/11 (for Unity development and NVIDIA Isaac Sim). Dual-booting or using a virtual machine for Ubuntu is a common practice.
6.  **Display**: Full HD (1920x1080) monitor.
7.  **Internet Connection**: Stable broadband internet connection for software downloads and updates.

## Recommended Additional Hardware (for enhanced experience)

These components are not strictly necessary but can provide a more immersive and practical learning experience.

1.  **High-Performance GPU**: NVIDIA GeForce RTX 3070 / RTX 4070 or higher. This will significantly improve performance in Isaac Sim and speed up any deep learning model training.
2.  **Additional RAM**: 32 GB or 64 GB for advanced simulation and AI development.
3.  **Humanoid Robot Kit (e.g., OpenCR, Robotis OP3, or similar)**: For hands-on experience with physical hardware. This would allow you to deploy and test the control algorithms learned in this book on a real robot.
4.  **ROS 2 Compatible Sensors**: If working with a physical robot, ensure you have access to sensors like LiDAR, depth cameras, and IMUs for real-world data collection.
5.  **Development Board (e.g., NVIDIA Jetson Nano/Xavier NX)**: For deploying and testing AI models at the edge on an actual embedded robot platform.

## Software Requirements (Overview)

While the book focuses on concepts, you will be interacting with various software tools:

*   **Operating System**: Ubuntu 20.04 LTS (recommended for ROS 2)
*   **ROS 2**: Humble Hawksbill or newer
*   **Python**: Version 3.8+
*   **Gazebo**: Garden or Fortress (or newer)
*   **Unity**: Latest LTS version (for robotics, typically paired with Unity Robotics Hub)
*   **NVIDIA Isaac Sim**: Latest available version (requires NVIDIA GPU)
*   **OpenAI Whisper**: Python library
*   **Text Editor/IDE**: VS Code, PyCharm, or similar.

This hardware and software setup will provide a robust foundation for your journey into Physical AI and Humanoid Robotics.
