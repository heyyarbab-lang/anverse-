import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-2xl p-6 border border-white/5",
        hoverEffect && "hover:border-emerald-500/30 hover:shadow-emerald-900/20",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
