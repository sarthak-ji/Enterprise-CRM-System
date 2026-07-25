// filepath: src/utils/cn.js
// Class-name combiner: clsx + tailwind-merge so conflicting Tailwind classes resolve cleanly.
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));
