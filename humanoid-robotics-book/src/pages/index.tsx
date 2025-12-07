import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const ModuleList = [
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    description: (
      <ul className={styles.moduleCardList}>
        <li>Nodes, Topics, Services</li>
        <li>Python agents using rclpy</li>
        <li>Humanoid URDF modeling</li>
      </ul>
    ),
  },
  {
    title: 'Module 2: The Digital Twin (Gazebo & Unity)',
    description: (
      <ul className={styles.moduleCardList}>
        <li>Physics simulation and collisions</li>
        <li>Human–robot interaction</li>
        <li>Sensors: LiDAR, Depth Camera, IMU</li>
      </ul>
    ),
  },
  {
    title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
    description: (
      <ul className={styles.moduleCardList}>
        <li>Isaac Sim and synthetic data</li>
        <li>Isaac ROS acceleration</li>
        <li>Nav2 humanoid navigation</li>
      </ul>
    ),
  },
  {
    title: 'Module 4: Vision–Language–Action (VLA)',
    description: (
      <ul className={styles.moduleCardList}>
        <li>Voice commands (Whisper)</li>
        <li>LLM-based task planning</li>
        <li>Capstone: Autonomous humanoid robot</li>
      </ul>
    ),
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroSection)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.heroTitle)}>Physical AI & Humanoid Robotics</h1>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>Building natural human interaction using ROS 2, Gazebo, and NVIDIA Isaac</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore the Book 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

function Module({title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className={clsx('card', styles.moduleCard)}>
        <div className="card__header">
          <h3 className={styles.moduleCardTitle}>{title}</h3>
        </div>
        <div className="card__body">
          {description}
        </div>
      </div>
    </div>
  );
}

function ModulesSection() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <h2 className="text--center margin-bottom--xl">Book Modules</h2>
        <div className={clsx('row', styles.modulesGrid)}>
          {ModuleList.map((props, idx) => (
            <Module key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalSection() {
  return (
    <section className={styles.finalSection}>
      <div className="container">
        <p className={styles.finalSectionText}>
          Why Physical AI Matters: Dive into the critical role of physical AI and humanoid robotics in shaping our future. This book explores how these technologies are not just mimicking human capabilities but are extending them, enabling new forms of interaction, automation, and discovery in the physical world. From enhancing accessibility to revolutionizing industries, physical AI stands at the forefront of innovation, promising a future where intelligent machines seamlessly integrate with human endeavors, creating a more efficient, safer, and interactive world.
        </p>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="Explore the world of Physical AI and Humanoid Robotics with this comprehensive guide.">
      <HomepageHeader />
      <main>
        <ModulesSection />
        <FinalSection />
      </main>
    </Layout>
  );
}

