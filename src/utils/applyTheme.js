/** Converts camelCase keys to kebab-case CSS variable suffixes. */
function toKebab(key) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/** Injects theme colors and fonts as CSS variables on :root (--t-*). */
export function applyTheme(theme) {
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--t-${toKebab(key)}`, value)
  })

  if (theme.fonts?.display) {
    root.style.setProperty('--t-font-display', theme.fonts.display)
  }
  if (theme.fonts?.body) {
    root.style.setProperty('--t-font-body', theme.fonts.body)
  }

  if (theme.radius) {
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--t-radius-${toKebab(key)}`, value)
    })
  }
}

export function getThemeName(theme) {
  return theme.name ?? 'Theme'
}
