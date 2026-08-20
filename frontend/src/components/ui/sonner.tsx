'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from 'lucide-react'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      icons={{
        success: <CircleCheckIcon className='size-4 text-white' />,
        info: <InfoIcon className='size-4 text-white' />,
        warning: <TriangleAlertIcon className='size-4 text-white' />,
        error: <OctagonXIcon className='size-4 text-white' />,
        loading: <Loader2Icon className='size-4 animate-spin text-white/80' />
      }}
      style={
        {
          '--normal-bg': 'hsl(var(--card))',
          '--normal-text': 'hsl(var(--foreground))',
          '--normal-border': 'hsl(var(--border))',
          '--border-radius': '12px',
          '--success-bg': 'rgb(34 197 94)',
          '--success-text': 'white',
          '--success-border': 'rgb(34 197 94)',
          '--error-bg': 'rgb(239 68 68)',
          '--error-text': 'white',
          '--error-border': 'rgb(239 68 68)',
          '--warning-bg': 'rgb(245 158 11)',
          '--warning-text': 'white',
          '--warning-border': 'rgb(245 158 11)',
          '--info-bg': 'rgb(59 130 246)',
          '--info-text': 'white',
          '--info-border': 'rgb(59 130 246)'
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'rounded-xl border shadow-sm transition-all',

          title: 'text-sm font-medium',
          description: 'text-xs opacity-80',

          actionButton:
            'bg-white/20 hover:bg-white/30 text-white rounded-md px-3 py-1 text-xs',

          cancelButton:
            'bg-white/10 hover:bg-white/20 text-white/80 rounded-md px-3 py-1 text-xs'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
