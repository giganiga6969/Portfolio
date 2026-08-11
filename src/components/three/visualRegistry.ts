import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { VisualType } from '@/types'

const AlzheimerVisual = dynamic(
  () => import('./visuals/AlzheimerVisual'),
  { ssr: false }
)

const AeroFNOVisual = dynamic(
  () => import('./visuals/AeroFNOVisual'),
  { ssr: false }
)

const KafkaVisual = dynamic(
  () => import('./visuals/KafkaVisual'),
  { ssr: false }
)

const SecureChatVisual = dynamic(
  () => import('./visuals/SecureChatVisual'),
  { ssr: false }
)

const KickstarterVisual = dynamic(
  () => import('./visuals/KickstarterVisual'),
  { ssr: false }
)

export const visualRegistry: Record<VisualType, ComponentType> = {
  alzheimer: AlzheimerVisual,
  aerofno: AeroFNOVisual,
  kafka: KafkaVisual,
  securechat: SecureChatVisual,
  kickstarter: KickstarterVisual,
}

export default visualRegistry