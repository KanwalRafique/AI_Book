import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      link: {type: 'doc', id: 'Module-1 The Robotic Nervous System ROS 2/ros2-humanoids/ros2-architecture'},
      items: ['Module-1 The Robotic Nervous System ROS 2/ros2-humanoids/ros2-architecture'],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin',
      link: {type: 'doc', id: 'Module-2 The Digital Twin/digital-twin-simulation/gazebo-physics'},
      items: ['Module-2 The Digital Twin/digital-twin-simulation/gazebo-physics'],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain',
      link: {type: 'doc', id: 'Module-3 The AI-Robot Brain/nvidia-isaac-book/isaac-sim'},
      items: ['Module-3 The AI-Robot Brain/nvidia-isaac-book/isaac-sim'],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      link: {type: 'doc', id: 'Module-4 Vision-Language-Action/vla-voice-control/voice-to-action'},
      items: ['Module-4 Vision-Language-Action/vla-voice-control/voice-to-action'],
    },
  ],
};

export default sidebars;
