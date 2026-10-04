import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
} from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'icon';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[#002840] text-white hover:bg-[#004b68] disabled:bg-slate-200 disabled:text-slate-500',
  secondary:
    'bg-[#087ea4] text-white hover:bg-[#004b68] disabled:bg-slate-200 disabled:text-slate-500',
  outline:
    'border border-slate-300 text-slate-900 hover:border-[#002840] hover:text-[#002840] disabled:text-slate-400',
  ghost: 'text-slate-700 hover:text-[#002840] disabled:text-slate-400',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  icon: 'p-2',
};

const BASE_TRANSITION = 'transition-colors transition-transform duration-200';
const HOVER_LIFT = 'hover:-translate-y-0.5';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      type = 'button',
      className = '',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center rounded-md text-sm font-medium ${BASE_TRANSITION} ${HOVER_LIFT} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087ea4] disabled:pointer-events-none disabled:hover:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

    if (asChild) {
      const child = isValidElement<{ className?: string }>(children) ? children : null;
      if (child) {
        return cloneElement(child, {
          className: [child.props.className, classes].filter(Boolean).join(' '),
          ...props,
        });
      }
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
