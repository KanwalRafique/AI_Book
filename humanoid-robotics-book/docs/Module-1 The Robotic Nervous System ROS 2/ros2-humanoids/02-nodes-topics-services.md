---
title: Nodes, Topics, Services with rclpy
slug: /ros2-humanoids/nodes-topics-services-rclpy
---

# Chapter 2: Nodes, Topics, Services with rclpy

## Objectives

1.  Understand how to create and manage ROS 2 nodes using `rclpy`.
2.  Implement publishers and subscribers for ROS 2 topics in Python.
3.  Implement service servers and clients for ROS 2 services in Python.

## Explanation

`rclpy` is the Python client library for ROS 2, providing a clean and intuitive API for interacting with the ROS 2 system. It allows developers to write ROS 2 applications in Python, leveraging its ease of use and extensive ecosystem of libraries. This chapter will focus on the fundamental building blocks of ROS 2 applications in Python: nodes, topics, and services.

### Nodes (`rclpy.node.Node`)

A ROS 2 **node** is the basic unit of computation. In `rclpy`, a node is typically implemented as a Python class that inherits from `rclpy.node.Node`. The `Node` class provides access to all ROS 2 functionalities, such as creating publishers, subscribers, service servers, and clients.

To create a node, you first initialize `rclpy` and then create an instance of your custom node class. The `main` function in a Python ROS 2 application usually handles this setup.

```python
import rclpy
from rclpy.node import Node

class MyHumanoidNode(Node):
    def __init__(self):
        super().__init__('my_humanoid_node') # Name of the node

def main(args=None):
    rclpy.init(args=args) # Initialize ROS 2 client library
    node = MyHumanoidNode() # Create an instance of our node
    try:
        rclpy.spin(node) # Keep node alive until Ctrl+C or shutdown
    except KeyboardInterrupt:
        pass
    node.destroy_node() # Clean up node
    rclpy.shutdown() # Shut down ROS 2 client library

if __name__ == '__main__':
    main()
```

### Topics (`rclpy.publisher.Publisher` and `rclpy.subscription.Subscription`)

**Topics** are the backbone of data streaming in ROS 2. Nodes communicate by publishing messages to topics or subscribing to messages from topics.

#### Publishers

To create a **publisher**, you specify the message type (e.g., `std_msgs.msg.String`), the topic name (e.g., `/chatter`), and the quality of service (QoS) settings. The publisher then uses its `publish` method to send messages.

```python
from std_msgs.msg import String
import rclpy
from rclpy.node import Node

class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        self.publisher_ = self.create_publisher(String, 'chatter', 10) # QoS of 10
        timer_period = 0.5 # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS 2! {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1
```

#### Subscribers

To create a **subscriber**, you also specify the message type, topic name, and QoS settings. Additionally, you provide a callback function that will be executed whenever a new message arrives on the subscribed topic.

```python
from std_msgs.msg import String
import rclpy
from rclpy.node import Node

class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10) # QoS of 10
        self.subscription # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
```

### Services (`rclpy.service.Service` and `rclpy.client.Client`)

**Services** are used for request/reply communication. They are ideal for operations that are short-lived and require a response.

#### Service Servers

To implement a **service server**, you define a callback function that takes a request message and returns a response message. The service server is created using `create_service`.

```python
from example_interfaces.srv import AddTwoInts # Custom service message
import rclpy
from rclpy.node import Node

class SimpleServiceServer(Node):
    def __init__(self):
        super().__init__('simple_service_server')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: a={request.a}, b={request.b}')
        return response
```

#### Service Clients

A **service client** sends a request to a service server and waits for a response. The `call_async` method is used to send the request, which returns a future object that can be waited upon.

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class SimpleServiceClient(Node):
    def __init__(self):
        super().__init__('simple_service_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future) # Wait for response
        return self.future.result()
```

## Example (Conceptual/Pseudocode)

Consider a humanoid robot's arm control. A high-level planner might request the arm to move to a specific joint configuration using a service. The arm's joint controllers might publish their current states on a topic.

```python
# Pseudocode for humanoid arm control

# Node: arm_controller
# - Subscribes to /joint_state_commands topic (receives target joint values)
# - Publishes to /current_joint_states topic (reports actual joint values)
# - Offers /set_arm_pose service (e.g., 'home', 'ready_to_grasp')

# Node: high_level_planner
# - Subscribes to /current_joint_states topic (monitors arm position)
# - Calls /set_arm_pose service to request pre-defined arm poses

# Example interaction:
# 1. Planner calls /set_arm_pose service with 'ready_to_grasp'
# 2. Arm controller moves joints, publishing updates to /current_joint_states
# 3. Once target pose is reached, arm controller returns success via service response
# 4. Planner then proceeds with grasping logic
```

## Student Activity

1.  **Topic Communication**: Create two Python ROS 2 nodes. One node (e.g., `joint_state_publisher`) should publish a custom message containing a list of joint names and their values (e.g., `['hip_pitch', 'knee_pitch']`, `[0.1, 0.5]`) to a topic. The second node (e.g., `joint_state_listener`) should subscribe to this topic and print the received joint states to the console.
2.  **Service Interaction**: Extend the previous activity. Add a service to your `joint_state_listener` node (now `joint_state_server`) that, when called with a request (e.g., `bool reset_joints`), resets all joint values to zero and returns a success message. Create a third node (`joint_state_client`) that calls this service.

## Summary

`rclpy` provides Python developers with a powerful and accessible interface to the ROS 2 ecosystem. By understanding and implementing nodes, topics, and services, you can build complex, distributed robot applications. Topics facilitate asynchronous data streaming, ideal for sensor feedback and continuous state updates. Services enable synchronous request/reply interactions, perfect for commanding discrete actions or querying specific states. Mastering these communication primitives is crucial for developing sophisticated control and perception systems for humanoid robots.
