"use client"

import { useEffect, useState } from "react"

export function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)

    const updateMatch = () => setIsDesktop(mediaQuery.matches)
    updateMatch()

    mediaQuery.addEventListener("change", updateMatch)
    return () => mediaQuery.removeEventListener("change", updateMatch)
  }, [breakpoint])

  return isDesktop
}
