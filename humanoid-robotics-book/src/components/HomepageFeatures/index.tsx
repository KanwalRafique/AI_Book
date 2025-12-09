import React from 'react';
import Admonition from '@theme/Admonition';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const ModuleCard = ({ title, week, description, link }) => (
  <div className="col col--6 margin-bottom--lg">
    <div className="card" style={{ height: '100%' }}>
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
      </div>
      <div className="card__body">
        <p><em>{week}</em></p>
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <a href={link} style={{ color: 'var(--ifm-color-primary)' }}>
          Start Module →
        </a>
      </div>
    </div>
  </div>
);

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--xl">
          Tutorial Introduction: Welcome to Physical AI & Humanoid Robotics
        </Heading>

        <div className="row">
          <div className="col">
            <Heading as="h3">🚀 About This Textbook</Heading>
            <p>
              This open-source textbook is your launchpad into the world of Physical AI—where intelligent software meets the physical world. We'll guide you through building the "brain" of a humanoid robot, from basic ROS 2 controls to advanced voice-activated commands. This is a hands-on, project-based journey designed for builders, creators, and pioneers.
            </p>

            <Heading as="h3">🎯 What You'll Learn</Heading>
            <ul>
              <li><strong>ROS 2:</strong> Master the core framework for robotics development.</li>
              <li><strong>Digital Twins:</strong> Simulate robots in Gazebo and Unity.</li>
              <li><strong>NVIDIA Isaac:</strong> Leverage powerful tools for AI perception and navigation.</li>
              <li><strong>Vision-Language-Action (VLA):</strong> Build systems that understand and execute voice commands.</li>
            </ul>

            <Heading as="h3">🤖 The Future of Work</Heading>
            <p>
              Humanoid robots are poised to revolutionize industries by taking on dangerous, dull, and dirty jobs. By learning these skills, you're positioning yourself at the forefront of the next technological wave. This isn't just about coding; it's about shaping the future of how we work and live.
            </p>
            <p><strong>WHY PHYSICAL AI MATTERS:</strong> Because the future isn’t just on a screen. It’s out in the world, interacting with us.</p>
          </div>
        </div>

        <div className="row margin-top--xl">
          <div className="col">
            <Heading as="h3" className="text--center">Course Structure & Roadmap</Heading>
            <p className="text--center">A 13-week journey from foundational concepts to a full-fledged capstone project.</p>
            {/* Simple table-like structure using divs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
              <strong>Weeks 1-5:</strong>   <span>Module 1: The Robotic Nervous System (ROS 2)</span>
              <strong>Weeks 6-7:</strong>   <span>Module 2: The Digital Twin (Gazebo & Unity)</span>
              <strong>Weeks 8-10:</strong>  <span>Module 3: The AI-Robot Brain (NVIDIA Isaac)</span>
              <strong>Weeks 11-13:</strong> <span>Module 4: Vision-Language-Action & Capstone Project</span>
            </div>
          </div>
        </div>

        <div className="row margin-top--xl">
          <ModuleCard
            title="Module 1: ROS 2"
            week="Weeks 1-5"
            description="Build the foundational communication and control system for a humanoid robot using the Robot Operating System (ROS 2)."
            link="/docs/Module-1%20The%20Robotic%20Nervous%20System%20ROS%202/ros2-humanoids/01-ros2-architecture"
          />
          <ModuleCard
            title="Module 2: The Digital Twin"
            week="Weeks 6-7"
            description="Create and control a simulated robot in high-fidelity environments like Gazebo and Unity for safe testing and development."
            link="/docs/Module-2%20The%20Digital%20Twin/digital-twin-simulation/01-gazebo-physics"
          />
          <ModuleCard
            title="Module 3: The AI-Robot Brain"
            week="Weeks 8-10"
            description="Integrate advanced AI perception, navigation, and manipulation using the powerful NVIDIA Isaac robotics platform."
            link="/docs/Module-3%20The%20AI-Robot%20Brain/nvidia-isaac-book/01-isaac-sim"
          />
          <ModuleCard
            title="Module 4: Vision-Language-Action (VLA)"
            week="Weeks 11-13"
            description="Implement cutting-edge AI models that connect voice commands to robotic actions, culminating in a capstone project."
            link="/docs/Module-4%20Vision-Language-Action/vla-voice-control/01-voice-to-action"
          />
        </div>

        <div className="row margin-top--xl">
          <div className="col col--8 col--offset-2">
            <Heading as="h3">🎓 Learning Approach</Heading>
            <p>Each week, you get:</p>
            <ul>
              <li><strong>📖 Theory:</strong> Bite-sized explanations of core concepts.</li>
              <li><strong>💻 Runnable Code:</strong> Practical, hands-on examples you can run instantly.</li>
              <li><strong>🤖 Project-Based Learning:</strong> Apply what you learn to a cumulative humanoid robot project.</li>
              <li><strong>🧠 Quizzes:</strong> Test your knowledge and reinforce key ideas.</li>
            </ul>

            <Heading as="h3">Prerequisites</Heading>
            <Admonition type="note" title="No Robotics Experience Required!">
              <p>This textbook is designed for beginners. All you need is:</p>
              <ul>
                <li>Basic Python programming skills.</li>
                <li>Familiarity with the command line.</li>
                <li>A passion for building the future!</li>
              </ul>
            </Admonition>

            <Heading as="h3">💡 Interactive Learning Features</Heading>
            <ul>
              <li><strong>Embedded Terminals:</strong> Run code directly in your browser.</li>
              <li><strong>Interactive Quizzes:</strong> Get instant feedback on your understanding.</li>
              <li><strong>Community Support:</strong> Join our Discord to ask questions and collaborate.</li>
            </ul>

            <Heading as="h3">📬 Stay Connected</Heading>
            <ul>
              <li><a href="#">Join our Discord Community</a></li>
              <li><a href="https://github.com/your-repo">Contribute on GitHub</a></li>
              <li><a href="#">Follow us on Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
