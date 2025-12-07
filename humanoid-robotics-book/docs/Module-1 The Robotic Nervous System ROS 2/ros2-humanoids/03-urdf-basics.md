---
title: URDF Basics for Humanoid Modeling
slug: /ros2-humanoids/urdf-basics
---

# Chapter 3: URDF Basics for Humanoid Modeling

## Objectives

1.  Understand the purpose and structure of URDF files.
2.  Learn to define links and joints for a basic robotic arm segment.
3.  Comprehend how URDF is used to represent humanoid robot kinematics.

## Explanation

**URDF (Unified Robot Description Format)** is an XML format used in ROS to describe all aspects of a robot. It's crucial for simulating robots in tools like Gazebo, visualizing them in RViz, and performing kinematic and dynamic computations. For humanoid robots, URDF provides a standardized way to define their complex articulated structures, including multiple limbs, hands, and heads.

A URDF file essentially defines a robot as a tree of **links** (rigid bodies) connected by **joints** (articulations that allow relative motion between links).

### Links (`<link>`)

A **link** represents a rigid part of the robot. Each link has:
-   **Visual properties**: How the link looks (geometry, material, color). This is used for rendering in visualization tools.
-   **Collision properties**: How the link interacts physically with other objects in a simulation (geometry, origin). This is crucial for collision detection.
-   **Inertial properties**: The mass, center of mass, and inertia matrix of the link. These are essential for accurate physics simulation.

```xml
<link name="base_link">
  <visual>
    <geometry><box size="0.1 0.1 0.05"/></geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>
  <collision>
    <geometry><box size="0.1 0.1 0.05"/></geometry>
  </collision>
  <inertial>
    <mass value="1.0"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
  </inertial>
</link>
```

### Joints (`<joint>`)

A **joint** describes the kinematic and dynamic properties of the connection between two links: a `parent` link and a `child` link. Each joint has:
-   **Type**: Specifies the degree of freedom allowed by the joint (e.g., `revolute` for rotation around an axis, `prismatic` for linear motion, `fixed` for no motion). Humanoid robots primarily use `revolute` joints for their limbs.
-   **Origin**: The pose of the child link relative to the parent link.
-   **Axis**: For revolute and prismatic joints, this defines the axis of motion.
-   **Limits**: Define the joint's movement range (upper/lower limits for position, velocity, effort).
-   **Dynamics**: Friction and damping coefficients for physics simulation.

```xml
<joint name="shoulder_roll_joint" type="revolute">
  <parent link="base_link"/>
  <child link="upper_arm_link"/>
  <origin xyz="0.05 0 0.075" rpy="0 0 0"/>
  <axis xyz="1 0 0"/> <!-- Rotates around X-axis -->
  <limit lower="-1.57" upper="1.57" effort="100" velocity="10"/>
</joint>
```

### Humanoid Kinematics in URDF

For humanoid robots, URDF models a complex chain of links and joints to represent their legs, arms, torso, and head. The hierarchy starts from a `base_link` (often the torso or pelvis) and branches out to the various limbs.

-   **Legs**: Typically involve `hip_pitch`, `hip_roll`, `knee_pitch`, `ankle_pitch`, `ankle_roll` joints to provide multiple degrees of freedom for walking and balancing.
-   **Arms**: Include `shoulder_pitch`, `shoulder_roll`, `elbow_pitch`, and sometimes `wrist` joints for manipulation.
-   **Torso/Spine**: Can have `fixed` joints or `revolute` joints for torso flexibility.
-   **Head**: Usually consists of `neck_pitch` and `neck_yaw` for looking around.

The proper definition of each link's inertia and each joint's limits and axes is critical for realistic simulation and precise control of humanoid movements.

## Example (Conceptual/Pseudocode)

A simplified URDF structure for a humanoid leg:

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">

  <link name="base_link">
    <visual><geometry><box size="0.2 0.2 0.4"/></geometry></visual>
    <collision><geometry><box size="0.2 0.2 0.4"/></geometry></collision>
    <inertial><mass value="5.0"/><origin xyz="0 0 0"/><inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/></inertial>
  </link>

  <joint name="hip_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_leg_link"/>
    <origin xyz="0 0 -0.2" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="10"/>
  </joint>

  <link name="upper_leg_link">
    <visual><geometry><box size="0.05 0.05 0.3"/></geometry></visual>
    <collision><geometry><box size="0.05 0.05 0.3"/></geometry></collision>
    <inertial><mass value="1.0"/><origin xyz="0 0 -0.15"/><inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.001"/></inertial>
  </link>

  <joint name="knee_joint" type="revolute">
    <parent link="upper_leg_link"/>
    <child link="lower_leg_link"/>
    <origin xyz="0 0 -0.3" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit lower="-1.57" upper="0" effort="100" velocity="10"/>
  </joint>

  <link name="lower_leg_link">
    <visual><geometry><box size="0.05 0.05 0.3"/></geometry></visual>
    <collision><geometry><box size="0.05 0.05 0.3"/></geometry></collision>
    <inertial><mass value="0.8"/><origin xyz="0 0 -0.15"/><inertia ixx="0.008" ixy="0" ixz="0" iyy="0.008" iyz="0" izz="0.0008"/></inertial>
  </link>

</robot>
```

## Student Activity

1.  **Analyze an existing URDF**: Find an open-source URDF file for a humanoid robot (e.g., from the ROS community or GitHub). Identify and list all `link` and `joint` definitions. For each joint, determine its `type` and `axis`.
2.  **Extend a simple arm**: Take the arm segment example from the text (or create a new one with two links and one joint). Extend it to include a third link (e.g., a hand or gripper) and an additional joint connecting it to the second link. Define its visual, collision, and inertial properties.

## Summary

URDF is an indispensable tool for describing the physical structure of humanoid robots within the ROS ecosystem. By defining links as rigid bodies and joints as their connections, URDF enables accurate visualization, simulation, and kinematic control. Understanding how to structure URDF files, including the properties of links (visual, collision, inertial) and joints (type, origin, axis, limits), is foundational for anyone working with complex articulated robots like humanoids.
