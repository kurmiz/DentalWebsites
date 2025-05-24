import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '5000+', label: 'Happy Patients' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Dental Procedures' },
    { number: '99%', label: 'Success Rate' },
  ];

  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!inView) return;

      let startTime;
      const endValue = parseInt(end.replace(/\D/g, ''));
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * endValue));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }, [inView, end, duration]);

    return <span>{count}{end.replace(/\d/g, '')}</span>;
  };

  return (
    <section ref={ref} className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                <Counter end={stat.number} />
              </div>
              <div className="text-blue-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
