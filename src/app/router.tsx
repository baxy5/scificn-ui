import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './layout/root-layout'

const HomePage         = lazy(() => import('./pages/home'))
const IntroductionPage = lazy(() => import('./pages/docs/introduction'))
const InstallationPage = lazy(() => import('./pages/docs/installation'))
const ThemingPage      = lazy(() => import('./pages/docs/theming'))
const AlertPage        = lazy(() => import('./pages/components/alert'))
const BadgePage        = lazy(() => import('./pages/components/badge'))
const ButtonPage       = lazy(() => import('./pages/components/button'))
const CheckboxPage     = lazy(() => import('./pages/components/checkbox'))
const DialogPage       = lazy(() => import('./pages/components/dialog'))
const InputPage        = lazy(() => import('./pages/components/input'))
const PanelPage        = lazy(() => import('./pages/components/panel'))
const ProgressPage     = lazy(() => import('./pages/components/progress'))
const SelectPage       = lazy(() => import('./pages/components/select'))
const SeparatorPage    = lazy(() => import('./pages/components/separator'))
const SpinnerPage      = lazy(() => import('./pages/components/spinner'))
const SwitchPage       = lazy(() => import('./pages/components/switch'))
const TabsPage         = lazy(() => import('./pages/components/tabs'))
const TextareaPage     = lazy(() => import('./pages/components/textarea'))
const ToastPage        = lazy(() => import('./pages/components/toast'))
const TooltipPage      = lazy(() => import('./pages/components/tooltip'))
const ShowcasePage     = lazy(() => import('./pages/showcase/index'))
const StarWarsShowcase = lazy(() => import('./pages/showcase/star-wars'))
const AlienShowcase    = lazy(() => import('./pages/showcase/alien'))
const SciFiShowcase    = lazy(() => import('./pages/showcase/sci-fi'))

function PageFallback() {
  return (
    <div
      style={{
        padding: '2rem',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
      }}
    >
      LOADING...
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="docs/introduction" element={<IntroductionPage />} />
            <Route path="docs/installation" element={<InstallationPage />} />
            <Route path="docs/theming"       element={<ThemingPage />} />
            <Route path="components/alert"     element={<AlertPage />} />
            <Route path="components/badge"     element={<BadgePage />} />
            <Route path="components/button"    element={<ButtonPage />} />
            <Route path="components/checkbox"  element={<CheckboxPage />} />
            <Route path="components/dialog"    element={<DialogPage />} />
            <Route path="components/input"     element={<InputPage />} />
            <Route path="components/panel"     element={<PanelPage />} />
            <Route path="components/progress"  element={<ProgressPage />} />
            <Route path="components/select"    element={<SelectPage />} />
            <Route path="components/separator" element={<SeparatorPage />} />
            <Route path="components/spinner"   element={<SpinnerPage />} />
            <Route path="components/switch"    element={<SwitchPage />} />
            <Route path="components/tabs"      element={<TabsPage />} />
            <Route path="components/textarea"  element={<TextareaPage />} />
            <Route path="components/toast"     element={<ToastPage />} />
            <Route path="components/tooltip"   element={<TooltipPage />} />
            <Route path="showcase"             element={<ShowcasePage />} />
          </Route>
          <Route path="showcase/star-wars" element={<StarWarsShowcase />} />
          <Route path="showcase/alien"     element={<AlienShowcase />} />
          <Route path="showcase/sci-fi"    element={<SciFiShowcase />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
