import styles from './Badge.module.scss'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span className={[styles.badge, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  )
}
