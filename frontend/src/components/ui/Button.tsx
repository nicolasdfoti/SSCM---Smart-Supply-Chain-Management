import {
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type ComponentPropsWithoutRef,
  type Ref,
  type RefCallback,
} from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'icon';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-2 disabled:bg-muted/20 disabled:text-muted',
  secondary: 'bg-accent text-white hover:bg-brand-2 disabled:bg-muted/20 disabled:text-muted',
  outline: 'border border-border text-heading hover:border-brand hover:text-brand disabled:text-muted',
  ghost: 'text-text hover:text-brand disabled:text-muted',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  icon: 'p-2',
};

const BASE_TRANSITION = 'transition-colors duration-200';

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && typeof ref === 'object') {
        // oxlint-disable-next-line react(refs) -- callback executed by React on mount/unmount, not during render
        ref.current = value;
      }
    });
  };
}

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
    const classes = `inline-flex items-center justify-center rounded-[var(--radius)] text-sm font-medium ${BASE_TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

    const child = isValidElement<{ className?: string; ref?: Ref<unknown> }>(children)
      ? children
      : null;

    const mergedRef = useMemo(
      () => (child ? mergeRefs(child.props.ref, ref) : ref),
      [child?.props.ref, ref, child]
    );

    if (asChild && child) {
      return cloneElement(child, {
        className: [child.props.className, classes].filter(Boolean).join(' '),
        // oxlint-disable-next-line react(refs) -- mergedRef is a callback ref, not accessed during render
        ref: mergedRef,
        type,
        ...props,
      } as any);
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