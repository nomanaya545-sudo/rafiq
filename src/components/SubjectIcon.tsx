import {
  Atom,
  BookOpen,
  Calculator,
  Dna,
  FlaskConical,
  Globe,
  Landmark,
  Laptop,
  Map,
  MoonStar,
  Users,
  Zap,
} from 'lucide-react';
import type { SubjectIconKey } from '../data/curriculum';

interface SubjectIconProps {
  icon: SubjectIconKey;
  className?: string;
}

export function SubjectIcon({ icon, className = 'w-6 h-6' }: SubjectIconProps) {
  switch (icon) {
    case 'calculator':
      return <Calculator className={className} aria-hidden="true" />;
    case 'book-open':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'moon-star':
      return <MoonStar className={className} aria-hidden="true" />;
    case 'atom':
      return <Atom className={className} aria-hidden="true" />;
    case 'flask':
      return <FlaskConical className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'dna':
      return <Dna className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'map':
      return <Map className={className} aria-hidden="true" />;
    case 'landmark':
      return <Landmark className={className} aria-hidden="true" />;
    case 'laptop':
      return <Laptop className={className} aria-hidden="true" />;
    default:
      return <BookOpen className={className} aria-hidden="true" />;
  }
}
