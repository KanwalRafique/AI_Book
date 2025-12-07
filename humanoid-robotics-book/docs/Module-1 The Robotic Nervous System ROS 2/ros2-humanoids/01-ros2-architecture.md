---
title: ROS 2 Architecture for Humanoids
slug: /ros2-humanoids/ros2-architecture
---

# Chapter 1: ROS 2 Architecture for Humanoids

## Objectives

1.  Understand the core components of ROS 2.
2.  Explain how ROS 2 communication mechanisms work.
3.  Identify the relevance of ROS 2 architecture for humanoid robot development.

## Explanation

ROS 2 (Robot Operating System 2) is an open-source middleware that provides a flexible framework for writing robot software. It is not an operating system in the traditional sense, but rather a collection of tools, libraries, and conventions that aim to simplify the task of creating complex robot applications. ROS 2 was designed to address the limitations of ROS 1, particularly concerning real-time performance, security, and support for multiple robot systems.

The core of ROS 2's architecture revolves around a distributed network of independent executable programs called **nodes**. Each node is responsible for a specific task, such as reading sensor data, controlling a motor, or performing complex computations. Nodes communicate with each other using various communication mechanisms:

1.  **Topics**: This is the most common communication pattern in ROS 2. Nodes publish data to named topics, and other nodes subscribe to those topics to receive the data. This is a one-to-many, asynchronous communication model, ideal for streaming data like sensor readings (e.g., camera images, LiDAR scans) or joint states. For humanoid robots, topics are crucial for broadcasting joint positions, sensor feedback, and receiving high-level commands.

2.  **Services**: Services provide a request/reply communication model. A **service server** offers a service, and a **service client** sends a request and waits for a response. This is a synchronous, one-to-one communication, suitable for tasks that require an immediate response, such as querying a robot's current state or triggering a specific action that has a definitive completion. For example, a humanoid robot might use a service to request a specific gait pattern or inquire about the status of its grippers.

3.  **Actions**: Actions are an extension of services, designed for long-running tasks that can be preempted or whose progress needs to be monitored. An action client sends a **goal** to an **action server**, which then provides periodic **feedback** on its progress and ultimately a **result**. This is essential for humanoid robots performing complex, multi-step behaviors like walking a certain distance, picking up an object, or performing a sequence of motions. Actions allow for robust execution and monitoring of these behaviors.

4.  **Parameters**: Parameters are configuration values that can be set and retrieved by nodes. They allow for dynamic adjustment of node behavior without recompiling the code. For a humanoid robot, parameters might define motor PID gains, sensor calibration values, or behavioral thresholds.

### Data Distribution Service (DDS)

A fundamental change in ROS 2 is its reliance on **DDS (Data Distribution Service)** as the underlying transport layer. DDS is an industry standard for real-time, high-performance, and scalable data-centric communication. It handles discovery, serialization, transport, and delivery guarantees, allowing ROS 2 developers to focus on application logic. This brings significant benefits for humanoid robotics, enabling more reliable communication over diverse network conditions and supporting stringent real-time requirements for control loops.

### ROS 2 Graph

The collection of all active nodes and their connections (topics, services, actions) forms the **ROS 2 Graph**. Tools like `rqt_graph` allow developers to visualize this graph, which is invaluable for debugging and understanding the flow of data and control within a complex humanoid robot system.

## Example (Conceptual/Pseudocode)

Here's a conceptual example of a simple ROS 2 system for a humanoid robot using topics and services.

```python
# Pseudocode for a humanoid robot's head control system

# Node: head_controller
# - Subscribes to /head_target_angles topic (receives desired pan/tilt)
# - Publishes to /head_joint_commands topic (sends commands to motor drivers)
# - Offers /set_head_mode service (e.g., "track_person", "look_forward")

# Node: human_tracker
# - Publishes to /head_target_angles topic (based on person detection)
# - Calls /set_head_mode service to switch head behavior

# Node: command_interface (e.g., from a GUI)
# - Publishes to /head_target_angles topic (for manual control)
# - Calls /set_head_mode service (e.g., "look_forward")

# Communication flow:
# human_tracker -> /head_target_angles -> head_controller
# command_interface -> /head_target_angles -> head_controller

# command_interface -> /set_head_mode service -> head_controller
# human_tracker -> /set_head_mode service -> head_controller
```

## Student Activity

1.  **Scenario Mapping**: Consider a humanoid robot designed to assist in a household. List at least three tasks that would be best implemented using ROS 2 Topics, three using Services, and three using Actions. Explain your reasoning for each choice.
2.  **Graph Sketching**: Sketch a ROS 2 graph for a simple humanoid robot system that includes:
    *   Nodes for a camera, a motor controller (for an arm), and a high-level "task planner."
    *   Topics for camera images, joint states, and arm movement commands.
    *   A service for "pick up object" that the task planner calls.
    *   An action for "walk to location" that the task planner monitors.

## Summary

ROS 2 provides a robust and flexible architecture for developing complex robot applications, especially for humanoid robots. Its distributed node-based design, coupled with powerful communication mechanisms like topics, services, and actions, enables modular and scalable software. The underlying DDS ensures reliable and performant data exchange, making ROS 2 an ideal framework for building the sophisticated control systems required by humanoids.
