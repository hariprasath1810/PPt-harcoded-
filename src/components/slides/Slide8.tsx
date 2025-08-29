import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

type Startup = {
  name: string;
  description: string;
  logo: string;
  delay: number;
};

const Card = ({ logo, name, description, delay }: Startup) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{
      y: -10,
      scale: 1.05,
      boxShadow: '0 18px 36px rgba(0,0,0,0.15)',
    }}
    style={{
      flex: '1 1 0',
      maxWidth: 280,
      borderRadius: 16,
      background: '#fff',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 24,
      textAlign: 'center',
      border: '1px solid rgba(0,0,0,0.06)',
      minHeight: 260,
      margin: '0 auto',
      transition: 'all 0.25s ease',
    }}
  >
    {/* Logo with a gentle pop-in */}
    <motion.img
      src={logo}
      alt={name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: delay + 0.1 }}
      style={{
        width: 110,
        height: 110,
        marginBottom: 16,
        borderRadius: 16,
        objectFit: 'contain',
        background: '#ffffff',
        padding: 10,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f4bb.svg';
      }}
    />
    <h3
      style={{
        margin: 0,
        color: '#1f2937',
        fontSize: '1.1rem',
        fontWeight: 700,
        letterSpacing: 0.2,
      }}
    >
      {name}
    </h3>
    <p style={{ fontSize: '0.92rem', marginTop: 8, color: '#6b7280', lineHeight: 1.45 }}>
      {description}
    </p>
  </motion.div>
);

const WhatsNewDifferentAISlide = () => {
  // "What's New & Different in AI" content
  const startups: Startup[] = [
    {
      name: 'Generative Models',
      description: 'AI that creates text, images, audio, and video.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f3a8.svg', // 🎨
      delay: 0.2,
    },
    {
      name: 'Accessibility',
      description: 'Powerful AI tools available to businesses & individuals.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f310.svg', // 🌐
      delay: 0.3,
    },
    {
      name: 'Multimodality',
      description: 'Combining text, images, and audio for better results.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f3a4.svg', // 🎤
      delay: 0.4,
    },
    {
      name: 'Scale',
      description: 'Applied across industries at global scale.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f680.svg', // 🚀
      delay: 0.5,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        ...slideContainer,
        backgroundColor: '#f8f9fa',
        padding: '40px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          ...titleStyle,
          fontSize: '2.8rem',
          color: '#111827',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        What’s New and Different in AI?
      </motion.h2>

      {/* Row 1 – first 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {startups.slice(0, 3).map((s) => (
          <Card key={s.name} {...s} />
        ))}
      </motion.div>

      {/* Row 2 – remaining */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 700,
          marginTop: 10,
        }}
      >
        {startups.slice(3).map((s) => (
          <Card key={s.name} {...s} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WhatsNewDifferentAISlide;
