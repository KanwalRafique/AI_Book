---
title: Cognitive Planning - Translating Natural Language into ROS 2 Actions
slug: /vla-voice-control/cognitive-planning
---

# Chapter 2: Cognitive Planning - Translating Natural Language into ROS 2 Actions

## Objectives

1.  Understand the concept of cognitive planning in the context of robot control.
2.  Learn methods for translating natural language commands into structured robot actions.
3.  Explore how to map planned actions to ROS 2 communication mechanisms.

## Explanation

Once a voice command has been accurately transcribed into text (as discussed in Chapter 1), the next crucial step in a Vision-Language-Action (VLA) pipeline is **cognitive planning**. This involves understanding the intent behind the natural language command and translating it into a sequence of low-level, executable actions that the robot can perform. For ROS 2-powered humanoid robots, this means converting human-centric instructions into ROS 2 topics, services, or actions.

### What is Cognitive Planning?

Cognitive planning in robotics refers to the process of reasoning about a task, breaking it down into sub-goals, and generating a sequence of actions to achieve those sub-goals. When combined with natural language understanding (NLU), it allows a robot to interpret high-level instructions and devise a concrete plan for execution. This contrasts with purely reactive control, where the robot only responds to immediate sensor inputs.

The process typically involves:

1.  **Intent Recognition**: Identifying what the user wants the robot to do (e.g., "move," "grasp," "report status").
2.  **Entity Extraction**: Identifying key parameters or objects mentioned in the command (e.g., "forward," "red block," "battery level").
3.  **Action Generation/Selection**: Based on the intent and entities, selecting or generating an appropriate sequence of abstract robot actions.
4.  **Grounding**: Translating these abstract actions into specific, robot-executable commands, taking into account the robot's capabilities and the current environment state.

### Approaches to Natural Language to ROS 2 Action Translation

Several approaches can be used to perform this translation:

*   **Rule-Based Systems**: For simple commands, a set of predefined rules can map keywords and phrases directly to robot actions. This is straightforward but lacks flexibility.
*   **Semantic Parsing**: Converting natural language into a formal representation (e.g., logical forms, abstract meaning representations) that can then be processed by a planner.
*   **Machine Learning (ML) Models**:
    *   **Sequence-to-Sequence Models**: Modern NLP models (like fine-tuned transformers) can directly translate natural language commands into a sequence of robot actions or parameters.
    *   **Reinforcement Learning (RL)**: An RL agent can be trained to learn a policy that maps natural language observations and goals to a sequence of actions.
*   **Hybrid Approaches**: Combining rule-based systems for common patterns with ML models for more complex or ambiguous commands.

### Mapping to ROS 2 Actions

Once an action sequence is planned, it needs to be executed through ROS 2. The choice of ROS 2 communication mechanism depends on the nature of the action:

1.  **Topics**: For continuous or streaming commands (e.g., "move forward continuously"), a node can publish velocity commands to a `/cmd_vel` topic.
2.  **Services**: For single, discrete actions that require a definite response (e.g., "reset arms"), a service client can call a service server on the arm controller.
3.  **Actions**: For long-duration, interruptible tasks with feedback (e.g., "go to the kitchen"), an action client can send a goal to an action server that handles navigation.

### Example: "Move forward 1 meter"

*   **Transcribed Text**: "move forward 1 meter"
*   **Intent**: `move`
*   **Entities**: `direction: forward`, `distance: 1 meter`
*   **Abstract Action**: `move_distance(direction='forward', distance=1.0)`
*   **ROS 2 Mapping**:
    *   Could be a ROS 2 Action: `move_base` action server gets a goal `(x=1.0, y=0.0)`.
    *   Could be a sequence of ROS 2 Topic commands: Publish a series of `geometry_msgs/Twist` messages to `/cmd_vel` until 1 meter is covered, monitored by odometry.

## Example (Conceptual/Pseudocode)

Here's a conceptual Python script for a `CognitivePlanner` that translates a simple voice command into a ROS 2 Twist message.

```python
# Conceptual Python ROS 2 Node for Cognitive Planning

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import String # To receive transcribed text

class CognitivePlanner(Node):
    def __init__(self):
        super().__init__('cognitive_planner')
        self.cmd_vel_publisher = self.create_publisher(Twist, '/cmd_vel', 10)
        self.transcribed_text_subscriber = self.create_subscription(
            String,
            'voice_commands/text', # Topic where Whisper output is published
            self.text_command_callback,
            10)
        self.get_logger().info('Cognitive Planner Node Started')

    def text_command_callback(self, msg):
        command_text = msg.data.lower()
        self.get_logger().info(f"Received command: '{command_text}'")
        
        twist_msg = Twist()

        if "move forward" in command_text:
            # Example: Move forward for 1 second
            twist_msg.linear.x = 0.2 # meters/second
            self.cmd_vel_publisher.publish(twist_msg)
            self.get_logger().info("Executing: Move forward")
            # In a real system, you'd use a timer or a more robust action
            # to control duration or distance.
        elif "turn left" in command_text:
            twist_msg.angular.z = 0.5 # radians/second
            self.cmd_vel_publisher.publish(twist_msg)
            self.get_logger().info("Executing: Turn left")
        elif "stop" in command_text:
            twist_msg.linear.x = 0.0
            twist_msg.angular.z = 0.0
            self.cmd_vel_publisher.publish(twist_msg)
            self.get_logger().info("Executing: Stop")
        else:
            self.get_logger().warn(f"Unknown command: '{command_text}'")

def main(args=None):
    rclpy.init(args=args)
    node = CognitivePlanner()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Student Activity

1.  **Command Parsing**: Extend the `CognitivePlanner` example. Add support for more complex commands like "turn right 90 degrees" or "move forward 2 meters". How would you extract the numerical values and convert them into appropriate ROS 2 commands (e.g., angular rotation or linear distance goals)?
2.  **Action Sequence Planning**: Imagine a robot needs to "fetch me a book from the shelf." Break this high-level command down into a sequence of abstract robot actions (e.g., `navigate_to_shelf`, `identify_book`, `reach_for_book`, `grasp_book`, `navigate_to_user`). For each abstract action, suggest which ROS 2 communication mechanism (Topic, Service, or Action) would be most appropriate for its execution and why.

## Summary

Cognitive planning is the intelligent bridge between natural language commands and robot execution. By translating human instructions into structured, executable actions, robots can perform complex tasks autonomously. This chapter explored various approaches to this translation, emphasizing the crucial step of mapping planned actions to ROS 2's flexible communication mechanisms. Mastering cognitive planning, in conjunction with accurate speech-to-text, enables humanoid robots to become truly responsive and intelligent partners in diverse environments.
