import React, { useCallback } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroSection)}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={clsx('hero__title', styles.heroTitle)} variants={itemVariants}>
          Physical AI & Humanoid Robotics
        </motion.h1>
        <motion.p className={clsx('hero__subtitle', styles.heroSubtitle)} variants={itemVariants}>
          Building natural human interaction using ROS 2, Gazebo, and NVIDIA Isaac
        </motion.p>
        <div className={styles.buttons}>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Explore the Book 🚀
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}

function Module({title, description}) {
  return (
    <motion.div
      className={clsx('col col--6')}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <div className={clsx('card', styles.moduleCard)}>
        <div className="card__header">
          <h3 className={styles.moduleCardTitle}>{title}</h3>
        </div>
        <div className="card__body">
          {description}
        </div>
      </div>
    </motion.div>
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
    <motion.section
      className={styles.finalSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}>
      <div className="container">
        <p className={styles.finalSectionText}>
          Why Physical AI Matters: Dive into the critical role of physical AI and humanoid robotics in shaping our future. This book explores how these technologies are not just mimicking human capabilities but are extending them, enabling new forms of interaction, automation, and discovery in the physical world. From enhancing accessibility to revolutionizing industries, physical AI stands at the forefront of innovation, promising a future where intelligent machines seamlessly integrate with human endeavors, creating a more efficient, safer, and interactive world.
        </p>
      </div>
    </motion.section>
  );
}

export default function Home(): JSX.Element {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="Explore the world of Physical AI and Humanoid Robotics with this comprehensive guide.">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            background: {
                color: {
                    value: '#1f0022',
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                    resize: true,
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ['#ff4ef3', '#00ffe0'],
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: false,
                    opacity: 0.1,
                    width: 1,
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'out',
                    },
                    random: true,
                    speed: 0.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 50,
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }}
      />
      <HomepageHeader />
      <main>
        <ModulesSection />
        <FinalSection />
      </main>
    </Layout>
  );
}